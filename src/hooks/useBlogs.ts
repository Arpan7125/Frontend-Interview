import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { Blog, CreateBlogInput } from '@/types/blog';

const API_BASE_URL = 'http://localhost:3001';

/**
 * API Functions - Simple fetch wrappers
 */

// Fetch all blogs from the API
async function fetchBlogs(): Promise<Blog[]> {
  const response = await fetch(`${API_BASE_URL}/blogs`);
  if (!response.ok) {
    throw new Error('Failed to fetch blogs');
  }
  return response.json();
}

// Fetch a single blog by its ID
async function fetchBlogById(id: number): Promise<Blog> {
  const response = await fetch(`${API_BASE_URL}/blogs/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch blog');
  }
  return response.json();
}

// Create a new blog post
async function createBlog(blog: CreateBlogInput): Promise<Blog> {
  const response = await fetch(`${API_BASE_URL}/blogs`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(blog),
  });
  if (!response.ok) {
    throw new Error('Failed to create blog');
  }
  return response.json();
}

/**
 * TanStack Query Hooks - These handle caching, loading states, and errors automatically
 */

// Hook 1: Get all blogs (used in BlogList component)
export function useBlogs() {
  return useQuery({
    queryKey: ['blogs'], // Unique identifier for this query
    queryFn: fetchBlogs, // Function to fetch the data
  });
}

// Hook 2: Get a single blog by ID (used in BlogDetail component)
export function useBlog(id: number | null) {
  return useQuery({
    queryKey: ['blog', id], // Unique key with ID for caching individual blogs
    queryFn: () => fetchBlogById(id!),
    enabled: id !== null, // Only fetch when we have an ID selected
  });
}

// Hook 3: Create a new blog (mutation - changes data on server)
export function useCreateBlog() {
  const queryClient = useQueryClient(); // Access to the query cache
  
  return useMutation({
    mutationFn: createBlog, // Function that creates the blog
    onSuccess: () => {
      // After creating a blog, refresh the blog list automatically
      queryClient.invalidateQueries({ queryKey: ['blogs'] });
    },
  });
}

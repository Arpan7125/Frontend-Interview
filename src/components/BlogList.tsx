import { useState } from 'react';
import { useBlogs } from '@/hooks/useBlogs';
import { BlogCard } from './BlogCard';
import { Skeleton } from './ui/skeleton';
import { Alert, AlertDescription } from './ui/alert';
import { Button } from './ui/button';
import { Plus } from 'lucide-react';
import { CreateBlogForm } from './CreateBlogForm';

interface BlogListProps {
  selectedBlogId: number | null;
  onSelectBlog: (id: number) => void;
}

export function BlogList({ selectedBlogId, onSelectBlog }: BlogListProps) {
  // Use TanStack Query hook to fetch blogs - handles loading, error, and data automatically
  const { data: blogs, isLoading, isError, error } = useBlogs();
  
  // State for controlling the create blog modal
  const [isCreateFormOpen, setIsCreateFormOpen] = useState(false);

  // Show skeleton loaders while data is being fetched
  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-10 w-full" />
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} className="h-32 w-full" />
        ))}
      </div>
    );
  }

  // Show error message if fetch failed
  if (isError) {
    return (
      <Alert variant="destructive">
        <AlertDescription>
          Failed to load blogs: {error instanceof Error ? error.message : 'Unknown error'}
        </AlertDescription>
      </Alert>
    );
  }

  // Render the blog list
  return (
    <div className="space-y-4">
      {/* Header with "New Blog" button */}
      <div className="flex items-center justify-between sticky top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-10 pb-4">
        <h2 className="text-2xl font-bold">Latest Articles</h2>
        <Button onClick={() => setIsCreateFormOpen(true)} size="sm">
          <Plus className="w-4 h-4 mr-2" />
          New Blog
        </Button>
      </div>

      {/* Blog cards list */}
      <div className="space-y-3">
        {blogs && blogs.length > 0 ? (
          blogs.map((blog) => (
            <BlogCard
              key={blog.id}
              blog={blog}
              isActive={selectedBlogId === blog.id}
              onClick={() => onSelectBlog(blog.id)}
            />
          ))
        ) : (
          <p className="text-center text-muted-foreground py-8">
            No blogs found. Create your first blog!
          </p>
        )}
      </div>

      {/* Create blog modal dialog */}
      <CreateBlogForm
        open={isCreateFormOpen}
        onOpenChange={setIsCreateFormOpen}
      />
    </div>
  );
}

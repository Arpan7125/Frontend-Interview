# Interview Guide - CA Monk Blog Application

## Quick Overview (30 seconds)
"I built a blog application using **React with TypeScript**, **TanStack Query** for data fetching, **Tailwind CSS** for styling, and **shadcn/ui** for components. It has a split-panel layout - blog list on the left, detail view on the right - and uses a JSON Server backend."

---

## Architecture Explanation (2 minutes)

### 1. **File Structure** (Simple & Organized)
```
src/
├── components/       # All UI components
│   ├── ui/          # shadcn/ui components (Button, Card, etc.)
│   ├── BlogCard.tsx # Individual blog card
│   ├── BlogList.tsx # Left panel - shows all blogs
│   ├── BlogDetail.tsx # Right panel - shows selected blog
│   └── CreateBlogForm.tsx # Modal to create new blog
├── hooks/
│   └── useBlogs.ts  # TanStack Query hooks (API calls)
├── types/
│   └── blog.ts      # TypeScript types
├── App.tsx          # Main app with layout
└── main.tsx         # Entry point with QueryClient
```

### 2. **Data Flow** (How it works)
```
User clicks blog → App updates selectedBlogId → BlogDetail fetches that blog → UI updates
```

---

## TanStack Query - The Star of the Show

### Why TanStack Query?
"Instead of writing useState + useEffect + loading states + error handling manually, TanStack Query handles all of that automatically."

### The 3 Hooks I Created:

#### **Hook 1: useBlogs()** - Get all blogs
```typescript
export function useBlogs() {
  return useQuery({
    queryKey: ['blogs'],      // Unique cache key
    queryFn: fetchBlogs,       // API function
  });
}
```
- **Used in**: BlogList component
- **What it gives**: `{ data, isLoading, isError, error }`
- **Automatic**: Caching, background refetching, loading states

#### **Hook 2: useBlog(id)** - Get single blog
```typescript
export function useBlog(id: number | null) {
  return useQuery({
    queryKey: ['blog', id],    // Separate cache per blog
    queryFn: () => fetchBlogById(id!),
    enabled: id !== null,      // Only fetch when ID exists
  });
}
```
- **Used in**: BlogDetail component
- **Smart feature**: Only fetches when an ID is selected

#### **Hook 3: useCreateBlog()** - Create new blog
```typescript
export function useCreateBlog() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: createBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] });
    },
  });
}
```
- **Used in**: CreateBlogForm component
- **Smart feature**: Automatically refreshes the blog list after creating

---

## Component Walkthrough

### **App.tsx** - Main Layout
```typescript
const [selectedBlogId, setSelectedBlogId] = useState<number | null>(null);
```
- Simple state to track which blog is selected
- Split layout: 1 column on mobile, 3 columns on desktop
- Left panel (1 col) = BlogList, Right panel (2 cols) = BlogDetail

### **BlogList.tsx** - Shows all blogs
```typescript
const { data: blogs, isLoading, isError } = useBlogs();
```
**3 States:**
1. **Loading**: Show skeleton loaders
2. **Error**: Show error alert
3. **Success**: Map through blogs and render BlogCards

### **BlogDetail.tsx** - Shows one blog
```typescript
const { data: blog, isLoading, isError } = useBlog(blogId);
```
**4 States:**
1. **No ID selected**: Show "Select a blog" message
2. **Loading**: Show skeleton loaders
3. **Error**: Show error alert
4. **Success**: Show cover image, title, content

### **CreateBlogForm.tsx** - Create new blog
```typescript
const createBlogMutation = useCreateBlog();

await createBlogMutation.mutateAsync({ title, category, ... });
```
- Form validation before submission
- Shows loading spinner during creation
- Auto-closes modal on success

---

## Styling - Tailwind CSS + shadcn/ui

### Why This Combo?
- **Tailwind**: Utility classes (`flex`, `p-4`, `text-lg`)
- **shadcn/ui**: Pre-built, customizable components

### Custom Touches:
- **Category badges** with color variants (finance=blue, tech=purple, etc.)
- **Responsive grid**: `grid-cols-1 lg:grid-cols-3`
- **Sticky header**: `sticky top-0`
- **Gradient text**: `bg-gradient-to-r from-primary to-purple-600`

---

## Key Features to Highlight

1. **✅ Responsive Design**
   - Mobile: Single column
   - Desktop: Split panel layout

2. **✅ Loading States**
   - Skeleton components while data loads
   - Smooth UX

3. **✅ Error Handling**
   - User-friendly error messages
   - Graceful fallbacks

4. **✅ Query Invalidation**
   - After creating a blog, list auto-refreshes
   - No manual refetch needed

5. **✅ Type Safety**
   - Full TypeScript coverage
   - No `any` types

---

## Common Interview Questions & Answers

### Q: "Why TanStack Query instead of useState/useEffect?"
**A**: "TanStack Query handles caching, loading states, error states, background refetching, and query invalidation automatically. With useState/useEffect, I'd have to write all that manually for each API call."

### Q: "How does query invalidation work?"
**A**: "When I create a new blog, I call `queryClient.invalidateQueries({ queryKey: ['blogs'] })`. This tells TanStack Query that the 'blogs' data is stale, so it automatically refetches it, and my blog list updates."

### Q: "Why separate queryKey with ID like ['blog', id]?"
**A**: "Each blog gets its own cache entry. So if I view blog 1, then blog 2, then blog 1 again - the third time is instant because it's cached."

### Q: "How did you implement responsive design?"
**A**: "I used Tailwind's responsive modifiers. For example, `grid-cols-1 lg:grid-cols-3` means 1 column on mobile, 3 columns on large screens."

### Q: "What's shadcn/ui?"
**A**: "It's not a component library you install - you actually copy the component code into your project. This gives full customization. The components use Radix UI for accessibility and are styled with Tailwind."

---

## Demo Flow

1. **Show the app running** - Split panel layout
2. **Click between blogs** - Instant switching (thanks to caching)
3. **Click "New Blog"** - Modal opens
4. **Fill and submit** - Blog list auto-refreshes
5. **Point out**: Loading states, error handling, responsive design

---

## Technical Strengths

- ✅ Clean code organization
- ✅ Type safety with TypeScript
- ✅ Performance optimization (caching)
- ✅ Modern React patterns (hooks, functional components)
- ✅ Accessibility (shadcn/ui uses Radix)
- ✅ Responsive design
- ✅ Professional UI/UX

---

## Files to Know Inside-Out

1. **`src/hooks/useBlogs.ts`** - TanStack Query hooks ⭐
2. **`src/components/BlogList.tsx`** - Loading/error states
3. **`src/App.tsx`** - Layout and state management

---

## One-Line Summary
"A modern React blog app with TanStack Query for smart data fetching, Tailwind + shadcn/ui for styling, and TypeScript for type safety - all with automatic caching, loading states, and responsive design."

---

Good luck with your interview! 🚀

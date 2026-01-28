# Code Explanation Cheat Sheet

## 🎯 30-Second Pitch
"I created a modern blog app using React, TypeScript, TanStack Query for smart API handling, and Tailwind CSS with shadcn/ui for the UI. It has a responsive split-panel design and automatically handles loading states, caching, and error handling."

---

## 📋 Core Concepts to Explain

### 1. TanStack Query (Most Important!)

**What it does:**
- Manages all server state (data from API)
- Automatic caching, loading states, error handling
- No need for useEffect + useState combinations

**The 3 hooks:**

```typescript
// 1️⃣ GET all blogs - Used in BlogList
useBlogs() 
  → Returns: { data, isLoading, isError }

// 2️⃣ GET single blog - Used in BlogDetail  
useBlog(id)
  → Only fetches when id exists (enabled: id !== null)

// 3️⃣ CREATE blog - Used in CreateBlogForm
useCreateBlog()
  → After success, auto-refreshes blog list via invalidateQueries
```

---

### 2. Component Structure

```
App (State: selectedBlogId)
 ├─ BlogList (Shows all blogs)
 │   ├─ BlogCard (Each blog preview)
 │   └─ CreateBlogForm (Modal)
 └─ BlogDetail (Shows selected blog)
```

**Data flow:**
1. User clicks BlogCard
2. App updates `selectedBlogId`
3. BlogDetail receives new ID
4. TanStack Query fetches that blog
5. UI updates automatically

---

### 3. Key Files

| File | Purpose | Lines |
|------|---------|-------|
| `hooks/useBlogs.ts` | All API logic | 75 |
| `components/BlogList.tsx` | Left panel | 80 |
| `components/BlogDetail.tsx` | Right panel | 110 |
| `App.tsx` | Main layout | 60 |

---

## 💬 Interview Q&A

**Q: "Explain TanStack Query in simple terms."**
> "Instead of writing fetch + useState + useEffect for every API call, TanStack Query gives us hooks like `useQuery` that handle fetching, caching, loading states, and errors automatically. It's like React Query but with better TypeScript support."

**Q: "How does the blog list update after creating a new blog?"**
> "In the `useCreateBlog` mutation, I use the `onSuccess` callback to call `queryClient.invalidateQueries(['blogs'])`. This tells TanStack Query that the blogs data is now stale, so it automatically refetches it from the server."

**Q: "Why use TypeScript?"**
> "It catches errors at compile-time instead of runtime. For example, if I try to access `blog.titl` (typo), TypeScript will immediately show an error. It also gives great autocomplete in the IDE."

**Q: "How is this responsive?"**
> "I used Tailwind's responsive modifiers. The grid is `grid-cols-1 lg:grid-cols-3`, meaning 1 column on mobile/tablet, then splits into 3 columns on large screens (desktop)."

**Q: "What's shadcn/ui?"**
> "It's not a traditional component library. You copy the component code directly into your project, which gives you full control to customize. The components use Radix UI (for accessibility) and Tailwind CSS (for styling)."

---

## 🔍 Code Walkthrough Order

### Start with `main.tsx`:
```typescript
// This wraps the entire app with TanStack Query provider
<QueryClientProvider client={queryClient}>
  <App />
</QueryClientProvider>
```

### Then `App.tsx`:
```typescript
// Simple state to track selected blog
const [selectedBlogId, setSelectedBlogId] = useState<number | null>(null);

// Split layout: BlogList on left, BlogDetail on right
```

### Then `hooks/useBlogs.ts`:
```typescript
// Show the 3 hooks: useBlogs, useBlog, useCreateBlog
// Emphasize: queryKey for caching, queryFn for fetching
```

### Then `BlogList.tsx`:
```typescript
// Show 3 states: isLoading → Skeleton, isError → Alert, success → map blogs
const { data: blogs, isLoading, isError } = useBlogs();
```

### Finally `BlogDetail.tsx`:
```typescript
// Show 4 states: no ID, isLoading, isError, success
const { data: blog } = useBlog(blogId);
```

---

## ✅ Features to Demonstrate

1. **Click different blogs** → Instant switching (caching!)
2. **Create a new blog** → List auto-updates
3. **Resize browser** → Responsive layout
4. **Refresh page** → Data refetches automatically
5. **Point out loading skeletons** → Better UX

---

## 🚀 Strong Points to Highlight

- ✅ Clean, organized code structure
- ✅ Full TypeScript type safety
- ✅ Modern React patterns (hooks, functional components)
- ✅ Automatic caching and optimization
- ✅ Professional UI/UX with loading states
- ✅ Responsive design
- ✅ Easy to maintain and extend

---

## 📝 Quick Reference

**Total Files Created:** ~25 files  
**Main Dependencies:**
- react 18.3
- @tanstack/react-query 5.62
- tailwindcss 3.4
- typescript 5.6

**API Endpoints Used:**
- GET `/blogs` - All blogs
- GET `/blogs/:id` - Single blog  
- POST `/blogs` - Create blog

**Responsive Breakpoints:**
- Mobile: < 1024px (1 column)
- Desktop: ≥ 1024px (3 columns, split panel)

---

Remember: **Keep it simple, focus on TanStack Query benefits, and demonstrate the working app!**

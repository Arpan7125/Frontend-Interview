import { useBlog } from '@/hooks/useBlogs';
import { Badge } from './ui/badge';
import { Skeleton } from './ui/skeleton';
import { Alert, AlertDescription } from './ui/alert';
import { formatDate, formatReadTime } from '@/lib/utils';
import { Calendar, Clock } from 'lucide-react';

interface BlogDetailProps {
  blogId: number | null;
}

function getCategoryVariant(category: string): "finance" | "tech" | "career" | "tax" | "policy" | "audit" | "skills" | "default" {
  const lower = category.toLowerCase();
  if (lower === 'finance') return 'finance';
  if (lower === 'tech') return 'tech';
  if (lower === 'career') return 'career';
  if (lower === 'tax') return 'tax';
  if (lower === 'policy') return 'policy';
  if (lower === 'audit') return 'audit';
  if (lower === 'skills') return 'skills';
  return 'default';
}

export function BlogDetail({ blogId }: BlogDetailProps) {
  const { data: blog, isLoading, isError, error } = useBlog(blogId);

  if (!blogId) {
    return (
      <div className="flex items-center justify-center h-full text-muted-foreground">
        <div className="text-center">
          <h3 className="text-xl font-semibold mb-2">No blog selected</h3>
          <p>Select a blog from the list to view its details</p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-64 w-full rounded-lg" />
        <Skeleton className="h-10 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <Alert variant="destructive">
        <AlertDescription>
          Failed to load blog: {error instanceof Error ? error.message : 'Unknown error'}
        </AlertDescription>
      </Alert>
    );
  }

  if (!blog) {
    return null;
  }

  return (
    <article className="space-y-6">
      {/* Cover Image */}
      <div className="relative w-full h-64 md:h-80 rounded-lg overflow-hidden bg-muted">
        <img
          src={blog.coverImage}
          alt={blog.title}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.currentTarget.src = 'https://images.pexels.com/photos/3184287/pexels-photo-3184287.jpeg';
          }}
        />
      </div>

      {/* Categories */}
      <div className="flex flex-wrap gap-2">
        {blog.category.map((cat) => (
          <Badge key={cat} variant={getCategoryVariant(cat)}>
            {cat}
          </Badge>
        ))}
      </div>

      {/* Title */}
      <h1 className="text-3xl md:text-4xl font-bold leading-tight">{blog.title}</h1>

      {/* Meta Information */}
      <div className="flex items-center gap-4 text-sm text-muted-foreground">
        <span className="flex items-center gap-2">
          <Calendar className="w-4 h-4" />
          {formatDate(blog.date)}
        </span>
        <span className="flex items-center gap-2">
          <Clock className="w-4 h-4" />
          {formatReadTime(blog.content)}
        </span>
      </div>

      {/* Description */}
      <p className="text-lg text-muted-foreground">{blog.description}</p>

      {/* Content */}
      <div className="prose prose-slate max-w-none">
        <div className="whitespace-pre-line text-foreground leading-relaxed">
          {blog.content}
        </div>
      </div>
    </article>
  );
}

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatDate, formatReadTime } from '@/lib/utils';
import type { Blog } from '@/types/blog';
import { Clock } from 'lucide-react';

interface BlogCardProps {
  blog: Blog;
  isActive: boolean;
  onClick: () => void;
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

export function BlogCard({ blog, isActive, onClick }: BlogCardProps) {
  return (
    <Card
      className={`cursor-pointer transition-all hover:shadow-lg ${
        isActive ? 'ring-2 ring-primary bg-accent/50' : ''
      }`}
      onClick={onClick}
    >
      <CardContent className="p-4">
        <div className="flex flex-wrap gap-2 mb-3">
          {blog.category.map((cat) => (
            <Badge key={cat} variant={getCategoryVariant(cat)}>
              {cat}
            </Badge>
          ))}
        </div>
        
        <h3 className="font-semibold text-lg mb-2 line-clamp-2">{blog.title}</h3>
        
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
          {blog.description}
        </p>
        
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <span>{formatDate(blog.date)}</span>
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {formatReadTime(blog.content)}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}

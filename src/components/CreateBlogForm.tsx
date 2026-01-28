import { useState } from 'react';
import { useCreateBlog } from '@/hooks/useBlogs';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2 } from 'lucide-react';

interface CreateBlogFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateBlogForm({ open, onOpenChange }: CreateBlogFormProps) {
  const [title, setTitle] = useState('');
  const [categories, setCategories] = useState('');
  const [description, setDescription] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');

  const createBlogMutation = useCreateBlog();

  const resetForm = () => {
    setTitle('');
    setCategories('');
    setDescription('');
    setCoverImage('');
    setContent('');
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!title.trim()) {
      setError('Title is required');
      return;
    }

    if (!description.trim()) {
      setError('Description is required');
      return;
    }

    if (!content.trim()) {
      setError('Content is required');
      return;
    }

    const categoryArray = categories
      .split(',')
      .map((cat) => cat.trim().toUpperCase())
      .filter((cat) => cat.length > 0);

    if (categoryArray.length === 0) {
      setError('At least one category is required');
      return;
    }

    try {
      await createBlogMutation.mutateAsync({
        title: title.trim(),
        category: categoryArray,
        description: description.trim(),
        coverImage: coverImage.trim() || 'https://images.pexels.com/photos/3184287/pexels-photo-3184287.jpeg',
        content: content.trim(),
        date: new Date().toISOString(),
      });

      resetForm();
      onOpenChange(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create blog');
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Blog</DialogTitle>
          <DialogDescription>
            Fill in the details to create a new blog post
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              placeholder="Enter blog title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              disabled={createBlogMutation.isPending}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="categories">Categories *</Label>
            <Input
              id="categories"
              placeholder="e.g., FINANCE, TECH (comma separated)"
              value={categories}
              onChange={(e) => setCategories(e.target.value)}
              disabled={createBlogMutation.isPending}
            />
            <p className="text-xs text-muted-foreground">
              Enter comma-separated categories (e.g., FINANCE, TECH, CAREER)
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              placeholder="Brief description of the blog"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={createBlogMutation.isPending}
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="coverImage">Cover Image URL</Label>
            <Input
              id="coverImage"
              placeholder="https://example.com/image.jpg (optional)"
              value={coverImage}
              onChange={(e) => setCoverImage(e.target.value)}
              disabled={createBlogMutation.isPending}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Content *</Label>
            <Textarea
              id="content"
              placeholder="Write your blog content here..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              disabled={createBlogMutation.isPending}
              rows={10}
            />
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={createBlogMutation.isPending}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={createBlogMutation.isPending}>
              {createBlogMutation.isPending && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Create Blog
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

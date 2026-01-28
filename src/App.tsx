import { useState } from 'react';
import { BlogList } from './components/BlogList';
import { BlogDetail } from './components/BlogDetail';

function App() {
  // State to track which blog is currently selected
  // null = no blog selected, number = selected blog's ID
  const [selectedBlogId, setSelectedBlogId] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-background">
      {/* Header - Sticky at top */}
      <header className="border-b sticky top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                CA Monk Blog
              </h1>
              <p className="text-sm text-muted-foreground">
                Stay updated with the latest trends in finance, accounting, and career growth
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content - Split Panel Layout */}
      <main className="container mx-auto px-4 py-6">
        {/* Responsive grid: 1 column on mobile, 3 columns on desktop (lg breakpoint) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left Panel - Blog List (takes 1 column on desktop) */}
          <div className="lg:col-span-1 lg:max-h-[calc(100vh-12rem)] lg:overflow-y-auto lg:pr-2">
            <BlogList
              selectedBlogId={selectedBlogId}
              onSelectBlog={setSelectedBlogId}  // When user clicks a blog, update state
            />
          </div>

          {/* Right Panel - Blog Detail (takes 2 columns on desktop) */}
          <div className="lg:col-span-2 lg:max-h-[calc(100vh-12rem)] lg:overflow-y-auto lg:pl-4 lg:border-l">
            <BlogDetail blogId={selectedBlogId} />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t mt-12">
        <div className="container mx-auto px-4 py-6 text-center text-sm text-muted-foreground">
          <p>© 2026 CA Monk Blog. Built with React, TypeScript, TanStack Query, and shadcn/ui.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;

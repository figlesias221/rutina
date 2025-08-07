'use client';

import { useState } from 'react';
import { MotivationalQuote } from '@/components/MotivationalQuote';
import { Button } from '@/components/ui/button';
import { motivationalQuotes, Quote } from '@/data/motivationalQuotes';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function QuotesPage() {
  const [filter, setFilter] = useState<Quote['category'] | 'all'>('all');
  
  const categories: Array<Quote['category'] | 'all'> = [
    'all',
    'strength',
    'persistence', 
    'mindset',
    'discipline',
    'success',
    'general'
  ];

  const filteredQuotes = filter === 'all' 
    ? motivationalQuotes 
    : motivationalQuotes.filter(q => q.category === filter);

  const getCategoryColor = (category: string) => {
    const colors = {
      strength: 'bg-red-100 text-red-800',
      persistence: 'bg-blue-100 text-blue-800',
      mindset: 'bg-purple-100 text-purple-800',
      discipline: 'bg-gray-100 text-gray-800',
      success: 'bg-yellow-100 text-yellow-800',
      general: 'bg-green-100 text-green-800',
      all: 'bg-gray-100 text-gray-800'
    };
    return colors[category as keyof typeof colors] || colors.general;
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-5xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">Motivational Quotes</h1>
          <p className="text-muted-foreground">
            Get inspired with our collection of {motivationalQuotes.length} fitness quotes
          </p>
        </div>

        {/* Daily Quote */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Today's Quote</h2>
          <MotivationalQuote mode="daily" showRefresh={false} />
        </div>

        {/* Random Quote */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Random Quote Generator</h2>
          <MotivationalQuote mode="random" showRefresh={true} />
        </div>

        {/* All Quotes */}
        <div>
          <h2 className="text-xl font-semibold mb-4">All Quotes Collection</h2>
          
          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 mb-6">
            {categories.map(cat => (
              <Button
                key={cat}
                variant={filter === cat ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilter(cat)}
                className="capitalize"
              >
                {cat} {cat === 'all' && `(${motivationalQuotes.length})`}
                {cat !== 'all' && `(${motivationalQuotes.filter(q => q.category === cat).length})`}
              </Button>
            ))}
          </div>

          {/* Quotes Grid */}
          <div className="grid gap-4 md:grid-cols-2">
            {filteredQuotes.map((quote, index) => (
              <Card key={index} className="p-4">
                <blockquote className="space-y-2">
                  <p className="text-sm leading-relaxed">
                    "{quote.text}"
                  </p>
                  <footer className="flex items-center justify-between">
                    <cite className="text-xs text-muted-foreground not-italic">
                      — {quote.author}
                    </cite>
                    <Badge variant="secondary" className={`text-xs ${getCategoryColor(quote.category)}`}>
                      {quote.category}
                    </Badge>
                  </footer>
                </blockquote>
              </Card>
            ))}
          </div>

          {/* Stats */}
          <div className="mt-8 text-center text-sm text-muted-foreground">
            Showing {filteredQuotes.length} of {motivationalQuotes.length} quotes
          </div>
        </div>
      </div>
    </div>
  );
}
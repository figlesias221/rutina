'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Quote, getRandomQuote, getDailyQuote } from '@/data/motivationalQuotes';
import { RefreshCw, Sparkles, Heart } from 'lucide-react';

interface MotivationalQuoteProps {
  mode?: 'daily' | 'random';
  showRefresh?: boolean;
  className?: string;
}

export function MotivationalQuote({ 
  mode = 'daily', 
  showRefresh = true,
  className = ''
}: MotivationalQuoteProps) {
  const [quote, setQuote] = useState<Quote | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    // Load initial quote
    const initialQuote = mode === 'daily' ? getDailyQuote() : getRandomQuote();
    setQuote(initialQuote);
    
    // Check if this quote is favorited
    const favorites = JSON.parse(localStorage.getItem('favorite-quotes') || '[]');
    setIsFavorite(favorites.some((fav: Quote) => fav.text === initialQuote.text));
  }, [mode]);

  const refreshQuote = () => {
    setIsAnimating(true);
    
    setTimeout(() => {
      const newQuote = getRandomQuote();
      setQuote(newQuote);
      
      // Check if new quote is favorited
      const favorites = JSON.parse(localStorage.getItem('favorite-quotes') || '[]');
      setIsFavorite(favorites.some((fav: Quote) => fav.text === newQuote.text));
      
      setIsAnimating(false);
    }, 300);
  };

  const toggleFavorite = () => {
    if (!quote) return;
    
    const favorites = JSON.parse(localStorage.getItem('favorite-quotes') || '[]');
    
    if (isFavorite) {
      const updatedFavorites = favorites.filter((fav: Quote) => fav.text !== quote.text);
      localStorage.setItem('favorite-quotes', JSON.stringify(updatedFavorites));
      setIsFavorite(false);
    } else {
      favorites.push(quote);
      localStorage.setItem('favorite-quotes', JSON.stringify(favorites));
      setIsFavorite(true);
    }
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      strength: 'from-red-500 to-orange-500',
      persistence: 'from-blue-500 to-indigo-500',
      mindset: 'from-purple-500 to-pink-500',
      discipline: 'from-gray-600 to-gray-800',
      success: 'from-yellow-500 to-amber-500',
      general: 'from-green-500 to-teal-500'
    };
    return colors[category as keyof typeof colors] || colors.general;
  };

  if (!quote) return null;

  return (
    <Card className={`relative overflow-hidden ${className}`}>
      {/* Background gradient based on category */}
      <div 
        className={`absolute inset-0 bg-gradient-to-br ${getCategoryColor(quote.category)} opacity-5`}
      />
      
      <div className="relative p-6 space-y-4">
        {/* Header with icons */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-yellow-500" />
            <span className="text-sm font-medium text-gray-600 capitalize">
              {mode === 'daily' ? 'Quote of the Day' : `${quote.category} Quote`}
            </span>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              size="icon"
              variant="ghost"
              onClick={toggleFavorite}
              className="h-8 w-8"
            >
              <Heart 
                className={`h-4 w-4 transition-colors ${
                  isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'
                }`}
              />
            </Button>
            
            {showRefresh && (
              <Button
                size="icon"
                variant="ghost"
                onClick={refreshQuote}
                disabled={isAnimating}
                className="h-8 w-8"
              >
                <RefreshCw 
                  className={`h-4 w-4 text-gray-600 transition-transform duration-500 ${
                    isAnimating ? 'animate-spin' : ''
                  }`}
                />
              </Button>
            )}
          </div>
        </div>

        {/* Quote content with animation */}
        <div 
          className={`space-y-3 transition-all duration-300 ${
            isAnimating ? 'opacity-0 transform scale-95' : 'opacity-100 transform scale-100'
          }`}
        >
          <blockquote className="relative">
            {/* Large decorative quote mark */}
            <span className="absolute -top-2 -left-2 text-6xl text-gray-200 font-serif leading-none">
              "
            </span>
            
            <p className="relative z-10 text-lg md:text-xl font-medium text-gray-800 leading-relaxed pl-6">
              {quote.text}
            </p>
            
            {/* Closing quote mark */}
            <span className="absolute -bottom-8 right-0 text-6xl text-gray-200 font-serif leading-none">
              "
            </span>
          </blockquote>
          
          {/* Author */}
          <div className="flex items-center justify-end pt-2">
            <span className="text-sm text-gray-500">— {quote.author}</span>
          </div>
        </div>

        {/* Category badge */}
        <div className="flex justify-center pt-2">
          <span 
            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${
              getCategoryColor(quote.category)
            } text-white`}
          >
            {quote.category.toUpperCase()}
          </span>
        </div>
      </div>
    </Card>
  );
}
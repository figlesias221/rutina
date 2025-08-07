export interface Quote {
  text: string;
  author: string;
  category: 'strength' | 'persistence' | 'mindset' | 'discipline' | 'success' | 'general';
}

export const motivationalQuotes: Quote[] = [
  // Strength & Power
  {
    text: "The pain you feel today will be the strength you feel tomorrow.",
    author: "Unknown",
    category: "strength"
  },
  {
    text: "Strength doesn't come from what you can do. It comes from overcoming the things you once thought you couldn't.",
    author: "Rikki Rogers",
    category: "strength"
  },
  {
    text: "The last three or four reps is what makes the muscle grow.",
    author: "Arnold Schwarzenegger",
    category: "strength"
  },
  {
    text: "The resistance that you fight physically in the gym and the resistance that you fight in life can only build a strong character.",
    author: "Arnold Schwarzenegger",
    category: "strength"
  },
  
  // Persistence & Consistency
  {
    text: "Success isn't always about greatness. It's about consistency. Consistent hard work leads to success.",
    author: "Dwayne Johnson",
    category: "persistence"
  },
  {
    text: "The difference between the impossible and the possible lies in a person's determination.",
    author: "Tommy Lasorda",
    category: "persistence"
  },
  {
    text: "It's not about perfect. It's about effort.",
    author: "Jillian Michaels",
    category: "persistence"
  },
  {
    text: "Don't stop when you're tired. Stop when you're done.",
    author: "David Goggins",
    category: "persistence"
  },
  {
    text: "The only bad workout is the one that didn't happen.",
    author: "Unknown",
    category: "persistence"
  },
  
  // Mindset & Mental Strength
  {
    text: "Your body can stand almost anything. It's your mind that you have to convince.",
    author: "Unknown",
    category: "mindset"
  },
  {
    text: "The mind is the most important part of achieving any fitness goal. Mental change always comes before physical change.",
    author: "Matt McGorry",
    category: "mindset"
  },
  {
    text: "You're only one workout away from a good mood.",
    author: "Unknown",
    category: "mindset"
  },
  {
    text: "Believe in yourself and all that you are. Know that there is something inside of you that is greater than any obstacle.",
    author: "Christian D. Larson",
    category: "mindset"
  },
  
  // Discipline & Dedication
  {
    text: "Discipline is doing what needs to be done, even when you don't want to do it.",
    author: "Unknown",
    category: "discipline"
  },
  {
    text: "We are what we repeatedly do. Excellence then is not an act but a habit.",
    author: "Aristotle",
    category: "discipline"
  },
  {
    text: "Motivation is what gets you started. Habit is what keeps you going.",
    author: "Jim Ryun",
    category: "discipline"
  },
  {
    text: "The pain of discipline weighs ounces, but the pain of regret weighs tons.",
    author: "Jim Rohn",
    category: "discipline"
  },
  {
    text: "Champions aren't made in the gyms. Champions are made from something they have deep inside them - a desire, a dream, a vision.",
    author: "Muhammad Ali",
    category: "discipline"
  },
  
  // Success & Achievement
  {
    text: "The only place where success comes before work is in the dictionary.",
    author: "Vidal Sassoon",
    category: "success"
  },
  {
    text: "All progress takes place outside the comfort zone.",
    author: "Michael John Bobak",
    category: "success"
  },
  {
    text: "If you want something you've never had, you must be willing to do something you've never done.",
    author: "Thomas Jefferson",
    category: "success"
  },
  {
    text: "Success is usually the culmination of controlling failure.",
    author: "Sylvester Stallone",
    category: "success"
  },
  {
    text: "The clock is ticking. Are you becoming the person you want to be?",
    author: "Greg Plitt",
    category: "success"
  },
  
  // General Motivation
  {
    text: "Take care of your body. It's the only place you have to live.",
    author: "Jim Rohn",
    category: "general"
  },
  {
    text: "The groundwork for all happiness is good health.",
    author: "Leigh Hunt",
    category: "general"
  },
  {
    text: "Fitness is not about being better than someone else. It's about being better than you used to be.",
    author: "Khloe Kardashian",
    category: "general"
  },
  {
    text: "A one hour workout is 4% of your day. No excuses.",
    author: "Unknown",
    category: "general"
  },
  {
    text: "Sweat is just fat crying.",
    author: "Unknown",
    category: "general"
  },
  {
    text: "The only way to define your limits is by going beyond them.",
    author: "Arthur C. Clarke",
    category: "general"
  },
  {
    text: "Dead last finish is greater than did not finish, which trumps did not start.",
    author: "Unknown",
    category: "general"
  },
  {
    text: "You don't have to be great to start, but you have to start to be great.",
    author: "Zig Ziglar",
    category: "general"
  },
  {
    text: "Exercise is a celebration of what your body can do, not a punishment for what you ate.",
    author: "Unknown",
    category: "general"
  },
  {
    text: "The body achieves what the mind believes.",
    author: "Napoleon Hill",
    category: "general"
  },
  {
    text: "Push yourself because no one else is going to do it for you.",
    author: "Unknown",
    category: "general"
  },
  {
    text: "Great things never come from comfort zones.",
    author: "Ben Francia",
    category: "general"
  },
  {
    text: "Dream it. Believe it. Build it.",
    author: "Unknown",
    category: "general"
  },
  {
    text: "Your limitation—it's only your imagination.",
    author: "Unknown",
    category: "general"
  },
  {
    text: "Wake up with determination. Go to bed with satisfaction.",
    author: "George Lorimer",
    category: "general"
  }
];

// Helper function to get a random quote
export function getRandomQuote(): Quote {
  const randomIndex = Math.floor(Math.random() * motivationalQuotes.length);
  return motivationalQuotes[randomIndex];
}

// Helper function to get a quote by category
export function getQuoteByCategory(category: Quote['category']): Quote {
  const categoryQuotes = motivationalQuotes.filter(q => q.category === category);
  const randomIndex = Math.floor(Math.random() * categoryQuotes.length);
  return categoryQuotes[randomIndex] || getRandomQuote();
}

// Helper function to get today's quote (same quote for the whole day)
export function getDailyQuote(): Quote {
  const today = new Date().toDateString();
  const seed = today.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const index = seed % motivationalQuotes.length;
  return motivationalQuotes[index];
}
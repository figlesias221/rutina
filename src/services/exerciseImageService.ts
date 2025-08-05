// Exercise database types and service
export interface ExerciseImage {
  id: string;
  name: string;
  force?: string;
  level: string;
  mechanic?: string;
  equipment?: string;
  primaryMuscles: string[];
  secondaryMuscles?: string[];
  instructions: string[];
  category: string;
  images: string[];
}

export class ExerciseImageService {
  private static readonly BASE_URL = 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main';
  private static readonly EXERCISES_URL = `${this.BASE_URL}/dist/exercises.json`;
  private static readonly IMAGES_BASE = `${this.BASE_URL}/exercises`;
  
  private static exercisesCache: ExerciseImage[] | null = null;
  private static cacheTimestamp: number = 0;
  private static readonly CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 horas

  static async getAllExercises(): Promise<ExerciseImage[]> {
    // Check cache first
    const now = Date.now();
    if (this.exercisesCache && (now - this.cacheTimestamp) < this.CACHE_DURATION) {
      return this.exercisesCache;
    }

    try {
      const response = await fetch(this.EXERCISES_URL);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const exercises: ExerciseImage[] = await response.json();
      
      // Update cache
      this.exercisesCache = exercises;
      this.cacheTimestamp = now;
      
      return exercises;
    } catch (error) {
      console.error('Error fetching exercises:', error);
      return this.exercisesCache || [];
    }
  }

  static async searchExercises(query: string, limit: number = 5): Promise<ExerciseImage[]> {
    const exercises = await this.getAllExercises();
    const normalizedQuery = query.toLowerCase().trim();
    
    if (!normalizedQuery) return [];

    // Score-based search
    const scored = exercises.map(exercise => {
      let score = 0;
      const name = exercise.name.toLowerCase();
      
      // Exact name match gets highest score
      if (name === normalizedQuery) score += 100;
      
      // Name starts with query
      if (name.startsWith(normalizedQuery)) score += 50;
      
      // Name contains query
      if (name.includes(normalizedQuery)) score += 25;
      
      // Primary muscles match
      if (exercise.primaryMuscles.some(muscle => 
        muscle.toLowerCase().includes(normalizedQuery)
      )) {
        score += 15;
      }
      
      // Equipment match
      if (exercise.equipment?.toLowerCase().includes(normalizedQuery)) {
        score += 10;
      }
      
      // Category match
      if (exercise.category.toLowerCase().includes(normalizedQuery)) {
        score += 5;
      }

      return { exercise, score };
    });

    return scored
      .filter(item => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, limit)
      .map(item => item.exercise);
  }

  static getImageUrl(exercise: ExerciseImage, imageIndex: number = 0): string {
    if (!exercise.images || exercise.images.length === 0) {
      return '/placeholder-exercise.svg'; // Fallback image
    }
    
    const imagePath = exercise.images[imageIndex] || exercise.images[0];
    return `${this.IMAGES_BASE}/${imagePath}`;
  }

  static getImageUrls(exercise: ExerciseImage): string[] {
    if (!exercise.images || exercise.images.length === 0) {
      return ['/placeholder-exercise.svg'];
    }
    
    return exercise.images.map(imagePath => `${this.IMAGES_BASE}/${imagePath}`);
  }

  // Helper to translate common Spanish exercise names to English
  static translateToEnglish(spanishName: string): string {
    const translations: Record<string, string> = {
      // Ejercicios principales
      'sentadilla': 'squat',
      'sentadillas': 'squat',
      'peso muerto': 'deadlift',
      'peso muerto rumano': 'romanian deadlift',
      'peso muerto asimétrico': 'single leg deadlift',
      'press de banca': 'bench press',
      'press militar': 'military press',
      'press': 'press',
      'prensa': 'leg press',
      'prensa de piernas': 'leg press',
      'dominadas': 'pull up',
      'dominada': 'pull up',
      'flexiones': 'push up',
      'flexión': 'push up',
      'curl de biceps': 'bicep curl',
      'curl': 'curl',
      'extensiones': 'extension',
      'extensión': 'extension',
      'extensión de cuádriceps': 'leg extension',
      'remo': 'row',
      'remo con barra': 'barbell row',
      'hip thrust': 'hip thrust',
      'elevación': 'raise',
      'elevaciones': 'raise',
      'elevaciones de pantorrilla': 'calf raise',
      'zancadas': 'lunge',
      'zancada': 'lunge',
      'zancadas búlgaras': 'bulgarian split squat',
      'plancha': 'plank',
      'abdominales': 'crunch',
      'crunch': 'crunch',
      
      // Palabras clave
      'con barra': 'barbell',
      'con mancuernas': 'dumbbell',
      'mancuerna': 'dumbbell',
      'kettlebell': 'kettlebell',
      'búlgara': 'bulgarian',
      'inclinado': 'incline',
      'declinado': 'decline',
      'martillo': 'hammer',
      'concentrado': 'concentration',
      'lateral': 'lateral',
      'frontal': 'front',
      'posterior': 'rear',
      
      // Partes del cuerpo
      'cuádriceps': 'quadriceps',
      'isquiotibiales': 'hamstring',
      'pantorrillas': 'calf',
      'pantorrilla': 'calf',
      'hombros': 'shoulder',
      'hombro': 'shoulder',
      'espalda': 'back',
      'pecho': 'chest',
      'brazos': 'arms',
      'piernas': 'legs',
      'glúteos': 'glutes',
      'abdomen': 'abs'
    };

    let translated = spanishName.toLowerCase();
    
    // Apply translations in order of specificity (longer phrases first)
    const sortedTranslations = Object.entries(translations)
      .sort(([a], [b]) => b.length - a.length);
    
    sortedTranslations.forEach(([spanish, english]) => {
      if (translated.includes(spanish)) {
        translated = translated.replace(new RegExp(spanish, 'g'), english);
      }
    });

    return translated.trim();
  }

  // Enhanced search that tries multiple strategies
  static async searchSpanishExercise(spanishName: string): Promise<ExerciseImage[]> {
    const searchStrategies = [
      // 1. Direct search (might work for English names)
      spanishName,
      
      // 2. Translated version
      this.translateToEnglish(spanishName),
      
      // 3. Extract key words from translation
      ...this.extractKeyWords(this.translateToEnglish(spanishName)),
      
      // 4. Extract key words from original
      ...this.extractKeyWords(spanishName)
    ];

    for (const strategy of searchStrategies) {
      const results = await this.searchExercises(strategy, 10);
      if (results.length > 0) {
        return results;
      }
    }

    return [];
  }

  // Extract key words to try partial matches
  private static extractKeyWords(text: string): string[] {
    const words = text.toLowerCase()
      .split(/[\s\-_(),]+/)
      .filter(word => word.length > 2)
      .filter(word => !['con', 'de', 'del', 'la', 'el', 'en', 'and', 'the', 'with', 'of'].includes(word));
    
    return words.slice(0, 3); // Try top 3 key words
  }
}

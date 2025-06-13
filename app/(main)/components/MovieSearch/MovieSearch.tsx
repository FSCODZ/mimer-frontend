'use client';
import { useEffect, useState } from 'react';
import { searchMovies } from '@/lib/api/tmdb';
import { Movie } from '../types';
import MovieGrid from '../MovieGrid/MovieGrid';

// 1. Skapa en typ för tillåtna genrer
type GenreKey = keyof typeof genreMap;

export default function MovieSearch() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [genre, setGenre] = useState<GenreKey | ''>(''); // Använd vår typ här

  // Ladda populära filmer vid första rendering
  useEffect(() => {
    const fetchPopularMovies = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_TMDB_BASE_URL}/movie/popular?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
        );
        const data = await response.json();
        setMovies(data.results);
      } catch (error) {
        console.error('Error fetching popular movies:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPopularMovies();
  }, []);

  // Sökfunktion
  const handleSearch = async () => {
    if (!query.trim()) return;
    
    setIsLoading(true);
    try {
      const results = await searchMovies(query);
      setMovies(results);
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="movie-search-container">
      <div className="search-header">
        <h1>The Movie Finder</h1>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search movie, TV shows or actors"
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
        />
      </div>

      {/* Genre-filtrering */}
      <div className="genre-filter">
        {(Object.keys(genreMap) as GenreKey[]).map((g) => (
          <button
            key={g}
            className={genre === g ? 'active' : ''}
            onClick={() => setGenre(g)}
          >
            {g}
          </button>
        ))}
      </div>

      <MovieGrid 
        movies={genre
          ? movies.filter(m => m.genre_ids.includes(genreMap[genre]))
          : movies}
        isLoading={isLoading} 
        error={null}
      />
    </div>
  );
}

// 2. Definiera genreMap som en konstant med explicit typ
const genreMap = {
  Comedy: 35,
  Drama: 18,
} as const;
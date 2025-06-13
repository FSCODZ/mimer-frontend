'use client';
import { useEffect, useState } from 'react';
import { searchMovies } from '@/lib/api/tmdb';
import { Movie } from '../types';
import MovieGrid from '../MovieGrid/MovieGrid';
import InputField from '../InputField/InputField';

type GenreKey = keyof typeof genreMap;

export default function MovieSearch() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [genre, setGenre] = useState<GenreKey | ''>('');

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
        <InputField
          value={query}
          onChange={setQuery}
          placeholder="Search movie, TV shows or actors"
          onEnter={handleSearch}
        />
      </div>

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

const genreMap = {
  Comedy: 35,
  Drama: 18,
} as const;
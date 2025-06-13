import MovieCard from '../MovieCard/MovieCard';
import { MovieGridProps, Movie } from '../types'; 
import styles from './MovieGrid.module.scss';

export default function MovieGrid({ movies, isLoading, error }: MovieGridProps) {
  if (isLoading) {
    return <div className={styles.loadingIndicator}>Loading...</div>;
  }

  if (error) {
    return <div className={styles.errorMessage}>{error}</div>;
  }

  if (!movies?.length) { 
    return (
      <div className={styles.noResults}>
        No movies found. Try a different search.
      </div>
    );
  }

  return (
    <div className={styles.movieGrid}>
      {movies.map((movie: Movie) => ( 
        <MovieCard 
          key={movie.id} 
          movie={movie} 
        />
      ))}
    </div>
  );
}
import MovieCard from '../MovieCard/MovieCard';
import { MovieGridProps, Movie } from '../types';
import styles from './MovieGrid.module.scss';

const COMEDY_GENRE_ID = 35;
const DRAMA_GENRE_ID = 18;

export default function MovieGrid({ movies, isLoading, error }: MovieGridProps) {
  if (isLoading) return <div className={styles.loadingIndicator}>Loading...</div>;
  if (error) return <div className={styles.errorMessage}>{error}</div>;
  
  const comedyMovies = movies?.filter(movie => 
    movie.genre_ids?.includes(COMEDY_GENRE_ID)
  ) || [];
  
  const dramaMovies = movies?.filter(movie => 
    movie.genre_ids?.includes(DRAMA_GENRE_ID)
  ) || [];

  return (
    <div className={styles.movieGridContainer}>
      {comedyMovies.length > 0 && (
        <div className={styles.genreSection}>
          <h2 className={styles.genreTitle}>Comedy</h2>
          <div className={styles.moviesRow}>
            {comedyMovies.map(movie => (
              <MovieCard key={`comedy-${movie.id}`} movie={movie} />
            ))}
          </div>
        </div>
      )}

      {dramaMovies.length > 0 && (
        <div className={styles.genreSection}>
          <h2 className={styles.genreTitle}>Drama</h2>
          <div className={styles.moviesRow}>
            {dramaMovies.map(movie => (
              <MovieCard key={`drama-${movie.id}`} movie={movie} />
            ))}
          </div>
        </div>
      )}

      {comedyMovies.length === 0 && dramaMovies.length === 0 && !isLoading && (
        <div className={styles.noResults}>
          No movies found in Comedy or Drama genres.
        </div>
      )}
    </div>
  );
}
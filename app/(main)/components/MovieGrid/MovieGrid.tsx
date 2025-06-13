import MovieCard from '../MovieCard/MovieCard';
import { MovieGridProps } from '../types';
import styles from './MovieGrid.module.scss';

const ACTION_GENRE_ID = 28;
const COMEDY_GENRE_ID = 35;
const DRAMA_GENRE_ID = 18;
const MOVIES_PER_ROW = 20; 

export default function MovieGrid({ movies, isLoading, error }: MovieGridProps) {
  if (isLoading) return <div className={styles.loadingIndicator}>Loading...</div>;
  if (error) return <div className={styles.errorMessage}>{error}</div>;
  
  const actionMovies = movies?.filter(movie => 
    movie.genre_ids?.includes(ACTION_GENRE_ID)
  ).slice(0, MOVIES_PER_ROW) || [];

  const comedyMovies = movies?.filter(movie => 
    movie.genre_ids?.includes(COMEDY_GENRE_ID)
  ).slice(0, MOVIES_PER_ROW) || [];

  const dramaMovies = movies?.filter(movie => 
    movie.genre_ids?.includes(DRAMA_GENRE_ID)
  ).slice(0, MOVIES_PER_ROW) || [];

  return (
    <div className={styles.movieGridContainer}>
      {actionMovies.length > 0 && (
        <div className={styles.genreSection}>
          <h2 className={styles.genreTitle}>Action</h2>
          <div className={styles.moviesRow}>
            {actionMovies.map(movie => (
              <MovieCard key={`action-${movie.id}`} movie={movie} />
            ))}
          </div>
        </div>
      )}

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

    
    </div>
  );
}
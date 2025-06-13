import Image from 'next/image';
import styles from './MovieCard.module.scss';
import { Movie } from '../types';

const getYearFromDate = (dateString: string | undefined | null): string => {
  if (!dateString) return 'N/A';
  try {
    const date = new Date(dateString);
    return isNaN(date.getFullYear()) ? 'N/A' : date.getFullYear().toString();
  } catch {
    return 'N/A';
  }
};

export default function MovieCard({ movie }: { movie: Movie }) {
  const year = getYearFromDate(movie.release_date || movie.first_air_date);
  const title = movie.title || movie.name || 'Untitled';
  const genres = movie.genre_ids?.map(getGenreName).join(', ') || 'Unknown';
  const imageUrl = movie.poster_path 
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : null;

  return (
    <div className={styles.movieCard}>
      <div className={styles.posterWrapper}>
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={title}
            width={200}
            height={300}
            className={styles.poster}
            priority={false}
          />
        ) : (
          <div className={styles.posterFallback}>
            <span>No image available</span>
          </div>
        )}
      </div>
      <div className={styles.movieInfo}>
        <h3 className={styles.movieTitle}>{title}</h3>
        <div className={styles.movieMeta}>
          <span className={styles.movieYear}>{year}</span>
          {genres !== 'Unknown' && (
            <span className={styles.movieGenres}>{genres}</span>
          )}
        </div>
      </div>
    </div>
  );
}

function getGenreName(genreId: number): string {
  const genreMap: Record<number, string> = {
    28: 'Action', 35: 'Comedy', 18: 'Drama', 10749: 'Romance',
    12: 'Adventure', 16: 'Animation', 80: 'Crime', 99: 'Documentary',
  };
  return genreMap[genreId] || '';
}
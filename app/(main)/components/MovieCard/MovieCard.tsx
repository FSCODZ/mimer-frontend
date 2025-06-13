import Image from 'next/image';
import styles from './MovieCard.module.scss';
import { Movie } from '../types';

export default function MovieCard({ movie }: { movie: Movie }) {
  const imageUrl = movie.poster_path 
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : null;

  return (
    <div className={styles.movieCard}>
      <div className={styles.imageContainer}>
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={movie.title || 'Movie poster'}
            width={300}
            height={450}
            className={styles.posterImage}
            priority={false}
          />
        ) : (
          <div className={styles.noImage}>
            <span>No image available</span>
          </div>
        )}
      </div>
      <div className={styles.movieInfo}>
        <h3>{movie.title || movie.name}</h3>
        <p>{movie.release_date?.split('-')[0] || 'N/A'}</p>
        <p className={styles.overview}>
          {movie.overview || 'No overview available.'}
        </p>
      </div>
    </div>
  );
}
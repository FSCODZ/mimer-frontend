import MovieSearch from '@/app/(main)/components/MovieSearch/MovieSearch';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Movie Search | Mimer',
  description: 'Search movies using The Movie DB API',
};

export default function Home() {
  return (
    <div className="page-container">
      <h1 className="page-title">Find your next movie</h1>
      <MovieSearch />
    </div>
  );
}
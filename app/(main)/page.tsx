import MovieSearch from '@/app/(main)/components/MovieSearch/MovieSearch';
import { Metadata } from 'next';
import Navbar from './components/Navbar/Navbar';

export const metadata: Metadata = {
  title: 'Movie Search | Mimer',
  description: 'Search movies from tmbd movie api for an test for mimer test frontend',
};

export default function Home() {
  return (
    <div className="page-container">
      <Navbar/>
      <MovieSearch />
    </div>
  );
}
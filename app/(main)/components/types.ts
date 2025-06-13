export type Movie = {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  release_date: string;
  vote_average: number;
  vote_count: number;
  genre_ids: number[];
  name:string;
};

export type MoviesApiResponse = {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
};

export type MovieSearchProps = {
  initialQuery?: string;
  onSearch: (query: string) => void;
};

export type MovieGridProps = {
  movies: Movie[];
  isLoading: boolean;
  error: string | null;
};

export type MovieCardProps = {
  movie: Movie;
};
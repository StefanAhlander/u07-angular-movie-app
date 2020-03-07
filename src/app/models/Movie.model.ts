export interface Movie {
  id: number;
  title: string;
  backdrop_path: string;
  poster_path: string;
  overview: string;
  genres?: any[];
  homepage?: string;
  release_date?: string;
  vote_average?: number;
  vote_count?: number;
}

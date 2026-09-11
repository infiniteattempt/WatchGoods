import { useQuery } from "@tanstack/react-query";
import { AxiosInstance } from "axios";
import api from ".";

export type MovieDetail = {
  Title: string;
  Year: string;
  Rated?: string;
  Released?: string;
  Runtime?: string;
  Genre?: string;
  Director?: string;
  Writer?: string;
  Actors?: string;
  Plot?: string;
  Language?: string;
  Country?: string;
  Awards?: string;
  Poster: string;
  imdbRating?: string;
  imdbVotes?: string;
  imdbID: string;
  Type: string;
  Response?: string;
  Error?: string;
};

export const useMovieDetail = (id: string) => {
  return useQuery<MovieDetail>({
    queryKey: ["get-movie-detail", id],
    queryFn: () => doGetMovieDetail(id, api),
    retry: false,
    enabled: !!id,
  });
};

const doGetMovieDetail = async (
  id: string,
  axios: AxiosInstance
): Promise<MovieDetail> => {
  const result = await axios.get<MovieDetail>(
    `/?i=${id}&plot=full&apikey=cd0567ad`
  );
  return result.data;
};

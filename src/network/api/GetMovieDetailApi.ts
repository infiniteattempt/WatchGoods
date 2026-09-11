import { useQuery } from "@tanstack/react-query";
import { AxiosInstance } from "axios";
import api from ".";

export type MovieDetail = {
    Title: string;
    Year: string;
    imdbID: string;
    Type: string;
    Poster: string;
    Plot?: string;
    Director?: string;
    Actors?: string;
    imdbRating?: string;
}

export const useMovieDetail = (id: string) => {
    return useQuery<MovieDetail>({
        queryKey: ["get-movies", id],
        queryFn: () => doGetMovieDetail(id, api),
        retry: false
    })
}

const doGetMovieDetail = async (id: string, axios: AxiosInstance): Promise<MovieDetail> => {
    const result = await axios.get<MovieDetail>(`/?i=${id}&apikey=cd0567ad`)
    return result.data
}
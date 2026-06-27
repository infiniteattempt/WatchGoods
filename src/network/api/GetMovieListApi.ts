import { useQuery } from "@tanstack/react-query";
import { AxiosInstance } from "axios";
import api from ".";

export type MovieItem = {
    Title: string;
    Year: string;
    imdbID: string;
    Type: string;
    Poster: string;
}

export const useMovieList = () => {
    return useQuery<MovieItem[]>({
        queryKey: ["get-movies"],
        queryFn: () => doGetMovieList(api),
        retry : false
    })
}

const doGetMovieList = async(axios : AxiosInstance): Promise<MovieItem[]> => {
    const result = await axios.get<{ Search: MovieItem[] }>("/?s=movie&apikey=cd0567ad")
    return result.data.Search
}
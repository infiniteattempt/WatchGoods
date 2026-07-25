"use client"
import { Loading } from "@/src/common/presentation/Loading";
import MovieItemCell from "@/src/features/home/MovieItem";
import SearchBox from "@/src/features/home/SearchBox";
import { useMovieList } from "@/src/network/api/GetMovieListApi";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter()

  const { data, isError, isLoading } = useMovieList()

  if (isLoading)
    return <Loading />

  if (isError)
    return <h1>Error</h1>

  if (data)
    return <div className="flex flex-col gap-20 p-10">
      <SearchBox />

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
      >
        {
          data.map((items) => {
            return <MovieItemCell key={items.imdbID} item={items} />
          })
        }
      </div>
    </div>

}

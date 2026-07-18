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
    return <div>
      <SearchBox />

      <div style={{
        "display": "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
        "gap": "16px"
      }}>
        {
          data.map((items) => {
            return <MovieItemCell key={items.imdbID} item={items} />
          })
        }
      </div>
    </div>

}

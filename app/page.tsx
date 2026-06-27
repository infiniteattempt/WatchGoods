"use client"
import { Loading } from "@/src/common/presentation/Loading";
import MovieItemCell from "@/src/features/home/MovieItem";
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
    return <div style={{
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
  return (

    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">

      <button style={{ color: "white" }} title="click me" onClick={() => {
        router.push("/innerPage")
      }}>click me</button>

    </div>
  );
}

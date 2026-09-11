"use client"

import { useMovieDetail } from "@/src/network/api/GetMovieDetailApi"
import { useSearchParams } from "next/navigation"

const MovieDetail = () => {
    const searchParams = useSearchParams()
    const { data } = useMovieDetail(searchParams.get("id") ?? "")

    return <h1>
        {data?.Title}
    </h1>
}

export default MovieDetail
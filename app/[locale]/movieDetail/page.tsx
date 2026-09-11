"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Link } from "@/i18n/navigation";
import MovieDetailView from "@/src/features/movieDetail/MovieDetailView";
import { useMovieDetail } from "@/src/network/api/GetMovieDetailApi";

function MovieDetailContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id") ?? "";
  const { data, isError, isLoading } = useMovieDetail(id);

  if (!id) {
    return (
      <DetailState
        title="Missing movie"
        message="No movie id was provided in the URL."
      />
    );
  }

  if (isLoading) {
    return (
      <DetailState title="Loading" message="Fetching title details…" pulse />
    );
  }

  if (isError || !data || data.Response === "False") {
    return (
      <DetailState
        title="Couldn’t load movie"
        message={data?.Error ?? "Something went wrong. Try another title."}
      />
    );
  }

  return <MovieDetailView movie={data} />;
}

function DetailState({
  title,
  message,
  pulse = false,
}: {
  readonly title: string;
  readonly message: string;
  readonly pulse?: boolean;
}) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#0a0908] px-6 text-center text-[#f4efe6]">
      <p
        className={`text-xs tracking-[0.28em] text-[#e0b35a] uppercase ${pulse ? "animate-pulse" : ""}`}
      >
        {title}
      </p>
      <p className="mt-4 max-w-sm text-[#f4efe6]/65">{message}</p>
      <Link
        href="/"
        className="mt-8 text-sm tracking-wide text-[#f4efe6]/80 underline decoration-[#f4efe6]/25 underline-offset-4 transition hover:text-[#f4efe6]"
      >
        Back to movies
      </Link>
    </main>
  );
}

export default function MovieDetailPage() {
  return (
    <Suspense
      fallback={
        <DetailState title="Loading" message="Fetching title details…" pulse />
      }
    >
      <MovieDetailContent />
    </Suspense>
  );
}

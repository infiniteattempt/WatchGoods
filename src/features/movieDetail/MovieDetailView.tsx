"use client";

import { Link } from "@/i18n/navigation";
import { MovieDetail } from "@/src/network/api/GetMovieDetailApi";

type Props = {
  readonly movie: MovieDetail;
};

const hasPoster = (poster: string) => poster && poster !== "N/A";

export default function MovieDetailView({ movie }: Props) {
  const genres = movie.Genre?.split(", ").filter(Boolean) ?? [];
  const meta = [movie.Year, movie.Runtime, movie.Rated].filter(
    (value) => value && value !== "N/A"
  );

  return (
    <main className="movie-detail relative min-h-screen overflow-hidden bg-[#0a0908] text-[#f4efe6]">
      {hasPoster(movie.Poster) && (
        <div
          aria-hidden
          className="movie-detail-bg pointer-events-none absolute inset-0"
          style={{
            backgroundImage: `url(${movie.Poster})`,
          }}
        />
      )}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-b from-[#0a0908]/70 via-[#0a0908]/88 to-[#0a0908]"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(201,151,74,0.14),transparent_55%)]"
      />

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-6xl flex-col px-5 py-6 sm:px-8 sm:py-8">
        <Link
          href="/"
          className="movie-detail-enter group inline-flex w-fit items-center gap-2 text-sm tracking-wide text-[#f4efe6]/70 transition hover:text-[#f4efe6]"
        >
          <span
            aria-hidden
            className="transition-transform group-hover:-translate-x-0.5"
          >
            ←
          </span>
          Back to movies
        </Link>

        <section className="mt-10 flex flex-1 flex-col gap-10 md:mt-14 md:flex-row md:items-end md:gap-12 lg:gap-16">
          <div className="movie-detail-poster mx-auto w-full max-w-[280px] shrink-0 md:mx-0 md:max-w-[320px]">
            {hasPoster(movie.Poster) ? (
              <img
                src={movie.Poster}
                alt={`${movie.Title} poster`}
                className="aspect-[2/3] w-full object-cover shadow-[0_30px_80px_rgba(0,0,0,0.55)]"
              />
            ) : (
              <div className="flex aspect-[2/3] w-full items-center justify-center bg-[#1a1714] text-sm text-[#f4efe6]/40">
                No poster
              </div>
            )}
          </div>

          <div className="movie-detail-enter flex min-w-0 flex-1 flex-col pb-2 [animation-delay:120ms]">
            {movie.imdbRating && movie.imdbRating !== "N/A" && (
              <p className="mb-4 flex items-baseline gap-2 font-mono text-sm tracking-[0.2em] text-[#e0b35a] uppercase">
                <span aria-hidden className="text-base">
                  ★
                </span>
                <span className="text-2xl font-medium tracking-normal text-[#f0d08a]">
                  {movie.imdbRating}
                </span>
                <span className="text-[#f4efe6]/35 normal-case tracking-normal">
                  / 10
                  {movie.imdbVotes && movie.imdbVotes !== "N/A"
                    ? ` · ${movie.imdbVotes} votes`
                    : ""}
                </span>
              </p>
            )}

            <h1 className="font-sans text-4xl leading-[1.05] font-semibold tracking-tight text-[#f7f2ea] sm:text-5xl lg:text-6xl">
              {movie.Title}
            </h1>

            {meta.length > 0 && (
              <p className="mt-4 text-sm tracking-[0.18em] text-[#f4efe6]/55 uppercase">
                {meta.join(" · ")}
              </p>
            )}

            {genres.length > 0 && (
              <ul className="mt-6 flex flex-wrap gap-x-4 gap-y-2">
                {genres.map((genre) => (
                  <li
                    key={genre}
                    className="text-sm text-[#f4efe6]/80 underline decoration-[#f4efe6]/20 underline-offset-4"
                  >
                    {genre}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>

        <section className="movie-detail-enter mt-14 max-w-3xl border-t border-[#f4efe6]/10 pt-10 pb-16 [animation-delay:220ms]">
          <h2 className="text-xs tracking-[0.28em] text-[#e0b35a] uppercase">
            Story
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[#f4efe6]/82 sm:text-lg">
            {movie.Plot && movie.Plot !== "N/A"
              ? movie.Plot
              : "No plot available for this title."}
          </p>

          <dl className="mt-10 grid gap-6 sm:grid-cols-2">
            {movie.Director && movie.Director !== "N/A" && (
              <div>
                <dt className="text-xs tracking-[0.2em] text-[#f4efe6]/40 uppercase">
                  Director
                </dt>
                <dd className="mt-2 text-[#f4efe6]/90">{movie.Director}</dd>
              </div>
            )}
            {movie.Actors && movie.Actors !== "N/A" && (
              <div>
                <dt className="text-xs tracking-[0.2em] text-[#f4efe6]/40 uppercase">
                  Cast
                </dt>
                <dd className="mt-2 text-[#f4efe6]/90">{movie.Actors}</dd>
              </div>
            )}
            {movie.Writer && movie.Writer !== "N/A" && (
              <div className="sm:col-span-2">
                <dt className="text-xs tracking-[0.2em] text-[#f4efe6]/40 uppercase">
                  Writers
                </dt>
                <dd className="mt-2 text-[#f4efe6]/90">{movie.Writer}</dd>
              </div>
            )}
            {movie.Awards && movie.Awards !== "N/A" && (
              <div className="sm:col-span-2">
                <dt className="text-xs tracking-[0.2em] text-[#f4efe6]/40 uppercase">
                  Awards
                </dt>
                <dd className="mt-2 text-[#f4efe6]/90">{movie.Awards}</dd>
              </div>
            )}
          </dl>
        </section>
      </div>
    </main>
  );
}

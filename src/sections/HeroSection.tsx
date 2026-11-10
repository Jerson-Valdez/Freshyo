import { ArrowDown } from "lucide-react";
import { Chinny } from "../components/mascot/Chinny";
import { NavLink } from "react-router";

export function HeroSection() {
  return (
    <section
      className="relative mt-3 grid min-h-[15rem] grid-cols-[minmax(0,1.1fr)_minmax(7rem,.9fr)] items-center gap-1 overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-100 via-stone-100 to-amber-100 px-4 py-4 sm:mt-6 sm:min-h-[21rem] sm:grid-cols-[1.05fr_.95fr] sm:gap-2 sm:rounded-[2rem] sm:px-8 sm:py-7 lg:px-10"
      aria-labelledby="home-heading"
    >
      <div className="relative z-10 flex flex-col items-start justify-center py-5 max-md:pb-0">
        <h1
          id="home-heading"
          className="max-w-lg font-heading text-[1.7rem] leading-[1.08] font-semibold tracking-[-.035em] text-stone-900 sm:text-4xl lg:text-5xl"
        >
          Presyo ng mga bilihin
        </h1>
        <p className="mt-2 max-w-md text-[13px] leading-5 text-stone-600 sm:mt-4 sm:text-sm sm:leading-6">
          Tingnan ang presyo at tantiyahin ang gastos bago mamalengke.
        </p>
        <NavLink
          className="mt-4 inline-flex min-h-10 items-center gap-1.5 rounded-2xl bg-emerald-700 px-3 text-xs font-semibold text-white shadow-sm transition hover:bg-emerald-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700 sm:mt-6 sm:min-h-11 sm:gap-2 sm:px-5 sm:text-sm hover:shadow-md hover:-translate-y-0.5 duration-300 transistion-all"
          to="/prices"
        >
          <span className="sm:hidden">Mga presyo</span>
          <span className="hidden sm:inline">Tingnan ang mga presyo</span>
          <ArrowDown aria-hidden="true" className="size-4" />
        </NavLink>
      </div>
      <div className="relative flex h-40 min-w-0 items-center justify-center sm:h-72 md:h-80">
        <div
          aria-hidden="true"
          className="absolute right-[2%] bottom-[8%] size-32 rounded-full bg-emerald-100/80 sm:right-[8%] sm:size-64 lg:size-72"
        />
        <div
          aria-hidden="true"
          className="absolute top-[12%] right-[4%] size-8 rotate-12 rounded-xl bg-amber-200/70 sm:right-[13%] sm:size-14 sm:rounded-2xl"
        />
        <div
          aria-hidden="true"
          className="absolute bottom-[12%] left-[4%] size-5 rounded-full bg-rose-200/80 sm:bottom-[15%] sm:left-[11%] sm:size-8"
        />
        <Chinny
          pose="walking"
          mobilePose="default"
          shadow="strong"
          alt="Si Chinny, may dalang sariwang gulay sa dalawang supot."
          className="relative z-10 h-40 w-full max-w-44 scale-125 object-contain sm:h-72 sm:max-w-[24rem] sm:scale-100 md:h-80"
          loading="eager"
        />
      </div>
    </section>
  );
}

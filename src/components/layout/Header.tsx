import { ChartNoAxesColumnIncreasing, MapPin, ShoppingBasket } from "lucide-react";

export function Header() {
  return (
    <header className="fixed left-1/2 top-2 z-50 w-sm -translate-x-1/2 rounded-full border border-emerald-100/80 bg-stone-50/20 shadow-[0_4px_24px_rgba(31,77,0,0.05)] backdrop-blur-xs supports-[backdrop-filter]:bg-stone-50/75 max-sm:w-[calc(100vw-2rem)] lg:w-6xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center px-12 max-md:px-6 max-sm:px-4">
        <a
          className="flex shrink-0 items-center rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-700"
          href="#home"
          aria-label="Freshyo, simula"
        >
          <img
            src="/freshyo-leaf.png"
            alt=""
            className="h-11 w-auto object-contain max-sm:h-9"
          />
        </a>
        <nav
          className="ml-10 flex h-full items-center gap-8 text-sm max-sm:ml-auto max-sm:gap-4"
          aria-label="Pangunahing nabigasyon"
        >
          <a
            className="flex h-10 items-center justify-center gap-2 rounded-full bg-emerald-700 px-4 font-semibold text-white transition-colors hover:bg-emerald-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700 max-sm:size-11 max-sm:px-0"
            href="#prices"
            aria-label="Mga presyo"
          >
            <ChartNoAxesColumnIncreasing aria-hidden="true" className="size-4" />
            <span className="max-sm:hidden">Mga presyo</span>
          </a>
          <a
            className="flex h-full items-center gap-2 text-stone-600 transition hover:text-emerald-800"
            href="#basket"
          >
            <ShoppingBasket aria-hidden="true" className="size-4" />
            <span className="max-sm:hidden">Aking listahan</span>
            <span className="sm:hidden">Listahan</span>
          </a>
        </nav>
        <span className="ml-auto flex items-center gap-1.5 text-xs text-stone-500 max-sm:hidden">
          <MapPin aria-hidden="true" className="size-4 text-emerald-700" />
          Pilipinas
        </span>
      </div>
    </header>
  );
}

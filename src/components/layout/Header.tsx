import { ChartNoAxesColumnIncreasing, ChartNoAxesCombined, MapPin, ShoppingBasket } from "lucide-react";
import { NavLink } from "react-router";

const navItemBase = "flex h-10 items-center justify-center gap-2 rounded-full px-4 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700 max-sm:size-11 max-sm:px-0";
const navItemState = ({ isActive }: { isActive: boolean }) => `${navItemBase} ${isActive ? "bg-emerald-700 font-semibold text-white hover:bg-emerald-800" : "text-stone-600 hover:bg-emerald-50 hover:text-emerald-800"}`;

export function Header() {
  return (
    <header className="fixed left-1/2 top-2 z-50 w-sm -translate-x-1/2 rounded-full border border-emerald-100/80 bg-stone-50/20 shadow-[0_4px_24px_rgba(31,77,0,0.05)] backdrop-blur-xs supports-[backdrop-filter]:bg-stone-50/75 max-sm:w-[calc(100vw-2rem)] lg:w-6xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center px-12 max-md:px-6 max-sm:px-4">
        <NavLink
          className="flex shrink-0 items-center rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-700"
          to="/"
          end
          aria-label="Freshyo, simula"
        >
          <img
            src="/freshyo-leaf.png"
            alt=""
            className="h-11 w-auto object-contain max-sm:h-9"
          />
        </NavLink>
        <nav
          className="ml-10 flex h-full items-center gap-5 text-sm max-sm:ml-auto max-sm:gap-2.5 lg:gap-8"
          aria-label="Pangunahing nabigasyon"
        >
          <NavLink
            className={navItemState}
            to="/prices"
            end
            aria-label="Mga presyo"
          >
            <ChartNoAxesColumnIncreasing aria-hidden="true" className="size-4" />
            <span className="max-sm:hidden">Mga presyo</span>
          </NavLink>
          <NavLink
            className={navItemState}
            to="/forecast"
            end
            aria-label="Pagtataya ng presyo"
          >
            <ChartNoAxesCombined aria-hidden="true" className="size-4" />
            <span className="max-sm:hidden">Pagtataya</span>
          </NavLink>
          <NavLink
            className={({ isActive }) => `flex h-10 items-center gap-2 rounded-full px-3 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700 ${isActive ? "bg-emerald-700 font-semibold text-white hover:bg-emerald-800" : "text-stone-600 hover:bg-emerald-50 hover:text-emerald-800"}`}
            to="/basket"
            end
          >
            <ShoppingBasket aria-hidden="true" className="size-4" />
            <span className="max-sm:hidden">Aking listahan</span>
            <span className="sm:hidden">Listahan</span>
          </NavLink>
        </nav>
        <span className="ml-auto flex items-center gap-1.5 text-xs text-stone-500 max-sm:hidden">
          <MapPin aria-hidden="true" className="size-4 text-emerald-700" />
          Pilipinas
        </span>
      </div>
    </header>
  );
}

import { ShoppingBasket } from "lucide-react";
import type { MouseEvent } from "react";
import { Link, useLocation } from "react-router";
import { useBasket } from "../../app/contexts/BasketContext";

type ActiveSection = "home" | "prices" | "basket" | null;

export function Header({ activeSection }: { activeSection?: ActiveSection }) {
  const { pathname } = useLocation();
  const { basket } = useBasket();
  const basketActive =
    activeSection === undefined
      ? pathname === "/basket"
      : activeSection === "basket";

  function scrollToBasket(event: MouseEvent<HTMLAnchorElement>) {
    if (pathname !== "/basket") return;
    event.preventDefault();
    document
      .getElementById("basket")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function scrollToHome(event: MouseEvent<HTMLAnchorElement>) {
    if (pathname !== "/") return;
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <header className="fixed inset-x-3 top-3 z-50 mx-auto max-w-7xl rounded-full border border-white/80 bg-stone-50/70 shadow-[0_8px_30px_rgba(31,77,0,0.13)] backdrop-blur-xs">
      <div className="flex h-14 items-center justify-between px-4 sm:h-16 sm:px-6">
        <Link
          className="flex min-h-11 items-center rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700"
          to="/"
          onClick={scrollToHome}
          aria-label="Freshyo, simula"
        >
          <img
            src="/freshyo-leaf.png"
            alt="Freshyo"
            className="h-9 w-auto object-contain sm:h-11"
          />
        </Link>
        <Link
          to="/basket"
          onClick={scrollToBasket}
          aria-label={`Aking listahan, ${basket.length} bilihin`}
          aria-current={basketActive ? "page" : undefined}
          className={`relative inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-3 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700 ${basketActive ? "bg-emerald-700 text-white" : "text-emerald-900 hover:bg-emerald-50"}`}
        >
          <span className="relative inline-flex">
            <ShoppingBasket aria-hidden="true" className="size-5" />
            {basket.length > 0 && (
              <span className="absolute -top-2 -right-2 inline-flex size-4 items-center justify-center rounded-full bg-amber-500 text-[9px] font-bold text-stone-950">
                {basket.length > 9 ? "9+" : basket.length}
              </span>
            )}
          </span>
          <span className="hidden sm:inline">Listahan</span>
        </Link>
      </div>
    </header>
  );
}

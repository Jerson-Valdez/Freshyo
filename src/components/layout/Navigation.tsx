import {
  ChartNoAxesColumnIncreasing,
  ChartNoAxesCombined,
  House,
  ShoppingBasket,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { MouseEvent } from "react";
import { Link, NavLink, useLocation } from "react-router";

type MarketSection = "home" | "prices" | "basket";
type ActiveSection = MarketSection | null;

const items: Array<{
  to: string;
  label: string;
  id: MarketSection | "forecast";
  Icon: LucideIcon;
}> = [
  { to: "/", label: "Home", id: "home", Icon: House },
  { to: "/prices", label: "Mga presyo", id: "prices", Icon: ChartNoAxesColumnIncreasing },
  { to: "/forecast", label: "Pagtataya", id: "forecast", Icon: ChartNoAxesCombined },
  { to: "/basket", label: "Listahan", id: "basket", Icon: ShoppingBasket },
];

function navItemClass(active: boolean, mobile: boolean) {
  const shared = "flex items-center font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700";
  if (mobile) {
    return `${shared} min-h-12 min-w-12 justify-center gap-2 rounded-full px-3 text-xs ${active ? "bg-emerald-700 text-white" : "text-emerald-900 hover:bg-emerald-50"}`;
  }
  return `${shared} w-full justify-start gap-3 rounded-2xl px-4 py-3 text-sm ${active ? "bg-emerald-700 text-white" : "text-stone-600 hover:bg-emerald-50 hover:text-emerald-900"}`;
}

function NavItem({
  item,
  mobile,
  active,
  pathname,
}: {
  item: (typeof items)[number];
  mobile: boolean;
  active: boolean;
  pathname: string;
}) {
  const { Icon } = item;
  const classes = navItemClass(active, mobile);
  const label = <span className={mobile && !active ? "sr-only" : "whitespace-nowrap"}>{item.label}</span>;

  if (item.id === "forecast") {
    return (
      <NavLink to={item.to} end aria-label={item.label} className={({ isActive }) => navItemClass(isActive, mobile)}>
        <Icon aria-hidden="true" className="size-5 shrink-0" />
        {label}
      </NavLink>
    );
  }

  function scrollOnSameRoute(event: MouseEvent<HTMLAnchorElement>) {
    if (pathname !== item.to) return;
    event.preventDefault();
    document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <Link
      to={item.to}
      onClick={scrollOnSameRoute}
      aria-label={item.label}
      aria-current={active ? "page" : undefined}
      className={classes}
    >
      <Icon aria-hidden="true" className="size-5 shrink-0" />
      {label}
    </Link>
  );
}

export function Navigation({ activeSection }: { activeSection?: ActiveSection }) {
  const { pathname } = useLocation();
  const activeFor = (item: (typeof items)[number]) => {
    if (item.id === "forecast") return pathname === "/forecast";
    return activeSection === undefined ? false : activeSection === item.id;
  };

  return (
    <>
      <nav
        aria-label="Pangunahing nabigasyon"
        className="fixed top-24 left-5 z-40 hidden h-fit w-56 flex-col gap-1 rounded-3xl border border-white/80 bg-white/68 p-3 shadow-[0_10px_32px_rgba(31,77,0,0.12)] ring-1 ring-emerald-950/5 backdrop-blur-2xl lg:flex"
      >
        {items.map((item) => (
          <NavItem key={item.id} item={item} mobile={false} active={activeFor(item)} pathname={pathname} />
        ))}
      </nav>
      <nav
        aria-label="Pangunahing nabigasyon"
        className="fixed inset-x-3 bottom-[calc(env(safe-area-inset-bottom)+0.75rem)] z-50 flex items-center justify-around gap-1 rounded-full border border-white/80 bg-stone-50/68 px-2 py-2 shadow-[0_10px_32px_rgba(31,77,0,0.15)] ring-1 ring-emerald-950/5 backdrop-blur-2xl lg:hidden"
      >
        {items.map((item) => (
          <NavItem key={item.id} item={item} mobile active={activeFor(item)} pathname={pathname} />
        ))}
      </nav>
    </>
  );
}

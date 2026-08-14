export type NavItem = {
  title: string;
  href: string;
  blurb: string;
};

export type NavGroup = {
  label: string;
  items: NavItem[];
};

export const nav: NavGroup[] = [
  {
    label: "Start Here",
    items: [
      {
        title: "The Story",
        href: "/",
        blurb: "Why this platform exists, told in plain words.",
      },
      {
        title: "Problem & Goals",
        href: "/problem",
        blurb: "Five real pains, and what we promise to fix.",
      },
      {
        title: "How It Works",
        href: "/flow",
        blurb: "One box, four phases, from factory to front door.",
      },
    ],
  },
  {
    label: "The System",
    items: [
      {
        title: "The 12 Portals",
        href: "/portals",
        blurb: "Every door in the building, and who opens it.",
      },
      {
        title: "Architecture",
        href: "/architecture",
        blurb: "What runs where, and how the parts talk.",
      },
      {
        title: "Order Lifecycle",
        href: "/lifecycle",
        blurb: "One order, followed step by step.",
      },
    ],
  },
  {
    label: "Global Scale",
    items: [
      {
        title: "Multi-Region",
        href: "/multi-region",
        blurb: "Fast everywhere, but the data stays home.",
      },
      {
        title: "Multi-Currency",
        href: "/multi-currency",
        blurb: "Five currencies in, one honest ledger out.",
      },
    ],
  },
  {
    label: "Technology",
    items: [
      {
        title: "Tech Stack",
        href: "/tech-stack",
        blurb: "What we chose, scored and explained.",
      },
      {
        title: "Integrations",
        href: "/integrations",
        blurb: "Couriers, payments, customs and government.",
      },
      {
        title: "Security",
        href: "/security",
        blurb: "Locks, keys and KSA rules.",
      },
      {
        title: "ISO Compliance",
        href: "/iso-compliance",
        blurb: "Five standards, and how we get certified.",
      },
    ],
  },
  {
    label: "Delivery",
    items: [
      {
        title: "Build Roadmap",
        href: "/roadmap",
        blurb: "Five phases, in the order that pays back fastest.",
      },
      {
        title: "Reference Projects",
        href: "/references",
        blurb: "Three platforms worth copying homework from.",
      },
    ],
  },
];

export const flatNav: NavItem[] = nav.flatMap((g) => g.items);

export function neighbours(href: string) {
  const i = flatNav.findIndex((n) => n.href === href);
  return {
    prev: i > 0 ? flatNav[i - 1] : null,
    next: i >= 0 && i < flatNav.length - 1 ? flatNav[i + 1] : null,
  };
}

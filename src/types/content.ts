export type DietaryTag = "vegan" | "vegetarian" | "gluten-free";
export type AllergenTag =
  | "gluten"
  | "dairy"
  | "eggs"
  | "nuts"
  | "fish"
  | "shellfish"
  | "soy";

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  dietary: DietaryTag[];
  allergens: AllergenTag[];
  spicy: boolean;
  featured: boolean;
  bestSeller: boolean;
}

export interface MenuCategory {
  id: string;
  name: string;
  description: string;
  items: MenuItem[];
}

export interface Chef {
  id: string;
  name: string;
  title: string;
  bio: string;
  image: string;
  origin: string;
}

export interface TimelineEntry {
  year: number;
  event: string;
}

export interface DayHours {
  open: string;
  close: string;
}

export interface Location {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  phone: string;
  email: string;
  mapEmbedUrl: string;
  hours: Record<string, DayHours>;
  features: string[];
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  price: number | null;
  currency: string;
  seats: number | null;
  image: string;
  bookingLink: string;
  tags: string[];
}

export interface CateringPackage {
  id: string;
  name: string;
  tagline: string;
  guests: string;
  price: number;
  priceUnit: string;
  includes: string[];
}

export interface Review {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  text: string;
  date: string;
  platform: string;
}

export interface RatingSummary {
  average: number;
  total: number;
  breakdown: Record<string, number>;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface Career {
  id: string;
  title: string;
  type: string;
  location: string;
  description: string;
  requirements: string[];
  benefits: string[];
}

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  caption: string;
}

export interface BookingConfig {
  minGuests: number;
  maxGuests: number;
  minAdvanceHours: number;
  occasions: string[];
  timeSlots: string[];
  closedDays: string[];
}

export interface NavLink {
  label: string;
  href: string;
}

export interface SocialProfile {
  platform: string;
  handle: string;
  url: string;
}

export interface PageSeo {
  title: string;
  description: string;
  ogImage: string;
  keywords?: string[];
}

export interface ScrollStoryItem {
  heading: string;
  body: string;
  accent: string;
}

export interface PolicySection {
  title: string;
  body: string;
}

export interface SiteContent {
  site: {
    name: string;
    tagline: string;
    description: string;
    logo: string;
    email: string;
    phone: string;
    founded: string;
  };
  seo: Record<string, PageSeo>;
  hero: {
    heading: string;
    subheading: string;
    cta: NavLink;
    secondaryCta: NavLink;
    scrollStory: ScrollStoryItem[];
  };
  about: {
    story: string;
    sourcingNote: string;
    chefs: Chef[];
    timeline: TimelineEntry[];
  };
  menu: {
    categories: MenuCategory[];
  };
  featured: string[];
  gallery: GalleryImage[];
  locations: Location[];
  events: Event[];
  catering: {
    intro: string;
    packages: CateringPackage[];
  };
  reviews: Review[];
  ratingSummary: RatingSummary;
  faq: FaqItem[];
  careers: Career[];
  socials: SocialProfile[];
  navigation: {
    links: NavLink[];
    cta: NavLink;
  };
  bookingConfig: BookingConfig;
  contact: {
    formNote: string;
    enquiryTypes: string[];
  };
  privacy: {
    lastUpdated: string;
    sections: PolicySection[];
  };
  terms: {
    lastUpdated: string;
    sections: PolicySection[];
  };
}

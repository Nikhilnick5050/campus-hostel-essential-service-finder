import {
  Utensils, Book, Heart, Bus, Wifi, Building, Shirt, Pencil,
  Trophy, Home, MapPin, Search, Menu, X, Sparkles, Phone, Clock,
  Info, Mail, LayoutGrid, ChevronRight, ExternalLink, CheckCircle2,
  AlertTriangle, Plus, Trash2, Edit3, LogOut, ShieldCheck, ListChecks,
  ArrowRight, Compass, Navigation, CircleDot, Users, Globe, Lock,
} from "lucide-react";

const map = {
  utensils: Utensils,
  book: Book,
  heart: Heart,
  bus: Bus,
  wifi: Wifi,
  building: Building,
  shirt: Shirt,
  pencil: Pencil,
  trophy: Trophy,
  home: Home,
  "map-pin": MapPin,
  search: Search,
  menu: Menu,
  x: X,
  sparkles: Sparkles,
  phone: Phone,
  clock: Clock,
  info: Info,
  mail: Mail,
  grid: LayoutGrid,
  "chevron-right": ChevronRight,
  "external-link": ExternalLink,
  check: CheckCircle2,
  warning: AlertTriangle,
  plus: Plus,
  trash: Trash2,
  edit: Edit3,
  logout: LogOut,
  shield: ShieldCheck,
  list: ListChecks,
  "arrow-right": ArrowRight,
  compass: Compass,
  navigation: Navigation,
  dot: CircleDot,
  users: Users,
  globe: Globe,
  lock: Lock,
};

export default function Icon({ name, size = 22, className = "" }) {
  const Cmp = map[name] || MapPin;
  return <Cmp size={size} className={className} aria-hidden="true" />;
}
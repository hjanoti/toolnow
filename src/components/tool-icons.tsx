import {
  Banknote,
  Binary,
  Braces,
  Calculator,
  CalendarDays,
  CaseSensitive,
  CheckCircle2,
  Clock,
  Code2,
  Database,
  FileImage,
  FileJson,
  FileText,
  Files,
  Fingerprint,
  GitCompare,
  Image as ImageIcon,
  KeyRound,
  Landmark,
  Link2,
  ListOrdered,
  Percent,
  PiggyBank,
  QrCode,
  Receipt,
  Regex,
  Sparkles,
  TrendingUp,
  Type,
  UserRound,
  Wallet,
  type LucideIcon,
} from "lucide-react";

/**
 * Registry of icon keys used by tool/category definitions.
 * Add here first if a new tool needs a new icon.
 */
const ICONS: Record<string, LucideIcon> = {
  banknote: Banknote,
  binary: Binary,
  braces: Braces,
  calculator: Calculator,
  calendar: CalendarDays,
  case: CaseSensitive,
  check: CheckCircle2,
  clock: Clock,
  code: Code2,
  database: Database,
  file: FileText,
  "file-image": FileImage,
  "file-json": FileJson,
  files: Files,
  fingerprint: Fingerprint,
  diff: GitCompare,
  image: ImageIcon,
  key: KeyRound,
  landmark: Landmark,
  link: Link2,
  list: ListOrdered,
  percent: Percent,
  "piggy-bank": PiggyBank,
  "qr-code": QrCode,
  receipt: Receipt,
  regex: Regex,
  sparkles: Sparkles,
  "trending-up": TrendingUp,
  type: Type,
  user: UserRound,
  wallet: Wallet,
};

export function ToolIcon({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const Icon = ICONS[name] ?? Sparkles;
  return <Icon className={className} aria-hidden />;
}

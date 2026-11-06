import {
  // Programming / Tech
  Code2,
  Terminal,
  Database,
  Server,
  Cloud,
  Shield,
  Cpu,
  Smartphone,
  Monitor,
  Globe,
  Gamepad2,

  // Design / Creative
  Palette,
  Brush,
  PenTool,
  Camera,
  Video,
  Film,
  Music,
  Mic,
  Headphones,

  // Business / Finance / Marketing
  Briefcase,
  TrendingUp,
  DollarSign,
  LineChart,
  BarChart3,
  PieChart,
  Megaphone,
  Target,
  Rocket,
  Lightbulb,

  // Education / Reference
  GraduationCap,
  BookOpen,
  Book,
  Library,
  Calculator,
  Sigma,
  Languages,

  // Science
  FlaskConical,
  Microscope,
  Atom,
  Brain,

  // Health / Lifestyle
  Heart,
  Dumbbell,
  Utensils,
  ChefHat,
  Leaf,

  // Writing / Communication
  PenLine,
  FileText,
  MessageSquare,
  Users,

  // Other useful topics
  Compass,
  Map,
  Puzzle,
  Wrench,
  Zap,
  Clock,
  Building,
} from "lucide-react";

export const CATEGORY_ICONS = [
  // Programming / Tech
  { name: "Code2", component: Code2 },
  { name: "Terminal", component: Terminal },
  { name: "Database", component: Database },
  { name: "Server", component: Server },
  { name: "Cloud", component: Cloud },
  { name: "Shield", component: Shield },
  { name: "Cpu", component: Cpu },
  { name: "Smartphone", component: Smartphone },
  { name: "Monitor", component: Monitor },
  { name: "Globe", component: Globe },
  { name: "Gamepad2", component: Gamepad2 },

  // Design / Creative
  { name: "Palette", component: Palette },
  { name: "Brush", component: Brush },
  { name: "PenTool", component: PenTool },
  { name: "Camera", component: Camera },
  { name: "Video", component: Video },
  { name: "Film", component: Film },
  { name: "Music", component: Music },
  { name: "Mic", component: Mic },
  { name: "Headphones", component: Headphones },

  // Business / Finance / Marketing
  { name: "Briefcase", component: Briefcase },
  { name: "TrendingUp", component: TrendingUp },
  { name: "DollarSign", component: DollarSign },
  { name: "LineChart", component: LineChart },
  { name: "BarChart3", component: BarChart3 },
  { name: "PieChart", component: PieChart },
  { name: "Megaphone", component: Megaphone },
  { name: "Target", component: Target },
  { name: "Rocket", component: Rocket },
  { name: "Lightbulb", component: Lightbulb },

  // Education / Reference
  { name: "GraduationCap", component: GraduationCap },
  { name: "BookOpen", component: BookOpen },
  { name: "Book", component: Book },
  { name: "Library", component: Library },
  { name: "Calculator", component: Calculator },
  { name: "Sigma", component: Sigma },
  { name: "Languages", component: Languages },

  // Science
  { name: "FlaskConical", component: FlaskConical },
  { name: "Microscope", component: Microscope },
  { name: "Atom", component: Atom },
  { name: "Brain", component: Brain },

  // Health / Lifestyle
  { name: "Heart", component: Heart },
  { name: "Dumbbell", component: Dumbbell },
  { name: "Utensils", component: Utensils },
  { name: "ChefHat", component: ChefHat },
  { name: "Leaf", component: Leaf },

  // Writing / Communication
  { name: "PenLine", component: PenLine },
  { name: "FileText", component: FileText },
  { name: "MessageSquare", component: MessageSquare },
  { name: "Users", component: Users },

  // Other
  { name: "Compass", component: Compass },
  { name: "Map", component: Map },
  { name: "Puzzle", component: Puzzle },
  { name: "Wrench", component: Wrench },
  { name: "Zap", component: Zap },
  { name: "Clock", component: Clock },
  { name: "Building", component: Building },
];

const MAP = Object.fromEntries(
  CATEGORY_ICONS.map((i) => [i.name, i.component])
);

export const getCategoryIcon = (name) => MAP[name] || BookOpen;
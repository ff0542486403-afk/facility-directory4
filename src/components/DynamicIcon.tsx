import React from 'react';
import {
  Coffee,
  Headphones,
  UserCog,
  Users,
  Award,
  Armchair,
  DoorOpen,
  ArrowUpDown,
  Boxes,
  Footprints,
  Briefcase,
  Server,
  Presentation,
  GraduationCap,
  Computer,
  Printer,
  Tv,
  Scan,
  Smartphone,
  Network,
  HelpCircle,
  LucideIcon
} from 'lucide-react';

interface DynamicIconProps {
  name: string;
  className?: string;
}

const iconMap: Record<string, LucideIcon> = {
  Coffee,
  Headphones,
  UserCog,
  Users,
  Award,
  Armchair,
  DoorOpen,
  ArrowUpDown,
  Box: Boxes,
  Boxes,
  Stairs: Footprints,
  Footprints,
  Elevator: Boxes,
  Briefcase,
  Server,
  Presentation,
  GraduationCap,
  computer: Computer,
  printer: Printer,
  screen: Tv,
  scanner: Scan,
  kiosk: Smartphone,
  network: Network,
};

export const DynamicIcon: React.FC<DynamicIconProps> = ({ name, className = 'w-4 h-4' }) => {
  const IconComponent = iconMap[name] || HelpCircle;
  return <IconComponent className={className} />;
};

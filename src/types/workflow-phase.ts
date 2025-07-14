import { CMSItem } from "@/hooks/use-data";

export interface WorfklowPhase extends CMSItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  order: number;
  created_at: string;
  updated_at: string;
}

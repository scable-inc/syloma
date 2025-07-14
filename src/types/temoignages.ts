import { CMSItem, CMSMedia } from "@/hooks/use-data";

export interface Temoignage extends CMSItem {
  nom: string;
  entreprise?: string;
  poste?: string;
  formation_suivie?: string;
  temoignage: string;
  note?: number;
  type: string;
  photo: CMSMedia;
  date_temoignage?: string;
  ordre?: number;
  approuve: boolean;
}
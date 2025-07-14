import { CMSItem, CMSMedia } from "@/hooks/use-data";

export interface Certification extends CMSItem {
  nom: string;
  description: string;
  logo: CMSMedia;
  organisme_certificateur: string;
  date_obtention?: string;
  date_expiration?: string;
  numero_certification?: string;
  ordre?: number;
  active: boolean;
}
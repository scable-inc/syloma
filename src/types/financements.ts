import { CMSItem, CMSMedia } from "@/hooks/use-data";

export interface Financement extends CMSItem {
  nom: string;
  slug: string;
  description: string; // rich text
  eligibilite: string; // rich text
  processus: string; // rich text
  logo?: CMSMedia;
  site_officiel?: string;
  actif: boolean;
}
import { CMSItem } from "@/hooks/use-data";

export interface FAQ extends CMSItem {
  categorie: string;
  question: string;
  reponse: string;
  mots_cles?: string[];
  thematique?: string;
  ordre?: number;
  active: boolean;
}
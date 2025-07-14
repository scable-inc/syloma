import { CMSItem, CMSMedia, CMSPrice } from "@/hooks/use-data";

export interface Formation extends CMSItem {
  titre: string;
  slug: string;
  accroche: string;
  objectifs_pedagogiques: string; // rich text
  public_vise: string;
  prerequis?: string; // rich text
  programme_detaille: string; // rich text
  methodes_mobilisees: string; // rich text
  duree: string;
  rythme: string;
  lieu: string;
  accessibilite: string; // rich text
  modalites_evaluation: string; // rich text
  niveau: string;
  modalites: string[];
  prix: CMSPrice;
  formateur_id: string;
  thematique_id: string;
  financements_eligibles?: string[];
  image_principale?: CMSMedia;
  active: boolean;
}

export interface Formateur extends CMSItem {
  nom: string;
  slug: string;
  bio: string; // rich text
  logo_photo?: CMSMedia;
  specialites: string[];
  certifications?: string[];
  email_contact?: string;
  telephone?: string;
  site_web?: string;
  linkedin?: string;
  experience_annees?: number;
  actif: boolean;
}

export interface Thematique extends CMSItem {
  nom: string;
  slug: string;
  description: string; // rich text
  icone?: string;
  couleur?: string;
  ordre?: number;
  active: boolean;
}

export interface Certification extends CMSItem {
  nom: string;
  description: string; // rich text
  logo?: CMSMedia;
  organisme_certificateur: string;
  date_obtention?: string;
  date_expiration?: string;
  numero_certification?: string;
  ordre?: number;
  active: boolean;
}

export interface Temoignage extends CMSItem {
  nom: string;
  entreprise?: string;
  poste?: string;
  formation_suivie?: string;
  temoignage: string; // rich text
  note?: number; // rating
  type: string;
  photo?: CMSMedia;
  date_temoignage?: string;
  ordre?: number;
  approuve: boolean;
}
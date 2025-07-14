import { CMSItem } from "@/hooks/use-data";

export interface DemandeContact extends CMSItem {
  nom: string;
  prenom: string;
  email: string;
  telephone?: string;
  entreprise?: string;
  formation_id?: string;
  type_demande: string;
  message: string; // rich text
  statut: string;
  priorite: string;
  notes_internes?: string; // rich text
}

export interface AdhesionFormateur extends CMSItem {
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  entreprise?: string;
  siret?: string;
  specialites: string[];
  experience: string; // rich text
  certifications_detenues?: string[];
  site_web?: string;
  linkedin?: string;
  type_demande: string;
  message?: string; // rich text
  cv?: any; // file
  statut: string;
  notes_evaluation?: string; // rich text
}

export interface FAQ extends CMSItem {
  categorie: string;
  question: string;
  reponse: string; // rich text
  mots_cles?: string[];
  thematique?: string;
  ordre?: number;
  active: boolean;
}

export interface Financement extends CMSItem {
  nom: string;
  slug: string;
  description: string; // rich text
  eligibilite: string; // rich text
  processus: string; // rich text
  logo?: any; // image
  site_officiel?: string;
  actif: boolean;
}
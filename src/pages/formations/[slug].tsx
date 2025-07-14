import React from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { ArrowLeft, Clock, MapPin, Users, Trophy, Star, Euro, Phone, Mail, Calendar, CheckCircle, FileText, Award, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Formation, Formateur, Thematique } from '@/types/formations';
import { Financement } from '@/types/financements';
import { useCMSData, getCMSData, getCMSItem } from '@/hooks/use-data';
import ContactForm from '@/components/formations/ContactForm';

interface FormationDetailPageProps {
  formation: Formation;
  formateur: Formateur | null;
  thematique: Thematique | null;
  financements: Financement[];
  formationsSimilaires: Formation[];
}

export default function FormationDetailPage({
  formation: initialFormation,
  formateur: initialFormateur,
  thematique: initialThematique,
  financements: initialFinancements,
  formationsSimilaires: initialFormationsSimilaires
}: FormationDetailPageProps) {

  console.log('FormationDetailPage rendering for:', initialFormation?.slug);

  if (!initialFormation) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-20 pb-16">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">Formation non trouvée</h1>
            <Link href="/formations">
              <Button variant="outline">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Retour au catalogue
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const sectionsNavigation = [
    { id: 'overview', label: 'Aperçu' },
    { id: 'objectifs', label: 'Objectifs' },
    { id: 'programme', label: 'Programme' },
    { id: 'pratique', label: 'Infos pratiques' },
    { id: 'financement', label: 'Financement' },
    { id: 'contact', label: 'Contact' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Head>
        <title>{initialFormation.titre} | Syloma Formation</title>
        <meta name="description" content={initialFormation.accroche} />
        <meta property="og:title" content={`${initialFormation.titre} | Syloma Formation`} />
        <meta property="og:description" content={initialFormation.accroche} />
        {initialFormation.image_principale && (
          <meta property="og:image" content={initialFormation.image_principale.url} />
        )}
      </Head>

      <Header />

      {/* Hero Section */}
      <section className="pt-24 pb-12 bg-gradient-to-br from-primary/5 via-background to-primary/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-6">
            <Link href="/" className="hover:text-primary transition-colors">
              Accueil
            </Link>
            <span>/</span>
            <Link href="/formations" className="hover:text-primary transition-colors">
              Formations
            </Link>
            <span>/</span>
            <Link href={`/formations?thematique=${initialThematique?.slug}`} className="hover:text-primary transition-colors">
              {initialThematique?.nom}
            </Link>
            <span>/</span>
            <span className="text-foreground">{initialFormation.titre}</span>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <Link href="/formations">
                  <Button variant="outline" size="sm" className="bg-background/50 backdrop-blur-sm">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Retour au catalogue
                  </Button>
                </Link>
                <Badge 
                  variant="secondary" 
                  className="bg-primary/10 text-primary border-primary/20"
                  style={{ backgroundColor: `hsl(${initialThematique?.couleur || '214 84% 56%'} / 0.1)` }}
                >
                  {initialThematique?.nom}
                </Badge>
              </div>

              <h1 
                className="text-3xl lg:text-4xl font-bold text-foreground mb-4 leading-tight"
                data-editable
                data-name="formation_detail.hero.title"
              >
                {initialFormation.titre}
              </h1>

              <p 
                className="text-xl text-muted-foreground mb-6 leading-relaxed"
                data-editable
                data-name="formation_detail.hero.description"
              >
                {initialFormation.accroche}
              </p>

              {/* Quick Info */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <div className="flex items-center space-x-2 text-sm">
                  <Clock className="h-4 w-4 text-primary flex-shrink-0" />
                  <span className="text-foreground font-medium">{initialFormation.duree}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <Users className="h-4 w-4 text-primary flex-shrink-0" />
                  <span className="text-foreground font-medium">{initialFormation.niveau}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <MapPin className="h-4 w-4 text-primary flex-shrink-0" />
                  <span className="text-foreground font-medium">
                    {initialFormation.modalites.join(' & ')}
                  </span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <Euro className="h-4 w-4 text-primary flex-shrink-0" />
                  <span className="text-foreground font-medium">
                    {initialFormation.prix.amount}€ {initialFormation.prix.currency}
                  </span>
                </div>
              </div>
            </div>

            {/* Sidebar - Formateur */}
            <div className="lg:col-span-1">
              <div className="bg-card rounded-2xl border border-border p-6 sticky top-8 backdrop-blur-sm">
                <h3 
                  className="text-lg font-semibold text-foreground mb-4"
                  data-editable
                  data-name="formation_detail.formateur.title"
                >
                  Votre formateur
                </h3>

                <div className="flex items-center space-x-4 mb-4">
                  {initialFormateur?.logo_photo && (
                    <img
                      src={initialFormateur.logo_photo.url}
                      alt={initialFormateur.logo_photo.alt_text}
                      className="w-16 h-16 rounded-full object-cover border border-border"
                    />
                  )}
                  <div>
                    <h4 className="font-semibold text-foreground">{initialFormateur?.nom}</h4>
                    <p className="text-sm text-muted-foreground">
                      {initialFormateur?.experience_annees} ans d&#39;expérience
                    </p>
                  </div>
                </div>

                {initialFormateur?.bio && (
                  <div 
                    className="text-sm text-muted-foreground mb-4 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: initialFormateur.bio }}
                  />
                )}

                {initialFormateur?.specialites && (
                  <div className="mb-4">
                    <h5 className="text-sm font-medium text-foreground mb-2">Spécialités :</h5>
                    <div className="flex flex-wrap gap-1">
                      {initialFormateur.specialites.map((specialite, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {specialite}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {(initialFormateur?.linkedin || initialFormateur?.site_web) && (
                  <div className="space-y-2">
                    {initialFormateur.linkedin && (
                      <a
                        href={initialFormateur.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-sm text-primary hover:text-primary/80 transition-colors"
                      >
                        <ExternalLink className="mr-2 h-3 w-3" />
                        Profil LinkedIn
                      </a>
                    )}
                    {initialFormateur.site_web && (
                      <a
                        href={initialFormateur.site_web}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-sm text-primary hover:text-primary/80 transition-colors"
                      >
                        <ExternalLink className="mr-2 h-3 w-3" />
                        Site web
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation Sections */}
      <section className="bg-background border-b border-border sticky top-16 z-40 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8 overflow-x-auto py-4">
            {sectionsNavigation.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors whitespace-nowrap"
              >
                {section.label}
              </a>
            ))}
          </nav>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-12">
            
            {/* Overview Section */}
            <section id="overview" className="space-y-6">
              <h2 
                className="text-2xl font-bold text-foreground"
                data-editable
                data-name="formation_detail.overview.title"
              >
                Public visé & Prérequis
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-card rounded-xl border border-border p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center">
                    <Users className="mr-2 h-5 w-5 text-primary" />
                    Public visé
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {initialFormation.public_vise}
                  </p>
                </div>

                <div className="bg-card rounded-xl border border-border p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center">
                    <CheckCircle className="mr-2 h-5 w-5 text-primary" />
                    Prérequis
                  </h3>
                  {initialFormation.prerequis ? (
                    <div 
                      className="text-muted-foreground leading-relaxed prose prose-sm max-w-none"
                      dangerouslySetInnerHTML={{ __html: initialFormation.prerequis }}
                    />
                  ) : (
                    <p className="text-muted-foreground">Aucun prérequis spécifique</p>
                  )}
                </div>
              </div>
            </section>

            {/* Objectifs Section */}
            <section id="objectifs" className="space-y-6">
              <h2 
                className="text-2xl font-bold text-foreground"
                data-editable
                data-name="formation_detail.objectifs.title"
              >
                Objectifs pédagogiques
              </h2>

              <div className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-xl border border-primary/20 p-6">
                <div 
                  className="prose prose-sm max-w-none text-foreground"
                  dangerouslySetInnerHTML={{ __html: initialFormation.objectifs_pedagogiques }}
                />
              </div>
            </section>

            {/* Programme Section */}
            <section id="programme" className="space-y-6">
              <h2 
                className="text-2xl font-bold text-foreground"
                data-editable
                data-name="formation_detail.programme.title"
              >
                Programme détaillé
              </h2>

              <div className="bg-card rounded-xl border border-border p-6">
                <div 
                  className="prose prose-sm max-w-none text-foreground"
                  dangerouslySetInnerHTML={{ __html: initialFormation.programme_detaille }}
                />
              </div>

              <div className="bg-card rounded-xl border border-border p-6">
                <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center">
                  <FileText className="mr-2 h-5 w-5 text-primary" />
                  Méthodes pédagogiques
                </h3>
                <div 
                  className="prose prose-sm max-w-none text-muted-foreground"
                  dangerouslySetInnerHTML={{ __html: initialFormation.methodes_mobilisees }}
                />
              </div>
            </section>

            {/* Infos Pratiques Section */}
            <section id="pratique" className="space-y-6">
              <h2 
                className="text-2xl font-bold text-foreground"
                data-editable
                data-name="formation_detail.pratique.title"
              >
                Informations pratiques
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="bg-card rounded-xl border border-border p-4">
                    <div className="flex items-center space-x-3">
                      <Clock className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium text-foreground">Durée</p>
                        <p className="text-sm text-muted-foreground">{initialFormation.duree}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-card rounded-xl border border-border p-4">
                    <div className="flex items-center space-x-3">
                      <Calendar className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium text-foreground">Rythme</p>
                        <p className="text-sm text-muted-foreground">{initialFormation.rythme}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-card rounded-xl border border-border p-4">
                    <div className="flex items-center space-x-3">
                      <MapPin className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium text-foreground">Lieu</p>
                        <p className="text-sm text-muted-foreground">{initialFormation.lieu}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-card rounded-xl border border-border p-4">
                    <h3 className="font-medium text-foreground mb-2 flex items-center">
                      <Award className="mr-2 h-4 w-4 text-primary" />
                      Modalités d&#39;évaluation
                    </h3>
                    <div 
                      className="text-sm text-muted-foreground prose prose-sm max-w-none"
                      dangerouslySetInnerHTML={{ __html: initialFormation.modalites_evaluation }}
                    />
                  </div>

                  <div className="bg-card rounded-xl border border-border p-4">
                    <h3 className="font-medium text-foreground mb-2">Accessibilité</h3>
                    <div 
                      className="text-sm text-muted-foreground prose prose-sm max-w-none"
                      dangerouslySetInnerHTML={{ __html: initialFormation.accessibilite }}
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* Financement Section */}
            <section id="financement" className="space-y-6">
              <h2 
                className="text-2xl font-bold text-foreground"
                data-editable
                data-name="formation_detail.financement.title"
              >
                Financement disponible
              </h2>

              <div className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-xl border border-border/50 p-6">
                <div className="text-center mb-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                    <Euro className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground">
                    {initialFormation.prix.amount}€ {initialFormation.prix.currency}
                  </h3>
                  <p className="text-muted-foreground">Prix total de la formation</p>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  {initialFinancements.map((financement) => (
                    <div key={financement.id} className="bg-background rounded-lg border border-border p-4">
                      <div className="flex items-start space-x-3">
                        {financement.logo && (
                          <img
                            src={financement.logo.url}
                            alt={financement.logo.alt_text}
                            className="w-10 h-10 rounded object-cover"
                          />
                        )}
                        <div className="flex-1">
                          <h4 className="font-medium text-foreground">{financement.nom}</h4>
                          <div 
                            className="text-sm text-muted-foreground mt-1"
                            dangerouslySetInnerHTML={{ __html: financement.description.split('<p>')[1]?.split('</p>')[0] || financement.description }}
                          />
                          {financement.site_officiel && (
                            <a
                              href={financement.site_officiel}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center text-sm text-primary hover:text-primary/80 mt-2"
                            >
                              En savoir plus
                              <ExternalLink className="ml-1 h-3 w-3" />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-32 space-y-6">
              {/* Contact Form */}
              <section id="contact">
                <ContactForm formationId={initialFormation.id} formationTitre={initialFormation.titre} />
              </section>

              {/* Formations similaires */}
              {initialFormationsSimilaires && initialFormationsSimilaires.length > 0 && (
                <div className="bg-card rounded-xl border border-border p-6">
                  <h3 
                    className="text-lg font-semibold text-foreground mb-4"
                    data-editable
                    data-name="formation_detail.similar.title"
                  >
                    Formations similaires
                  </h3>
                  
                  <div className="space-y-4">
                    {initialFormationsSimilaires.slice(0, 3).map((formation) => (
                      <Link
                        key={formation.id}
                        href={`/formations/${formation.slug}`}
                        className="block group"
                      >
                        <div className="bg-background rounded-lg border border-border p-4 hover:border-primary/50 transition-all duration-300 group-hover:shadow-lg">
                          <h4 className="font-medium text-foreground group-hover:text-primary transition-colors mb-1 line-clamp-2">
                            {formation.titre}
                          </h4>
                          <p className="text-sm text-muted-foreground mb-2 line-clamp-1">
                            {formation.accroche}
                          </p>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">{formation.duree}</span>
                            <span className="font-medium text-primary">
                              {formation.prix.amount}€
                            </span>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Support qualité */}
              <div className="bg-gradient-to-br from-accent/5 to-secondary/5 rounded-xl border border-border p-6">
                <h3 
                  className="text-lg font-semibold text-foreground mb-3"
                  data-editable
                  data-name="formation_detail.support.title"
                >
                  Support qualité
                </h3>
                <p 
                  className="text-sm text-muted-foreground mb-4"
                  data-editable
                  data-name="formation_detail.support.description"
                >
                  Une question sur cette formation ? Notre équipe qualité est là pour vous accompagner.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Phone className="mr-2 h-4 w-4 text-primary" />
                    <span data-editable data-name="formation_detail.support.phone">+33 1 23 45 67 89</span>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Mail className="mr-2 h-4 w-4 text-primary" />
                    <span data-editable data-name="formation_detail.support.email">qualite@syloma.fr</span>
                  </div>
                </div>
                <Link href="/contact" className="inline-block mt-4">
                  <Button variant="outline" size="sm" className="w-full">
                    Contacter le support
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  console.log('Generating static paths for formations');
  const formations = getCMSData<Formation>('formations');
  
  const paths = formations.map((formation) => ({
    params: { slug: formation.slug }
  }));

  console.log(`Generated ${paths.length} formation paths`);
  return {
    paths,
    fallback: false
  };
};

export const getStaticProps: GetStaticProps<FormationDetailPageProps> = async ({ params }) => {
  console.log('Getting static props for formation:', params?.slug);
  
  const formations = getCMSData<Formation>('formations');
  const formateurs = getCMSData<Formateur>('formateurs');
  const thematiques = getCMSData<Thematique>('thematiques');
  const financements = getCMSData<Financement>('financements');
  
  const formation = formations.find((f) => f.slug === params!.slug);
  
  if (!formation) {
    return { notFound: true };
  }

  const formateur = formateurs.find((f) => f.id === formation.formateur_id);
  const thematique = thematiques.find((t) => t.id === formation.thematique_id);
  
  // Financements éligibles
  const financementsEligibles = formation.financements_eligibles || [];
  const formationFinancements = financements.filter((f) => 
    financementsEligibles.includes(f.id) && f.actif
  );
  
  // Formations similaires (même thématique)
  const formationsSimilaires = formations.filter((f) => 
    f.id !== formation.id && 
    f.thematique_id === formation.thematique_id && 
    f.active
  ).slice(0, 3);

  console.log('Formation detail props prepared successfully');

  return {
    props: {
      formation,
      formateur: formateur || null,
      thematique: thematique || null,
      financements: formationFinancements,
      formationsSimilaires
    }
  };
};
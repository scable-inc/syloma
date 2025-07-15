import React from 'react';
import { Award, DollarSign, FileCheck, Headphones, Shield, CreditCard } from 'lucide-react';

const AvantagesSection = () => {
  console.log('AvantagesSection component rendering');

  const avantages = [
    {
      icon: Award,
      title: "Certification Qualiopi sans charge",
      description: "Profitez de notre certification qualité sans gérer les audits, la documentation et les obligations administratives complexes.",
      details: [
        "Audits Qualiopi gérés par nos équipes",
        "Mise à jour automatique des processus",
        "Documentation qualité fournie",
        "Suivi réglementaire continu"
      ]
    },
    {
      icon: CreditCard,
      title: "Accès aux financements publics",
      description: "Vos formations deviennent automatiquement éligibles à tous les dispositifs de financement professionnels.",
      details: [
        "CPF - Compte Personnel de Formation",
        "OPCO - Financement entreprises",
        "Pôle Emploi - AIF et autres dispositifs",
        "Formations certifiantes reconnues"
      ]
    },
    {
      icon: DollarSign,
      title: "Processus fiscal simplifié",
      description: "TVA exonérée et facturation optimisée pour vous concentrer sur votre expertise plutôt que sur l'administratif.",
      details: [
        "Exonération de TVA automatique",
        "Facturation client gérée par Syloma",
        "Optimisation fiscale légale",
        "Règlements sécurisés sous 30 jours"
      ]
    },
    {
      icon: FileCheck,
      title: "Support documentaire complet",
      description: "Tous les documents conformes aux exigences qualité : conventions, attestations, évaluations, feuilles d'émargement.",
      details: [
        "Conventions de formation automatiques",
        "Attestations et certificats conformes",
        "Supports d'évaluation standardisés",
        "Archivage sécurisé 10 ans"
      ]
    },
    {
      icon: Shield,
      title: "Conformité garantie",
      description: "Respect total des obligations légales et réglementaires avec notre équipe juridique dédiée à la formation.",
      details: [
        "Veille réglementaire permanente",
        "Protection juridique incluse",
        "Conformité RGPD assurée",
        "Support en cas de contrôle"
      ]
    },
    {
      icon: Headphones,
      title: "Accompagnement personnalisé",
      description: "Un référent qualité dédié vous accompagne dans tous vos projets de formation pour garantir l'excellence.",
      details: [
        "Référent qualité personnel",
        "Formation aux processus Syloma",
        "Hotline support 6j/7",
        "Communauté d'entraide formateurs"
      ]
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-muted/20 to-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 
            className="text-3xl md:text-4xl font-bold text-foreground mb-6"
            data-editable
            data-name="formateurs.avantages.title"
          >
            Pourquoi rejoindre Syloma ?
          </h2>
          <p 
            className="text-xl text-muted-foreground leading-relaxed"
            data-editable
            data-name="formateurs.avantages.subtitle"
          >
            Concentrez-vous sur votre expertise pédagogique. Nous nous occupons de tout le reste 
            avec notre certification Qualiopi et notre infrastructure administrative complète.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {avantages.map((avantage, index) => (
            <div 
              key={index}
              className="group bg-card/50 backdrop-blur-sm rounded-2xl p-8 border border-border/50 hover:border-primary/30 transition-all duration-500 hover:shadow-lg hover:shadow-primary/10"
            >
              <div className="flex items-center space-x-4 mb-6">
                <div className="flex-shrink-0 p-3 bg-primary/10 rounded-xl group-hover:bg-primary/20 transition-colors duration-300">
                  <avantage.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">
                  {avantage.title}
                </h3>
              </div>

              <p className="text-muted-foreground mb-6 leading-relaxed">
                {avantage.description}
              </p>

              <ul className="space-y-3">
                {avantage.details.map((detail, detailIndex) => (
                  <li key={detailIndex} className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-2 h-2 bg-primary rounded-full mt-2"></div>
                    <span className="text-sm text-muted-foreground">{detail}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-primary/10 to-primary/20 rounded-2xl p-8 backdrop-blur-sm border border-primary/20">
            <h3 
              className="text-2xl font-bold text-foreground mb-4"
              data-editable
              data-name="formateurs.avantages.cta_title"
            >
              Prêt à rejoindre nos 150+ formateurs partenaires ?
            </h3>
            <p 
              className="text-lg text-muted-foreground mb-6"
              data-editable
              data-name="formateurs.avantages.cta_description"
            >
              Découvrez comment notre processus simplifie votre activité de formation
            </p>
            <a 
              href="#processus" 
              className="inline-flex items-center px-8 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors duration-300 font-medium"
            >
              <span data-editable data-name="formateurs.avantages.cta_button">
                Voir le processus détaillé
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AvantagesSection;
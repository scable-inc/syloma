import React from 'react';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Shield, Award, FileCheck, Users, Target, Clock, HeadphonesIcon } from 'lucide-react';

const QualitySection = () => {
  console.log('QualitySection component rendering');

  const qualityPillars = [
  {
    icon: Shield,
    title: 'Conformité garantie',
    description: 'Respect strict des exigences Qualiopi et référentiels qualité',
    features: ['Audit Véritas', 'Suivi réglementaire', 'Veille normative']
  },
  {
    icon: FileCheck,
    title: 'Documentation complète',
    description: 'Tous vos documents administratifs pris en charge',
    features: ['Conventions', 'Attestations', 'Bilans pédagogiques']
  },
  {
    icon: Target,
    title: 'Excellence pédagogique',
    description: 'Accompagnement vers les meilleures pratiques',
    features: ['Méthodes validées', 'Outils modernes', 'Suivi qualité']
  },
  {
    icon: HeadphonesIcon,
    title: 'Support permanent',
    description: 'Une équipe dédiée à votre réussite',
    features: ['Assistance 24/7', 'Formation équipes', 'Conseil expert']
  }];


  const processSteps = [
  {
    number: '01',
    title: 'Analyse',
    description: 'Évaluation de vos besoins et contraintes spécifiques'
  },
  {
    number: '02',
    title: 'Accompagnement',
    description: 'Mise en place des processus qualité adaptés'
  },
  {
    number: '03',
    title: 'Certification',
    description: 'Obtention et maintien des certifications requises'
  },
  {
    number: '04',
    title: 'Suivi',
    description: 'Amélioration continue et veille réglementaire'
  }];


  const guarantees = [
  'Certification Qualiopi maintenue',
  'Conformité réglementaire assurée',
  'Support documentaire complet',
  'Accompagnement personnalisé',
  'Veille juridique permanente',
  'Audit qualité régulier'];


  return (
    <section className="py-24 bg-gradient-to-br from-muted/30 via-background to-muted/20 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/3 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-accent/3 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge
            variant="outline"
            className="mb-6 px-4 py-2 bg-primary/5 border-primary/20 text-primary font-medium">

            <Award className="w-4 h-4 mr-2" />
            <span data-editable data-name="homepage.quality.badge">Qualité & Conformité</span>
          </Badge>
          
          <h2
            className="text-4xl sm:text-5xl font-bold text-foreground mb-6"
            data-editable
            data-name="homepage.quality.title">Votre référence en<span className="block bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">excellence pédagogique</span>





          </h2>
          
          <p
            className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
            data-editable
            data-name="homepage.quality.subtitle">

            Nous assumons l&#39;intégralité de vos obligations administratives et qualité, 
            pour que vous puissiez vous concentrer sur votre expertise pédagogique.
          </p>
        </div>

        {/* Quality Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {qualityPillars.map((pillar, index) =>
          <div
            key={index}
            className="group bg-background/60 backdrop-blur-sm rounded-2xl p-6 border border-border/50 hover:border-primary/30 transition-all duration-500 hover:transform hover:scale-105 hover:shadow-2xl">

              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <pillar.icon className="w-8 h-8 text-primary" />
                </div>
                
                <h3 className="text-xl font-bold text-foreground mb-3">
                  {pillar.title}
                </h3>
                
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  {pillar.description}
                </p>
                
                <div className="space-y-2">
                  {pillar.features.map((feature, featureIndex) =>
                <div key={featureIndex} className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                      <span className="text-sm text-foreground font-medium">{feature}</span>
                    </div>
                )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Process Timeline */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h3
              className="text-3xl font-bold text-foreground mb-4"
              data-editable
              data-name="homepage.quality.process_title">

              Notre processus qualité
            </h3>
            <p
              className="text-muted-foreground max-w-2xl mx-auto"
              data-editable
              data-name="homepage.quality.process_subtitle">

              Une approche méthodique pour garantir l&#39;excellence et la conformité
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map((step, index) =>
            <div
              key={index}
              className="relative bg-background/70 backdrop-blur-sm rounded-xl p-6 border border-border/50 group hover:border-primary/30 transition-all duration-300">

                {/* Connection Line */}
                {index < processSteps.length - 1 &&
              <div className="hidden lg:block absolute top-8 -right-3 w-6 h-0.5 bg-gradient-to-r from-primary/50 to-transparent"></div>
              }
                
                <div className="flex flex-col">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary/70 rounded-xl flex items-center justify-center text-white font-bold text-lg mr-4 group-hover:scale-110 transition-transform duration-300">
                      {step.number}
                    </div>
                    <h4 className="text-lg font-bold text-foreground">{step.title}</h4>
                  </div>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Guarantees Grid */}
        <div className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-3xl p-8 lg:p-12 border border-primary/10 backdrop-blur-sm">
          <div className="text-center mb-8">
            <h3
              className="text-3xl font-bold text-foreground mb-4"
              data-editable
              data-name="homepage.quality.guarantees_title">

              Nos garanties qualité
            </h3>
            <p
              className="text-muted-foreground"
              data-editable
              data-name="homepage.quality.guarantees_subtitle">

              Engagements fermes pour votre tranquillité d&#39;esprit
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {guarantees.map((guarantee, index) =>
            <div
              key={index}
              className="flex items-center space-x-3 bg-background/60 backdrop-blur-sm rounded-lg p-4 hover:bg-background/80 transition-all duration-300">

                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-5 h-5 text-primary" />
                </div>
                <span className="text-foreground font-medium">{guarantee}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>);

};

export default QualitySection;
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Award, ExternalLink, CheckCircle, Calendar, Building } from 'lucide-react';
import Link from 'next/link';

interface CertificationCardProps {
  name: string;
  logo: string;
  organisme: string;
  description: string;
  dateObtention: string;
  validite: string;
  avantages: string[];
  siteWeb?: string;
}

const CertificationCard: React.FC<CertificationCardProps> = ({
  name,
  logo,
  organisme,
  description,
  dateObtention,
  validite,
  avantages,
  siteWeb
}) => {
  console.log('Rendering CertificationCard:', name);

  return (
    <div className="group bg-background/60 backdrop-blur-sm rounded-2xl p-8 border border-border/50 hover:border-primary/30 transition-all duration-500 hover:transform hover:scale-105 hover:shadow-2xl">
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl flex items-center justify-center text-3xl group-hover:scale-110 transition-transform duration-300">
              {logo}
            </div>
            <div>
              <h3 className="text-xl font-bold text-foreground">{name}</h3>
              <div className="flex items-center space-x-2 text-muted-foreground mt-1">
                <Building className="w-4 h-4" />
                <span className="text-sm">{organisme}</span>
              </div>
            </div>
          </div>
          {siteWeb && (
            <Link href={siteWeb} target="_blank" rel="noopener noreferrer">
              <Button variant="ghost" size="sm" className="opacity-60 hover:opacity-100">
                <ExternalLink className="w-4 h-4" />
              </Button>
            </Link>
          )}
        </div>

        {/* Description */}
        <p className="text-muted-foreground mb-6 leading-relaxed flex-grow">
          {description}
        </p>

        {/* Dates */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-primary/5 rounded-lg p-3">
            <div className="flex items-center space-x-2 mb-1">
              <Calendar className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-foreground">Obtention</span>
            </div>
            <span className="text-sm text-muted-foreground">{dateObtention}</span>
          </div>
          <div className="bg-primary/5 rounded-lg p-3">
            <div className="flex items-center space-x-2 mb-1">
              <Award className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-foreground">Validité</span>
            </div>
            <span className="text-sm text-muted-foreground">{validite}</span>
          </div>
        </div>

        {/* Avantages */}
        <div>
          <h4 className="font-medium text-foreground mb-3">Avantages :</h4>
          <div className="space-y-2">
            {avantages.map((avantage, index) => (
              <div key={index} className="flex items-start space-x-2">
                <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-sm text-muted-foreground">{avantage}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const CertificationsSection = () => {
  console.log('CertificationsSection component rendering');

  const certifications: CertificationCardProps[] = [
    {
      name: 'Qualiopi',
      logo: '🎖️',
      organisme: 'AFNOR Certification',
      description: 'La certification qualité de référence pour tous les organismes de formation professionnelle. Gage de qualité et condition d\'éligibilité aux financements publics.',
      dateObtention: 'Janvier 2023',
      validite: 'Janvier 2026',
      avantages: [
        'Éligibilité aux financements CPF et OPCO',
        'Reconnaissance nationale de la qualité',
        'Processus d\'amélioration continue',
        'Confiance renforcée des clients'
      ],
      siteWeb: 'https://www.qualiopi.gouv.fr'
    },
    {
      name: 'Audit Véritas',
      logo: '✅',
      organisme: 'Bureau Veritas',
      description: 'Certification complémentaire attestant de la conformité de nos processus qualité et de notre approche d\'amélioration continue.',
      dateObtention: 'Mars 2023',
      validite: 'Mars 2026',
      avantages: [
        'Audit externe indépendant',
        'Validation des processus qualité',
        'Amélioration continue validée',
        'Transparence totale'
      ],
      siteWeb: 'https://www.bureauveritas.fr'
    },
    {
      name: 'DataDock',
      logo: '📋',
      organisme: 'OPCO & Pôle Emploi',
      description: 'Base de données unique sur la formation professionnelle qui facilite l\'identification des organismes de formation répondant aux critères qualité.',
      dateObtention: 'Novembre 2022',
      validite: 'Permanent',
      avantages: [
        'Référencement OPCO simplifié',
        'Visibilité accrue',
        'Processus administratif allégé',
        'Conformité réglementaire'
      ],
      siteWeb: 'https://www.data-dock.fr'
    }
  ];

  const stats = [
    { value: '3', label: 'Certifications obtenues', suffix: 'ans', description: 'de conformité continue' },
    { value: '100%', label: 'Taux de conformité', suffix: '', description: 'aux audits qualité' },
    { value: '45', label: 'Critères Qualiopi', suffix: '', description: 'validés avec succès' },
    { value: '98%', label: 'Satisfaction clients', suffix: '', description: 'sur la qualité' }
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-background via-muted/20 to-background relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/3 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-accent/3 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge 
            variant="outline" 
            className="mb-6 px-4 py-2 bg-primary/5 border-primary/20 text-primary font-medium"
          >
            <Award className="w-4 h-4 mr-2" />
            <span data-editable data-name="homepage.certifications.badge">Certifications & Accréditations</span>
          </Badge>
          
          <h2 
            className="text-4xl sm:text-5xl font-bold text-foreground mb-6"
            data-editable
            data-name="homepage.certifications.title"
          >
            Des certifications qui
            <span className="block bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              garantissent la qualité
            </span>
          </h2>
          
          <p 
            className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
            data-editable
            data-name="homepage.certifications.subtitle"
          >
            Nos certifications officielles attestent de notre engagement qualité et 
            vous ouvrent l&#39;accès à tous les dispositifs de financement.
          </p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="text-center bg-background/50 backdrop-blur-sm rounded-xl p-6 border border-border/50 hover:border-primary/30 transition-all duration-300 group hover:transform hover:scale-105"
            >
              <div className="text-3xl font-bold text-primary mb-2 group-hover:scale-110 transition-transform duration-300">
                {stat.value}
              </div>
              <div className="text-sm font-semibold text-foreground mb-1">{stat.label}</div>
              <div className="text-xs text-muted-foreground">{stat.description}</div>
            </div>
          ))}
        </div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {certifications.map((certification, index) => (
            <CertificationCard key={index} {...certification} />
          ))}
        </div>

        {/* Trust Banner */}
        <div className="bg-gradient-to-r from-primary/5 via-primary/3 to-primary/5 rounded-3xl p-8 lg:p-12 border border-primary/10 backdrop-blur-sm text-center">
          <div className="max-w-4xl mx-auto">
            <div className="w-20 h-20 bg-gradient-to-br from-primary to-primary/70 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Award className="w-10 h-10 text-white" />
            </div>
            
            <h3 
              className="text-3xl font-bold text-foreground mb-4"
              data-editable
              data-name="homepage.certifications.trust_title"
            >
              Votre tranquillité d&#39;esprit, notre priorité
            </h3>
            
            <p 
              className="text-lg text-muted-foreground mb-8 leading-relaxed"
              data-editable
              data-name="homepage.certifications.trust_description"
            >
              Avec Syloma, bénéficiez de toutes les certifications nécessaires sans aucune démarche de votre part. 
              Nous maintenons et renouvelons vos accréditations pour que vous puissiez vous concentrer sur l&#39;essentiel : former.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/certifications">
                <Button 
                  size="lg"
                  className="bg-primary hover:bg-primary/90 shadow-xl hover:shadow-primary/25 transition-all duration-300"
                  data-editable
                  data-name="homepage.certifications.details_button"
                >
                  Voir toutes nos certifications
                  <ExternalLink className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              
              <Link href="/a-propos">
                <Button 
                  variant="outline" 
                  size="lg"
                  className="bg-background/60 backdrop-blur-sm hover:bg-primary/5 border-primary/20"
                  data-editable
                  data-name="homepage.certifications.about_button"
                >
                  En savoir plus sur notre qualité
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CertificationsSection;
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, Quote, Users, BookOpen, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface TestimonialCardProps {
  nom: string;
  entreprise?: string;
  poste?: string;
  formation_suivie?: string;
  temoignage: string;
  note?: number;
  type: 'Stagiaire' | 'Formateur' | 'Entreprise';
  photo?: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  nom,
  entreprise,
  poste,
  formation_suivie,
  temoignage,
  note = 5,
  type,
  photo
}) => {
  console.log('Rendering TestimonialCard:', nom, type);

  const getTypeIcon = () => {
    switch (type) {
      case 'Stagiaire':
        return <Users className="w-5 h-5" />;
      case 'Formateur':
        return <BookOpen className="w-5 h-5" />;
      case 'Entreprise':
        return <Users className="w-5 h-5" />;
      default:
        return <Users className="w-5 h-5" />;
    }
  };

  const getTypeColor = () => {
    switch (type) {
      case 'Stagiaire':
        return 'bg-blue-100 text-blue-800';
      case 'Formateur':
        return 'bg-green-100 text-green-800';
      case 'Entreprise':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="group bg-background/60 backdrop-blur-sm rounded-2xl p-8 border border-border/50 hover:border-primary/30 transition-all duration-500 hover:transform hover:scale-105 hover:shadow-2xl h-full flex flex-col">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full flex items-center justify-center overflow-hidden">
            {photo ? (
              <img src={photo} alt={nom} className="w-full h-full object-cover" />
            ) : (
              <span className="text-lg font-semibold text-primary">
                {nom.split(' ').map(n => n[0]).join('').substring(0, 2)}
              </span>
            )}
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-foreground">{nom}</h4>
            {poste && entreprise && (
              <p className="text-sm text-muted-foreground">{poste} · {entreprise}</p>
            )}
            {entreprise && !poste && (
              <p className="text-sm text-muted-foreground">{entreprise}</p>
            )}
            {formation_suivie && (
              <p className="text-xs text-primary font-medium mt-1">{formation_suivie}</p>
            )}
          </div>
        </div>
        
        <Badge className={`${getTypeColor()} border-0 text-xs font-medium flex items-center space-x-1`}>
          {getTypeIcon()}
          <span>{type}</span>
        </Badge>
      </div>

      {/* Rating */}
      <div className="flex items-center space-x-2 mb-4">
        <div className="flex space-x-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${
                i < note 
                  ? 'text-yellow-400 fill-yellow-400' 
                  : 'text-gray-300'
              }`}
            />
          ))}
        </div>
        <span className="text-sm text-muted-foreground font-medium">{note}/5</span>
      </div>

      {/* Quote */}
      <div className="relative flex-grow">
        <Quote className="absolute top-0 left-0 w-8 h-8 text-primary/20 -translate-x-2 -translate-y-2" />
        <p className="text-muted-foreground leading-relaxed italic pl-6">
          {temoignage}
        </p>
      </div>
    </div>
  );
};

const TestimonialsSection = () => {
  console.log('TestimonialsSection component rendering');

  const testimonials: TestimonialCardProps[] = [
    {
      nom: 'Sophie Martinez',
      entreprise: 'Digital Solutions',
      poste: 'Chef de projet',
      formation_suivie: 'Gestion de projet Agile',
      temoignage: 'Une formation exceptionnelle avec un accompagnement personnalisé. L\'approche pédagogique de Syloma m\'a permis de monter en compétences rapidement et d\'appliquer immédiatement les concepts en entreprise.',
      note: 5,
      type: 'Stagiaire'
    },
    {
      nom: 'Marc Dubois',
      entreprise: 'Indépendant',
      poste: 'Formateur expert',
      formation_suivie: '',
      temoignage: 'En tant que formateur, j\'apprécie particulièrement le sérieux et le professionnalisme de Syloma. Toute la partie administrative est gérée avec une efficacité remarquable, me permettant de me concentrer uniquement sur la pédagogie.',
      note: 5,
      type: 'Formateur'
    },
    {
      nom: 'Claire Rousseau',
      entreprise: 'HR Consulting',
      poste: 'Directrice RH',
      formation_suivie: 'Leadership et Management',
      temoignage: 'La qualité des formations proposées par Syloma est remarquable. Le suivi post-formation et l\'accompagnement dans la mise en pratique font toute la différence. Je recommande sans hésitation.',
      note: 5,
      type: 'Entreprise'
    },
    {
      nom: 'Thomas Leroy',
      entreprise: 'TechStart',
      poste: 'Développeur senior',
      formation_suivie: 'DevOps et Cloud Computing',
      temoignage: 'Formation très complète avec des formateurs experts. Les outils mis à disposition et la plateforme de suivi sont de qualité professionnelle. Certification obtenue avec succès !',
      note: 5,
      type: 'Stagiaire'
    },
    {
      nom: 'Anne-Marie Petit',
      entreprise: 'Formation & Conseil',
      poste: 'Formatrice certifiée',
      formation_suivie: '',
      temoignage: 'Syloma m\'a libérée de toutes les contraintes administratives. Je peux enfin me consacrer pleinement à ce que j\'aime : transmettre mes connaissances. Le support qualité est exceptionnel.',
      note: 5,
      type: 'Formateur'
    },
    {
      nom: 'Jean-Paul Moreau',
      entreprise: 'InnovaCorp',
      poste: 'DG',
      formation_suivie: 'Stratégie digitale',
      temoignage: 'Un partenaire de confiance pour nos besoins en formation. La certification Qualiopi nous garantit la qualité, et les résultats sont mesurables sur nos équipes. Excellent investissement.',
      note: 5,
      type: 'Entreprise'
    }
  ];

  const stats = [
    { value: '98%', label: 'Satisfaction globale', description: 'taux de satisfaction' },
    { value: '4.8/5', label: 'Note moyenne', description: 'sur 500+ avis' },
    { value: '95%', label: 'Recommandation', description: 'taux de recommandation' },
    { value: '2,500+', label: 'Stagiaires formés', description: 'depuis 2020' }
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-muted/30 via-background to-muted/20 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-16 w-80 h-80 bg-primary/3 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-16 w-80 h-80 bg-accent/3 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge 
            variant="outline" 
            className="mb-6 px-4 py-2 bg-primary/5 border-primary/20 text-primary font-medium"
          >
            <Star className="w-4 h-4 mr-2" />
            <span data-editable data-name="homepage.testimonials.badge">Témoignages</span>
          </Badge>
          
          <h2 
            className="text-4xl sm:text-5xl font-bold text-foreground mb-6"
            data-editable
            data-name="homepage.testimonials.title"
          >
            Ce que disent nos
            <span className="block bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              stagiaires et formateurs
            </span>
          </h2>
          
          <p 
            className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
            data-editable
            data-name="homepage.testimonials.subtitle"
          >
            Découvrez les retours d&#39;expérience authentiques de ceux qui nous font confiance 
            pour leur développement professionnel.
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

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} {...testimonial} />
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-primary/5 via-primary/3 to-primary/5 rounded-3xl p-8 lg:p-12 border border-primary/10 backdrop-blur-sm">
            <h3 
              className="text-3xl font-bold text-foreground mb-4"
              data-editable
              data-name="homepage.testimonials.cta_title"
            >
              Rejoignez nos stagiaires et formateurs satisfaits
            </h3>
            
            <p 
              className="text-lg text-muted-foreground mb-8"
              data-editable
              data-name="homepage.testimonials.cta_description"
            >
              Découvrez comment Syloma peut transformer votre approche de la formation professionnelle.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/formations">
                <Button 
                  size="lg"
                  className="group bg-primary hover:bg-primary/90 shadow-xl hover:shadow-primary/25 transition-all duration-300"
                >
                  <Users className="mr-2 h-5 w-5" />
                  <span data-editable data-name="homepage.testimonials.browse_training_button">Parcourir les formations</span>
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
              </Link>
              
              <Link href="/temoignages">
                <Button 
                  variant="outline" 
                  size="lg"
                  className="bg-background/60 backdrop-blur-sm hover:bg-primary/5 border-primary/20"
                >
                  <span data-editable data-name="homepage.testimonials.all_testimonials_button">Voir tous les témoignages</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
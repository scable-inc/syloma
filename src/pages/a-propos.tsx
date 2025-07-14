import React from 'react';
import Head from 'next/head';
import { GetStaticProps } from 'next';
import Link from 'next/link';
import { 
  Award, 
  CheckCircle, 
  Shield, 
  Users, 
  Clock, 
  FileCheck, 
  Star,
  TrendingUp,
  Heart,
  Target,
  Eye,
  ArrowRight,
  Download
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useCMSData, getCMSData } from '@/hooks/use-data';
import type { Certification } from '@/types/certifications';
import type { Temoignage } from '@/types/temoignages';

interface AboutPageProps {
  initialCertifications: Certification[];
  initialTestimonials: Temoignage[];
}

const AboutPage = ({ initialCertifications, initialTestimonials }: AboutPageProps) => {
  console.log('About Page rendering');

  const { data: certifications } = useCMSData<Certification>(
    'certifications', 
    { sortBy: 'ordre', sortOrder: 'asc' },
    initialCertifications
  );

  const { data: testimonials } = useCMSData<Temoignage>(
    'temoignages',
    { filters: { approuve: true }, sortBy: 'ordre', sortOrder: 'asc', pageSize: 3 },
    initialTestimonials
  );

  const stats = [
    { label: 'Stagiaires formés', value: '2,500+', icon: Users },
    { label: 'Formateurs partenaires', value: '150+', icon: Star },
    { label: 'Années d\'expérience', value: '10+', icon: Clock },
    { label: 'Taux de satisfaction', value: '98%', icon: TrendingUp }
  ];

  const guarantees = [
    {
      title: 'Certification Qualiopi',
      description: 'Gage de qualité reconnu par l\'État pour tous nos processus de formation',
      icon: Award
    },
    {
      title: 'Conformité RGPD',
      description: 'Protection totale de vos données personnelles selon les normes européennes',
      icon: Shield
    },
    {
      title: 'Suivi personnalisé',
      description: 'Accompagnement dédié de votre inscription à la certification',
      icon: Users
    },
    {
      title: 'Processus transparent',
      description: 'Toutes les étapes clairement définies et documentées',
      icon: FileCheck
    }
  ];

  const values = [
    {
      title: 'Excellence pédagogique',
      description: 'Nous sélectionnons rigoureusement nos formateurs experts pour garantir la qualité des apprentissages.',
      icon: Target
    },
    {
      title: 'Transparence totale',
      description: 'Processus clairs, tarifs transparents, et communication ouverte à chaque étape.',
      icon: Eye
    },
    {
      title: 'Proximité humaine',
      description: 'Un accompagnement personnalisé et bienveillant pour chaque stagiaire et formateur.',
      icon: Heart
    }
  ];

  const processSteps = [
    {
      step: '01',
      title: 'Analyse des besoins',
      description: 'Nous identifions vos objectifs de formation et votre contexte professionnel.'
    },
    {
      step: '02',
      title: 'Proposition personnalisée',
      description: 'Sélection du formateur expert et adaptation du programme à vos contraintes.'
    },
    {
      step: '03',
      title: 'Convention de formation',
      description: 'Formalisation des engagements et prise en charge des démarches administratives.'
    },
    {
      step: '04',
      title: 'Réalisation',
      description: 'Dispensation de la formation avec suivi qualité en temps réel.'
    },
    {
      step: '05',
      title: 'Évaluation & Certification',
      description: 'Validation des acquis et remise des documents officiels.'
    }
  ];

  return (
    <>
      <Head>
        <title>À propos - Syloma | Organisme de formation certifié Qualiopi</title>
        <meta 
          name="description" 
          content="Découvrez Syloma, votre organisme de formation de confiance. Certifié Qualiopi, nous accompagnons stagiaires et formateurs avec excellence et transparence." 
        />
        <meta property="og:title" content="À propos - Syloma | Organisme de formation certifié" />
        <meta property="og:description" content="Organisme de formation certifié Qualiopi, spécialisé dans l'accompagnement de qualité des stagiaires et formateurs." />
        <meta property="og:type" content="website" />
      </Head>

      <div className="min-h-screen bg-background">
        <Header />

        {/* Hero Section */}
        <section className="pt-24 pb-16 bg-gradient-to-br from-background via-muted/20 to-background relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23f1f5f9" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="4"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="text-center max-w-4xl mx-auto">
              <Badge 
                variant="outline" 
                className="mb-6 text-sm font-medium bg-primary/10 text-primary border-primary/20"
                data-editable
                data-name="about.hero.badge"
              >
                Organisme de formation certifié Qualiopi
              </Badge>
              
              <h1 
                className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight"
                data-editable
                data-name="about.hero.title"
              >
                Votre partenaire de confiance pour la{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/70">
                  formation professionnelle
                </span>
              </h1>
              
              <p 
                className="text-xl text-muted-foreground mb-8 leading-relaxed max-w-3xl mx-auto"
                data-editable
                data-name="about.hero.description"
              >
                Depuis plus de 10 ans, Syloma accompagne stagiaires et formateurs avec un engagement 
                sans faille : allier excellence pédagogique et simplicité administrative.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link href="/formations">
                  <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8">
                    Découvrir nos formations
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button variant="outline" size="lg" className="px-8">
                    Nous contacter
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-primary/5 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                  <div key={index} className="text-center group">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-2xl mb-4 group-hover:bg-primary/20 transition-colors duration-300">
                      <IconComponent className="w-8 h-8 text-primary" />
                    </div>
                    <div className="text-3xl font-bold text-foreground mb-2">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Positioning & Role Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <Badge 
                  variant="outline" 
                  className="mb-4 text-sm bg-primary/10 text-primary border-primary/20"
                  data-editable
                  data-name="about.positioning.badge"
                >
                  Notre positionnement
                </Badge>
                
                <h2 
                  className="text-3xl md:text-4xl font-bold text-foreground mb-6"
                  data-editable
                  data-name="about.positioning.title"
                >
                  L'organisme de référence qui simplifie votre parcours de formation
                </h2>
                
                <div 
                  className="text-lg text-muted-foreground mb-8 space-y-4"
                  data-editable
                  data-name="about.positioning.description"
                >
                  <p>
                    Chez Syloma, nous jouons le rôle de <strong>tiers de confiance</strong> entre les stagiaires 
                    et les formateurs experts. Notre mission : vous offrir un accès simplifié à la formation 
                    professionnelle de qualité.
                  </p>
                  <p>
                    Nous nous occupons de toute la complexité administrative - certifications, financements, 
                    conformité - pour que vous puissiez vous concentrer sur l'essentiel : apprendre et transmettre.
                  </p>
                </div>

                <Link href="/formateurs">
                  <Button variant="outline" className="group">
                    Découvrir notre approche
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {guarantees.map((guarantee, index) => {
                  const IconComponent = guarantee.icon;
                  return (
                    <div 
                      key={index}
                      className="p-6 bg-card border border-border rounded-xl hover:shadow-lg transition-all duration-300"
                    >
                      <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mb-4">
                        <IconComponent className="w-6 h-6 text-primary" />
                      </div>
                      <h3 className="font-semibold text-foreground mb-2">{guarantee.title}</h3>
                      <p className="text-sm text-muted-foreground">{guarantee.description}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Certifications Showcase */}
        <section className="py-20 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <Badge 
                variant="outline" 
                className="mb-4 text-sm bg-primary/10 text-primary border-primary/20"
                data-editable
                data-name="about.certifications.badge"
              >
                Nos certifications
              </Badge>
              
              <h2 
                className="text-3xl md:text-4xl font-bold text-foreground mb-6"
                data-editable
                data-name="about.certifications.title"
              >
                La qualité reconnue et certifiée
              </h2>
              
              <p 
                className="text-lg text-muted-foreground max-w-3xl mx-auto"
                data-editable
                data-name="about.certifications.description"
              >
                Nos certifications témoignent de notre engagement qualité et de notre conformité 
                aux plus hauts standards de la formation professionnelle.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {certifications?.map((cert, index) => (
                <div 
                  key={cert.id}
                  className="bg-card border border-border rounded-2xl p-8 text-center hover:shadow-lg transition-all duration-300"
                >
                  <div className="w-20 h-20 mx-auto mb-6 rounded-xl overflow-hidden">
                    <img 
                      src={cert.logo.url} 
                      alt={cert.logo.alt_text}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">{cert.nom}</h3>
                  <div 
                    className="text-muted-foreground mb-4 text-sm"
                    dangerouslySetInnerHTML={{ __html: cert.description }}
                  />
                  
                  {cert.date_obtention && (
                    <div className="text-xs text-muted-foreground space-y-1">
                      <p>Obtenue le : {new Date(cert.date_obtention).toLocaleDateString('fr-FR')}</p>
                      {cert.date_expiration && (
                        <p>Valide jusqu'au : {new Date(cert.date_expiration).toLocaleDateString('fr-FR')}</p>
                      )}
                      {cert.numero_certification && (
                        <p>N° : {cert.numero_certification}</p>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process Timeline */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <Badge 
                variant="outline" 
                className="mb-4 text-sm bg-primary/10 text-primary border-primary/20"
                data-editable
                data-name="about.process.badge"
              >
                Notre processus
              </Badge>
              
              <h2 
                className="text-3xl md:text-4xl font-bold text-foreground mb-6"
                data-editable
                data-name="about.process.title"
              >
                Un parcours simple et transparent
              </h2>
              
              <p 
                className="text-lg text-muted-foreground max-w-3xl mx-auto"
                data-editable
                data-name="about.process.description"
              >
                De votre première prise de contact à la certification finale, 
                chaque étape est soigneusement orchestrée pour votre réussite.
              </p>
            </div>

            <div className="relative">
              {/* Timeline line */}
              <div className="hidden lg:block absolute left-1/2 transform -translate-x-0.5 h-full w-0.5 bg-border"></div>

              <div className="space-y-12 lg:space-y-16">
                {processSteps.map((step, index) => (
                  <div 
                    key={index}
                    className={`flex flex-col lg:flex-row items-center gap-8 ${
                      index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                    }`}
                  >
                    {/* Content */}
                    <div className="flex-1 text-center lg:text-left">
                      <div className="bg-card border border-border rounded-xl p-6">
                        <h3 className="text-xl font-semibold text-foreground mb-3">{step.title}</h3>
                        <p className="text-muted-foreground">{step.description}</p>
                      </div>
                    </div>

                    {/* Step Circle */}
                    <div className="relative flex-shrink-0">
                      <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
                        <span className="text-primary-foreground font-bold text-lg">{step.step}</span>
                      </div>
                      <div className="absolute inset-0 bg-primary/30 rounded-full animate-ping"></div>
                    </div>

                    {/* Spacer for alternating layout */}
                    <div className="flex-1 hidden lg:block"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Rights & Quality Engagement */}
        <section className="py-20 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16">
              {/* Trainee Rights */}
              <div>
                <h2 
                  className="text-3xl font-bold text-foreground mb-6"
                  data-editable
                  data-name="about.rights.title"
                >
                  Vos droits en tant que stagiaire
                </h2>
                
                <div className="space-y-4">
                  {[
                    'Accès à une formation de qualité certifiée',
                    'Transparence totale sur les coûts et modalités',
                    'Accompagnement personnalisé tout au long du parcours',
                    'Droit au financement selon votre éligibilité',
                    'Évaluation équitable et certification reconnue',
                    'Support technique et pédagogique continu'
                  ].map((right, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                      <span 
                        className="text-muted-foreground"
                        data-editable
                        data-name={`about.rights.item_${index + 1}`}
                      >
                        {right}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quality Engagement */}
              <div>
                <h2 
                  className="text-3xl font-bold text-foreground mb-6"
                  data-editable
                  data-name="about.quality.title"
                >
                  Notre engagement qualité
                </h2>
                
                <div 
                  className="text-muted-foreground mb-6"
                  data-editable
                  data-name="about.quality.description"
                >
                  <p className="mb-4">
                    La qualité n'est pas une option chez Syloma, c'est notre ADN. 
                    Nous nous engageons à maintenir les plus hauts standards à chaque étape.
                  </p>
                </div>

                <div className="bg-card border border-border rounded-xl p-6">
                  <h3 className="font-semibold text-foreground mb-4">Métriques qualité 2024</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">98%</div>
                      <div className="text-xs text-muted-foreground">Satisfaction stagiaires</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">95%</div>
                      <div className="text-xs text-muted-foreground">Taux de réussite</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values & Team */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <Badge 
                variant="outline" 
                className="mb-4 text-sm bg-primary/10 text-primary border-primary/20"
                data-editable
                data-name="about.values.badge"
              >
                Nos valeurs
              </Badge>
              
              <h2 
                className="text-3xl md:text-4xl font-bold text-foreground mb-6"
                data-editable
                data-name="about.values.title"
              >
                Les valeurs qui nous guident
              </h2>
              
              <p 
                className="text-lg text-muted-foreground max-w-3xl mx-auto"
                data-editable
                data-name="about.values.description"
              >
                Ces principes fondamentaux structurent toutes nos actions et décisions, 
                pour vous offrir la meilleure expérience de formation possible.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-16">
              {values.map((value, index) => {
                const IconComponent = value.icon;
                return (
                  <div 
                    key={index}
                    className="text-center p-6 rounded-xl hover:bg-muted/50 transition-colors duration-300"
                  >
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6">
                      <IconComponent className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-4">{value.title}</h3>
                    <p className="text-muted-foreground">{value.description}</p>
                  </div>
                );
              })}
            </div>

            {/* Testimonials Preview */}
            {testimonials && testimonials.length > 0 && (
              <div className="bg-muted/30 rounded-2xl p-8 md:p-12">
                <h3 
                  className="text-2xl font-bold text-foreground text-center mb-8"
                  data-editable
                  data-name="about.testimonials.title"
                >
                  Ils nous font confiance
                </h3>
                
                <div className="grid md:grid-cols-3 gap-6">
                  {testimonials.slice(0, 3).map((testimonial) => (
                    <div 
                      key={testimonial.id}
                      className="bg-card border border-border rounded-xl p-6"
                    >
                      <div className="flex items-center mb-4">
                        <img 
                          src={testimonial.photo.url}
                          alt={testimonial.photo.alt_text}
                          className="w-12 h-12 rounded-full object-cover mr-3"
                        />
                        <div>
                          <div className="font-semibold text-foreground">{testimonial.nom}</div>
                          <div className="text-sm text-muted-foreground">{testimonial.poste}</div>
                        </div>
                      </div>
                      
                      <div className="flex mb-3">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i}
                            className={`w-4 h-4 ${
                              i < testimonial.note ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      
                      <div 
                        className="text-sm text-muted-foreground line-clamp-3"
                        dangerouslySetInnerHTML={{ 
                          __html: testimonial.temoignage.substring(0, 150) + '...' 
                        }}
                      />
                    </div>
                  ))}
                </div>

                <div className="text-center mt-8">
                  <Link href="/#testimonials">
                    <Button variant="outline">
                      Voir tous les témoignages
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <h2 
              className="text-3xl md:text-4xl font-bold text-foreground mb-6"
              data-editable
              data-name="about.cta.title"
            >
              Prêt à démarrer votre formation ?
            </h2>
            
            <p 
              className="text-lg text-muted-foreground mb-8"
              data-editable
              data-name="about.cta.description"
            >
              Rejoignez les milliers de professionnels qui ont fait confiance à Syloma 
              pour développer leurs compétences.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/formations">
                <Button size="lg" className="px-8">
                  Explorer le catalogue
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" size="lg" className="px-8">
                  Obtenir des conseils
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export const getStaticProps: GetStaticProps<AboutPageProps> = async () => {
  console.log('Fetching data for About page');
  
  const certifications = getCMSData<Certification>('certifications');
  const testimonials = getCMSData<Temoignage>('temoignages');

  return {
    props: {
      initialCertifications: certifications,
      initialTestimonials: testimonials
    }
  };
};

export default AboutPage;
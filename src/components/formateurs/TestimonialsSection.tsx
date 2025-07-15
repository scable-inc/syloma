import React from 'react';
import { Star, Quote } from 'lucide-react';
import { Temoignage } from '@/types/temoignages';

interface TestimonialsSectionProps {
  temoignages: Temoignage[];
}

const TestimonialsSection = ({ temoignages }: TestimonialsSectionProps) => {
  console.log('TestimonialsSection component rendering with', temoignages.length, 'testimonials');

  if (!temoignages || temoignages.length === 0) {
    return null;
  }

  return (
    <section className="py-24 bg-gradient-to-b from-muted/20 to-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 
            className="text-3xl md:text-4xl font-bold text-foreground mb-6"
            data-editable
            data-name="formateurs.testimonials.title"
          >
            Ils nous font confiance
          </h2>
          <p 
            className="text-xl text-muted-foreground leading-relaxed"
            data-editable
            data-name="formateurs.testimonials.subtitle"
          >
            Découvrez les témoignages de nos formateurs partenaires qui ont choisi 
            Syloma pour développer leur activité en toute sérénité.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {temoignages.slice(0, 4).map((temoignage) => (
            <div 
              key={temoignage.id}
              className="group bg-card/50 backdrop-blur-sm rounded-2xl p-8 border border-border/50 hover:border-primary/30 transition-all duration-500 hover:shadow-lg hover:shadow-primary/10"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <img 
                      src={temoignage.photo.url}
                      alt={temoignage.photo.alt_text}
                      className="w-16 h-16 rounded-full object-cover border-2 border-primary/20"
                    />
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold">
                      F
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-foreground text-lg">
                      {temoignage.nom}
                    </h3>
                    {temoignage.poste && (
                      <p className="text-muted-foreground">
                        {temoignage.poste}
                      </p>
                    )}
                    {temoignage.entreprise && (
                      <p className="text-sm text-muted-foreground">
                        {temoignage.entreprise}
                      </p>
                    )}
                  </div>
                </div>

                {/* Quote Icon */}
                <Quote className="h-8 w-8 text-primary/30 group-hover:text-primary/50 transition-colors duration-300" />
              </div>

              {/* Rating */}
              {temoignage.note && (
                <div className="flex items-center space-x-2 mb-4">
                  <div className="flex space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`h-5 w-5 ${
                          i < temoignage.note! 
                            ? 'text-yellow-400 fill-yellow-400' 
                            : 'text-muted-foreground/30'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {temoignage.note}/5
                  </span>
                </div>
              )}

              {/* Testimonial Content */}
              <div 
                className="text-muted-foreground leading-relaxed"
                dangerouslySetInnerHTML={{ __html: temoignage.temoignage }}
              />

              {/* Date */}
              {temoignage.date_temoignage && (
                <div className="mt-6 pt-4 border-t border-border/30">
                  <p className="text-xs text-muted-foreground">
                    Témoignage du {new Date(temoignage.date_temoignage).toLocaleDateString('fr-FR', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
              )}

              {/* Formation Badge */}
              {temoignage.formation_suivie && (
                <div className="mt-4">
                  <span className="inline-flex items-center px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">
                    Formation: {temoignage.formation_suivie}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* More Testimonials CTA */}
        {temoignages.length > 4 && (
          <div className="text-center mt-12">
            <p className="text-muted-foreground mb-4">
              {temoignages.length - 4} autres témoignages disponibles
            </p>
            <button className="inline-flex items-center px-6 py-3 bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg hover:border-primary/30 transition-all duration-300">
              <span className="text-foreground font-medium">Voir tous les témoignages</span>
            </button>
          </div>
        )}

        {/* Stats Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6 bg-card/30 backdrop-blur-sm rounded-xl border border-border/50">
            <div className="text-3xl font-bold text-primary mb-2">98%</div>
            <div className="text-muted-foreground">Taux de satisfaction formateurs</div>
          </div>
          <div className="text-center p-6 bg-card/30 backdrop-blur-sm rounded-xl border border-border/50">
            <div className="text-3xl font-bold text-primary mb-2">150+</div>
            <div className="text-muted-foreground">Formateurs partenaires actifs</div>
          </div>
          <div className="text-center p-6 bg-card/30 backdrop-blur-sm rounded-xl border border-border/50">
            <div className="text-3xl font-bold text-primary mb-2">5 ans</div>
            <div className="text-muted-foreground">Ancienneté moyenne des partenariats</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
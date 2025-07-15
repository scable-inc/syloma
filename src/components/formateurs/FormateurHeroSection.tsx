import React from 'react';
import Link from 'next/link';
import { CheckCircle, Award, Users, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

const FormateurHeroSection = () => {
  console.log('FormateurHeroSection component rendering');

  const highlights = [
    { icon: Award, text: "Certification Qualiopi incluse" },
    { icon: TrendingUp, text: "Accès aux financements publics" },
    { icon: CheckCircle, text: "Gestion administrative simplifiée" },
    { icon: Users, text: "Communauté de formateurs experts" }
  ];

  return (
    <section className="relative min-h-screen flex items-center bg-gradient-to-b from-background to-muted/20 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div 
          className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20viewBox%3D%220%200%20100%20100%22%3E%3Cpath%20d%3D%22M20%2020L80%2020L80%2080L20%2080Z%22%20fill%3D%22none%22%20stroke%3D%22%2323%22%20stroke-width%3D%220.5%22/%3E%3C/svg%3E')] bg-repeat opacity-20"
          style={{ backgroundSize: '60px 60px' }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="inline-flex items-center space-x-2 bg-primary/10 px-4 py-2 rounded-full">
                <Award className="h-5 w-5 text-primary" />
                <span 
                  className="text-primary font-semibold"
                  data-editable
                  data-name="formateurs.hero.badge"
                >
                  Organisme Certifié Qualiopi
                </span>
              </div>
              
              <h1 
                className="text-4xl md:text-6xl font-bold text-foreground leading-tight"
                data-editable
                data-name="formateurs.hero.title"
              >
                Rejoignez l'excellence en formation professionnelle
              </h1>
              
              <p 
                className="text-xl text-muted-foreground leading-relaxed"
                data-editable
                data-name="formateurs.hero.subtitle"
              >
                Bénéficiez de notre certification Qualiopi sans la charge administrative. 
                Concentrez-vous sur votre expertise, nous gérons le reste.
              </p>
            </div>

            {/* Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {highlights.map((item, index) => (
                <div key={index} className="flex items-center space-x-3 p-4 bg-card/50 backdrop-blur-sm rounded-xl border border-border/50">
                  <div className="flex-shrink-0 p-2 bg-primary/10 rounded-lg">
                    <item.icon className="h-5 w-5 text-primary" />
                  </div>
                  <span className="text-foreground font-medium">{item.text}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-lg px-8"
                asChild
              >
                <Link href="#adhesion">
                  <span data-editable data-name="formateurs.hero.cta_primary">
                    Rejoindre Syloma
                  </span>
                </Link>
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="text-lg px-8 border-primary/30 hover:bg-primary/5"
                asChild
              >
                <Link href="#processus">
                  <span data-editable data-name="formateurs.hero.cta_secondary">
                    Comprendre le processus
                  </span>
                </Link>
              </Button>
            </div>
          </div>

          {/* Visual Element */}
          <div className="relative">
            <div className="relative bg-gradient-to-br from-primary/10 to-primary/20 rounded-3xl p-8 backdrop-blur-sm border border-primary/20">
              {/* Stats Cards */}
              <div className="space-y-6">
                <div className="bg-card/80 backdrop-blur-sm rounded-xl p-6 border border-border/50">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Formateurs partenaires</p>
                      <p className="text-3xl font-bold text-foreground">150+</p>
                    </div>
                    <Users className="h-8 w-8 text-primary" />
                  </div>
                </div>

                <div className="bg-card/80 backdrop-blur-sm rounded-xl p-6 border border-border/50">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Formations réalisées</p>
                      <p className="text-3xl font-bold text-foreground">2,500+</p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-primary" />
                  </div>
                </div>

                <div className="bg-card/80 backdrop-blur-sm rounded-xl p-6 border border-border/50">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Taux de satisfaction</p>
                      <p className="text-3xl font-bold text-foreground">98%</p>
                    </div>
                    <Award className="h-8 w-8 text-primary" />
                  </div>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-primary/20 rounded-full blur-2xl"></div>
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-secondary/30 rounded-full blur-xl"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FormateurHeroSection;
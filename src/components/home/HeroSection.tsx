import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Users, BookOpen, Award, ArrowRight } from 'lucide-react';

const HeroSection = () => {
  console.log('HeroSection component rendering');

  const accreditations = [
    { name: 'Qualiopi', icon: '🎖️' },
    { name: 'Audit Véritas', icon: '✅' },
    { name: 'DataDock', icon: '📋' }
  ];

  const stats = [
    { value: '500+', label: 'Formations', icon: BookOpen },
    { value: '2,500+', label: 'Stagiaires', icon: Users },
    { value: '98%', label: 'Satisfaction', icon: Award }
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-muted/30 to-background">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 -right-24 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-primary/3 to-accent/3 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Floating Geometric Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-4 h-4 bg-primary/20 rounded rotate-45 animate-bounce delay-75"></div>
        <div className="absolute top-40 right-20 w-6 h-6 bg-accent/20 rounded-full animate-bounce delay-150"></div>
        <div className="absolute bottom-40 left-20 w-5 h-5 bg-primary/15 rounded-full animate-bounce delay-300"></div>
        <div className="absolute bottom-20 right-10 w-3 h-3 bg-accent/25 rotate-12 animate-bounce delay-500"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="text-center">
          {/* Accreditations Badge */}
          <div className="mb-8 flex justify-center">
            <div className="bg-gradient-to-r from-primary/10 to-accent/10 backdrop-blur-sm rounded-full px-6 py-3 border border-primary/20">
              <div className="flex items-center space-x-4">
                <span 
                  className="text-sm font-medium text-primary"
                  data-editable
                  data-name="homepage.hero.accreditations_label"
                >
                  Organisme certifié :
                </span>
                {accreditations.map((acc, index) => (
                  <div key={index} className="flex items-center space-x-1">
                    <span>{acc.icon}</span>
                    <span className="text-sm font-medium text-foreground">{acc.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-foreground mb-6 leading-tight">
            <span 
              className="block"
              data-editable
              data-name="homepage.hero.title_line1"
            >
              Formation professionnelle
            </span>
            <span className="block bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              <span data-editable data-name="homepage.hero.title_line2">
                de confiance
              </span>
            </span>
          </h1>

          {/* Subtitle */}
          <p 
            className="text-xl sm:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed"
            data-editable
            data-name="homepage.hero.subtitle"
          >
            Votre organisme de référence pour des formations de qualité. 
            Certification Qualiopi sans la charge administrative.
          </p>

          {/* Value Propositions */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12 max-w-4xl mx-auto">
            {[
              'Certification Qualiopi garantie',
              'Support administratif complet',
              'Accompagnement qualité permanent'
            ].map((feature, index) => (
              <div key={index} className="flex items-center justify-center space-x-2 bg-background/50 backdrop-blur-sm rounded-lg p-4 border border-border/50">
                <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                <span 
                  className="text-sm font-medium text-foreground"
                  data-editable
                  data-name={`homepage.hero.feature_${index + 1}`}
                >
                  {feature}
                </span>
              </div>
            ))}
          </div>

          {/* Dual CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link href="/formations">
              <Button 
                size="lg" 
                className="group bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-2xl hover:shadow-primary/25 transition-all duration-500 transform hover:scale-105 px-8 py-6 text-lg font-semibold"
              >
                <Users className="mr-2 h-5 w-5" />
                <span data-editable data-name="homepage.hero.cta_student">Je suis un stagiaire</span>
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
            </Link>
            
            <Link href="/formateurs">
              <Button 
                size="lg"
                variant="outline"
                className="group bg-background/70 backdrop-blur-sm hover:bg-primary/5 border-2 border-primary/20 hover:border-primary/40 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 px-8 py-6 text-lg font-semibold"
              >
                <BookOpen className="mr-2 h-5 w-5" />
                <span data-editable data-name="homepage.hero.cta_trainer">Je suis un formateur</span>
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
            </Link>
          </div>

          {/* Trust Statistics */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <div 
                key={index}
                className="bg-background/60 backdrop-blur-xl rounded-2xl p-6 border border-border/50 hover:border-primary/30 transition-all duration-500 group hover:transform hover:scale-105"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <stat.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="text-3xl font-bold text-foreground mb-2">{stat.value}</div>
                  <div className="text-sm font-medium text-muted-foreground">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="w-8 h-12 border-2 border-primary/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-bounce"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
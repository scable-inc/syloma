import React, { useState, useEffect, useRef } from 'react';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Users, BookOpen, Award, Target, Clock, CheckCircle, Zap } from 'lucide-react';

interface StatCardProps {
  icon: React.ElementType;
  value: string;
  label: string;
  description: string;
  suffix?: string;
  color: string;
  animatedValue?: number;
}

const StatCard: React.FC<StatCardProps> = ({
  icon: Icon,
  value,
  label,
  description,
  suffix = '',
  color,
  animatedValue
}) => {
  const [displayValue, setDisplayValue] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [isVisible]);

  useEffect(() => {
    if (isVisible && animatedValue) {
      let startTime: number | null = null;
      const duration = 2000; // 2 seconds

      const animate = (currentTime: number) => {
        if (startTime === null) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / duration, 1);
        
        // Easing function for smooth animation
        const easeOut = 1 - Math.pow(1 - progress, 3);
        setDisplayValue(Math.floor(easeOut * animatedValue));

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };

      requestAnimationFrame(animate);
    }
  }, [isVisible, animatedValue]);

  console.log('Rendering StatCard:', label, 'animated value:', animatedValue);

  return (
    <div 
      ref={ref}
      className={`group bg-background/60 backdrop-blur-sm rounded-2xl p-8 border border-border/50 hover:border-primary/30 transition-all duration-500 hover:transform hover:scale-105 hover:shadow-2xl ${color}`}
    >
      <div className="text-center">
        {/* Icon */}
        <div className="w-16 h-16 bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
          <Icon className="w-8 h-8 text-primary" />
        </div>

        {/* Value */}
        <div className="text-4xl font-bold text-foreground mb-2 group-hover:scale-110 transition-transform duration-300">
          {animatedValue ? displayValue : value}{suffix}
        </div>

        {/* Label */}
        <div className="text-lg font-semibold text-foreground mb-2">
          {label}
        </div>

        {/* Description */}
        <div className="text-sm text-muted-foreground">
          {description}
        </div>
      </div>
    </div>
  );
};

const StatsSection = () => {
  console.log('StatsSection component rendering');

  const mainStats: StatCardProps[] = [
    {
      icon: BookOpen,
      value: '500',
      label: 'Formations actives',
      description: 'dans notre catalogue',
      color: 'hover:bg-blue-50/50',
      animatedValue: 500
    },
    {
      icon: Users,
      value: '2,500',
      label: 'Stagiaires formés',
      description: 'depuis notre création',
      color: 'hover:bg-green-50/50',
      animatedValue: 2500
    },
    {
      icon: Award,
      value: '98',
      label: 'Taux de satisfaction',
      description: 'sur nos dernières formations',
      suffix: '%',
      color: 'hover:bg-purple-50/50',
      animatedValue: 98
    },
    {
      icon: TrendingUp,
      value: '95',
      label: 'Taux de réussite',
      description: 'aux certifications',
      suffix: '%',
      color: 'hover:bg-orange-50/50',
      animatedValue: 95
    }
  ];

  const additionalStats = [
    {
      icon: Target,
      value: '150+',
      label: 'Formateurs experts',
      description: 'certifiés et qualifiés'
    },
    {
      icon: Clock,
      value: '24h',
      label: 'Support disponible',
      description: 'assistance dédiée'
    },
    {
      icon: CheckCircle,
      value: '100%',
      label: 'Conformité Qualiopi',
      description: 'maintenue en permanence'
    },
    {
      icon: Zap,
      value: '48h',
      label: 'Délai moyen',
      description: 'de traitement des demandes'
    }
  ];

  const achievements = [
    'Plus de 3 années d\'expérience en formation professionnelle',
    'Certification Qualiopi renouvelée avec succès',
    'Partenaire de confiance de 200+ entreprises',
    'Croissance de 50% du nombre de stagiaires par an',
    'Taux de recommandation de 95% par nos clients',
    'Innovation continue dans nos méthodes pédagogiques'
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-background via-muted/20 to-background relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 -left-24 w-96 h-96 bg-primary/3 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 -right-24 w-96 h-96 bg-accent/3 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge 
            variant="outline" 
            className="mb-6 px-4 py-2 bg-primary/5 border-primary/20 text-primary font-medium"
          >
            <TrendingUp className="w-4 h-4 mr-2" />
            <span data-editable data-name="homepage.stats.badge">Chiffres Clés</span>
          </Badge>
          
          <h2 
            className="text-4xl sm:text-5xl font-bold text-foreground mb-6"
            data-editable
            data-name="homepage.stats.title"
          >
            Des résultats qui
            <span className="block bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              parlent d&#39;eux-mêmes
            </span>
          </h2>
          
          <p 
            className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
            data-editable
            data-name="homepage.stats.subtitle"
          >
            Découvrez les chiffres qui témoignent de notre engagement qualité et 
            de la satisfaction de nos stagiaires et formateurs.
          </p>
        </div>

        {/* Main Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {mainStats.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>

        {/* Additional Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {additionalStats.map((stat, index) => (
            <div 
              key={index}
              className="text-center bg-background/40 backdrop-blur-sm rounded-xl p-6 border border-border/30 hover:border-primary/20 transition-all duration-300 group hover:transform hover:scale-105"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <stat.icon className="w-6 h-6 text-primary" />
              </div>
              <div className="text-2xl font-bold text-foreground mb-1">{stat.value}</div>
              <div className="text-sm font-semibold text-foreground mb-1">{stat.label}</div>
              <div className="text-xs text-muted-foreground">{stat.description}</div>
            </div>
          ))}
        </div>

        {/* Achievements Banner */}
        <div className="bg-gradient-to-r from-primary/5 via-primary/3 to-primary/5 rounded-3xl p-8 lg:p-12 border border-primary/10 backdrop-blur-sm">
          <div className="text-center mb-8">
            <h3 
              className="text-3xl font-bold text-foreground mb-4"
              data-editable
              data-name="homepage.stats.achievements_title"
            >
              Nos réalisations marquantes
            </h3>
            <p 
              className="text-lg text-muted-foreground"
              data-editable
              data-name="homepage.stats.achievements_subtitle"
            >
              Les étapes clés de notre parcours vers l&#39;excellence
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {achievements.map((achievement, index) => (
              <div 
                key={index}
                className="flex items-center space-x-3 bg-background/60 backdrop-blur-sm rounded-lg p-4 hover:bg-background/80 transition-all duration-300"
              >
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-5 h-5 text-primary" />
                </div>
                <span 
                  className="text-sm text-foreground font-medium"
                  data-editable
                  data-name={`homepage.stats.achievement_${index + 1}`}
                >
                  {achievement}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
import React, { useState, useEffect } from 'react';
import type { GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { Search, MessageCircle, ChevronDown, ChevronUp, Users, GraduationCap, HelpCircle, Mail, Phone, FileText, Clock, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useCMSData, getCMSData } from '@/hooks/use-data';
import { FAQ } from '@/types/faq';

interface FAQPageProps {
  initialFaqs: FAQ[];
}

const FAQPage = ({ initialFaqs }: FAQPageProps) => {
  const [selectedCategory, setSelectedCategory] = useState<'Stagiaire' | 'Formateur'>('Stagiaire');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const [selectedTheme, setSelectedTheme] = useState<string>('');

  const { data: faqs } = useCMSData<FAQ>('faq', { 
    filters: { active: true },
    sortBy: 'ordre',
    sortOrder: 'asc'
  }, initialFaqs);

  console.log('FAQ Page rendering with faqs:', faqs?.length);

  // Filtrage des FAQ par catégorie
  const filteredByCategory = faqs?.filter(faq => faq.categorie === selectedCategory) || [];

  // Filtrage par recherche
  const filteredFaqs = filteredByCategory.filter(faq => {
    const matchesSearch = searchQuery === '' || 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.reponse.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.mots_cles?.some(keyword => keyword.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesTheme = selectedTheme === '' || faq.thematique === selectedTheme;
    
    return matchesSearch && matchesTheme;
  });

  // Groupement par thématique
  const faqsByTheme = filteredFaqs.reduce((acc, faq) => {
    const theme = faq.thematique || 'Général';
    if (!acc[theme]) acc[theme] = [];
    acc[theme].push(faq);
    return acc;
  }, {} as Record<string, FAQ[]>);

  // Thématiques disponibles
  const availableThemes = Array.from(new Set(filteredByCategory.map(faq => faq.thematique || 'Général')));

  const toggleItem = (id: string) => {
    setExpandedItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const getThemeIcon = (theme: string) => {
    switch (theme.toLowerCase()) {
      case 'financement': return <Shield className="h-5 w-5" />;
      case 'documents': return <FileText className="h-5 w-5" />;
      case 'délais': return <Clock className="h-5 w-5" />;
      case 'processus': return <Users className="h-5 w-5" />;
      case 'obligations': return <GraduationCap className="h-5 w-5" />;
      default: return <HelpCircle className="h-5 w-5" />;
    }
  };

  const stats = [
    { 
      label: 'Questions Stagiaires', 
      value: faqs?.filter(f => f.categorie === 'Stagiaire').length || 0,
      icon: <Users className="h-5 w-5" />
    },
    { 
      label: 'Questions Formateurs', 
      value: faqs?.filter(f => f.categorie === 'Formateur').length || 0,
      icon: <GraduationCap className="h-5 w-5" />
    },
    { 
      label: 'Thématiques', 
      value: availableThemes.length,
      icon: <FileText className="h-5 w-5" />
    }
  ];

  useEffect(() => {
    console.log('FAQ filters applied:', { selectedCategory, searchQuery, selectedTheme, resultsCount: filteredFaqs.length });
  }, [selectedCategory, searchQuery, selectedTheme, filteredFaqs.length]);

  return (
    <>
      <Head>
        <title>FAQ - Questions Fréquentes | Syloma Formation</title>
        <meta 
          name="description"
          content="Trouvez rapidement les réponses à vos questions sur nos formations, financements, processus d'inscription et services pour stagiaires et formateurs."
        />
      </Head>

      <Header />

      <main className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
        {/* Hero Section */}
        <section className="relative pt-24 pb-16 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-primary/10"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-4xl mx-auto">
              <div className="flex items-center justify-center mb-6">
                <div className="p-4 bg-gradient-to-br from-primary/20 to-primary/30 rounded-2xl backdrop-blur-sm">
                  <HelpCircle className="h-12 w-12 text-primary" />
                </div>
              </div>
              
              <h1 
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight"
                data-editable
                data-name="faq.hero.title"
              >
                Questions Fréquentes
              </h1>
              
              <p 
                className="text-xl text-muted-foreground mb-8 leading-relaxed"
                data-editable
                data-name="faq.hero.description"
              >
                Trouvez rapidement les réponses à vos questions sur nos formations, 
                financements et processus. Support dédié pour stagiaires et formateurs.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
                {stats.map((stat, index) => (
                  <div key={index} className="bg-background/50 backdrop-blur-sm rounded-xl p-6 border border-border/50">
                    <div className="flex items-center justify-center mb-3 text-primary">
                      {stat.icon}
                    </div>
                    <div className="text-2xl font-bold text-foreground mb-1">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Search and Filters */}
        <section className="py-8 sticky top-16 z-40 bg-background/80 backdrop-blur-xl border-b border-border/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-6 border border-border/50 shadow-lg">
              <div className="flex flex-col lg:flex-row gap-6 items-center">
                {/* Category Selector */}
                <div className="flex bg-muted/50 rounded-xl p-1">
                  {(['Stagiaire', 'Formateur'] as const).map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition-all duration-300 font-medium ${
                        selectedCategory === category
                          ? 'bg-primary text-primary-foreground shadow-md transform scale-105'
                          : 'text-muted-foreground hover:text-foreground hover:bg-background/50'
                      }`}
                    >
                      {category === 'Stagiaire' ? <Users className="h-4 w-4" /> : <GraduationCap className="h-4 w-4" />}
                      <span>{category}s</span>
                    </button>
                  ))}
                </div>

                {/* Search */}
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Rechercher dans les questions..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-background/50 backdrop-blur-sm border-border/50 focus:border-primary/50 focus:ring-primary/25"
                  />
                </div>

                {/* Theme Filter */}
                <div className="w-full lg:w-auto">
                  <select
                    value={selectedTheme}
                    onChange={(e) => setSelectedTheme(e.target.value)}
                    className="w-full lg:w-auto px-4 py-3 bg-background/50 border border-border/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/25  text-foreground"
                  >
                    <option value="">Toutes les thématiques</option>
                    {availableThemes.map(theme => (
                      <option key={theme} value={theme}>{theme}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Results Count */}
              <div className="mt-4 text-sm text-muted-foreground text-center">
                {filteredFaqs.length} question{filteredFaqs.length !== 1 ? 's' : ''} trouvée{filteredFaqs.length !== 1 ? 's' : ''}
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Content */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {Object.keys(faqsByTheme).length === 0 ? (
              <div className="text-center py-16">
                <HelpCircle className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">Aucune question trouvée</h3>
                <p className="text-muted-foreground mb-6">
                  Essayez de modifier vos critères de recherche ou parcourez une autre catégorie.
                </p>
                <Link href="/contact">
                  <Button className="bg-gradient-to-r from-primary to-primary/80">
                    <Mail className="h-4 w-4 mr-2" />
                    Poser une question
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-12">
                {Object.entries(faqsByTheme).map(([theme, themeFaqs]) => (
                  <div key={theme} className="space-y-6">
                    {/* Theme Header */}
                    <div className="flex items-center space-x-3 mb-8">
                      <div className="p-3 bg-gradient-to-br from-primary/20 to-primary/30 rounded-xl">
                        {getThemeIcon(theme)}
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-foreground">{theme}</h2>
                        <p className="text-muted-foreground">{themeFaqs.length} question{themeFaqs.length !== 1 ? 's' : ''}</p>
                      </div>
                    </div>

                    {/* FAQ Items */}
                    <div className="space-y-4">
                      {themeFaqs.map((faq) => (
                        <div 
                          key={faq.id}
                          className="group bg-card/50 backdrop-blur-sm rounded-xl border border-border/50 overflow-hidden hover:shadow-lg transition-all duration-300"
                        >
                          <button
                            onClick={() => toggleItem(faq.id)}
                            className="w-full p-6 text-left flex items-center justify-between hover:bg-muted/20 transition-colors duration-200"
                          >
                            <h3 className="text-lg font-semibold text-foreground pr-4 leading-relaxed">
                              {faq.question}
                            </h3>
                            <div className="flex-shrink-0">
                              {expandedItems.includes(faq.id) ? (
                                <ChevronUp className="h-5 w-5 text-primary transform transition-transform duration-200" />
                              ) : (
                                <ChevronDown className="h-5 w-5 text-muted-foreground group-hover:text-primary transform transition-all duration-200" />
                              )}
                            </div>
                          </button>

                          {expandedItems.includes(faq.id) && (
                            <div className="px-6 pb-6 border-t border-border/30">
                              <div className="pt-4">
                                <div 
                                  className="prose prose-sm max-w-none text-muted-foreground leading-relaxed"
                                  dangerouslySetInnerHTML={{ __html: faq.reponse }}
                                />
                                
                                {/* Keywords Tags */}
                                {faq.mots_cles && faq.mots_cles.length > 0 && (
                                  <div className="mt-4 flex flex-wrap gap-2">
                                    {faq.mots_cles.map((keyword, index) => (
                                      <span 
                                        key={index}
                                        className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full"
                                      >
                                        {keyword}
                                      </span>
                                    ))}
                                  </div>
                                )}

                                {/* Feedback Actions */}
                                <div className="mt-6 pt-4 border-t border-border/30 flex items-center justify-between">
                                  <p className="text-sm text-muted-foreground">Cette réponse vous a-t-elle aidé ?</p>
                                  <div className="flex items-center space-x-2">
                                    <Button variant="ghost" size="sm" className="text-xs">
                                      👍 Oui
                                    </Button>
                                    <Button variant="ghost" size="sm" className="text-xs">
                                      👎 Non
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 bg-gradient-to-r from-primary/5 to-primary/10">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 
                className="text-3xl font-bold text-foreground mb-4"
                data-editable
                data-name="faq.contact.title"
              >
                Vous ne trouvez pas votre réponse ?
              </h2>
              <p 
                className="text-lg text-muted-foreground"
                data-editable
                data-name="faq.contact.description"
              >
                Notre équipe support est là pour vous accompagner dans toutes vos démarches.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Contact General */}
              <div className="bg-card/50 backdrop-blur-sm rounded-xl p-6 border border-border/50 text-center group hover:shadow-lg transition-all duration-300">
                <div className="p-3 bg-gradient-to-br from-primary/20 to-primary/30 rounded-xl w-fit mx-auto mb-4">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Contact Général</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Questions générales, informations, inscriptions
                </p>
                <Link href="/contact">
                  <Button className="w-full bg-gradient-to-r from-primary to-primary/80 group-hover:scale-105 transition-transform duration-200">
                    Nous contacter
                  </Button>
                </Link>
              </div>

              {/* Support Qualité */}
              <div className="bg-card/50 backdrop-blur-sm rounded-xl p-6 border border-border/50 text-center group hover:shadow-lg transition-all duration-300">
                <div className="p-3 bg-gradient-to-br from-primary/20 to-primary/30 rounded-xl w-fit mx-auto mb-4">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Support Qualité</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Réclamations, suggestions d'amélioration
                </p>
                <Link href="/contact">
                  <Button variant="outline" className="w-full group-hover:scale-105 transition-transform duration-200">
                    Service qualité
                  </Button>
                </Link>
              </div>

              {/* Assistance Téléphonique */}
              <div className="bg-card/50 backdrop-blur-sm rounded-xl p-6 border border-border/50 text-center group hover:shadow-lg transition-all duration-300">
                <div className="p-3 bg-gradient-to-br from-primary/20 to-primary/30 rounded-xl w-fit mx-auto mb-4">
                  <Phone className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Assistance Téléphonique</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Support immédiat pendant les heures d'ouverture
                </p>
                <Button variant="outline" className="w-full group-hover:scale-105 transition-transform duration-200">
                  <Phone className="h-4 w-4 mr-2" />
                  01 23 45 67 89
                </Button>
              </div>
            </div>

            {/* Quick Links */}
            <div className="mt-12 text-center">
              <h3 
                className="text-xl font-semibold text-foreground mb-6"
                data-editable
                data-name="faq.quicklinks.title"
              >
                Liens Utiles
              </h3>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/formations" className="text-primary hover:text-primary/80 underline underline-offset-4">
                  Catalogue des formations
                </Link>
                <Link href="/formateurs" className="text-primary hover:text-primary/80 underline underline-offset-4">
                  Espace formateurs
                </Link>
                <Link href="/a-propos" className="text-primary hover:text-primary/80 underline underline-offset-4">
                  À propos de Syloma
                </Link>
                <Link href="/certifications" className="text-primary hover:text-primary/80 underline underline-offset-4">
                  Nos certifications
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export const getStaticProps: GetStaticProps<FAQPageProps> = async () => {
  console.log('FAQ page getStaticProps');
  const faqs = getCMSData<FAQ>('faq');
  
  return {
    props: {
      initialFaqs: faqs.filter(faq => faq.active)
    }
  };
};

export default FAQPage;
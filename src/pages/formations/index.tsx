import React, { useState, useMemo } from 'react';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { Search, Filter, ChevronDown, Users, Clock, MapPin, Euro, Star } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useCMSData, getCMSData } from '@/hooks/use-data';
import { Formation, Formateur, Thematique } from '@/types/formations';
import { Financement } from '@/types/financements';

interface CatalogPageProps {
  formations: Formation[];
  formateurs: Formateur[];
  thematiques: Thematique[];
  financements: Financement[];
}

export default function CatalogPage({ 
  formations: initialFormations,
  formateurs: initialFormateurs,
  thematiques: initialThematiques,
  financements: initialFinancements
}: CatalogPageProps) {
  // CMS Data with SSG support
  const { data: formations } = useCMSData<Formation>('formations', {}, initialFormations);
  const { data: formateurs } = useCMSData<Formateur>('formateurs', {}, initialFormateurs);
  const { data: thematiques } = useCMSData<Thematique>('thematiques', {}, initialThematiques);
  const { data: financements } = useCMSData<Financement>('financements', {}, initialFinancements);

  // State for filtering and search
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedThematique, setSelectedThematique] = useState('all');
  const [selectedFormateur, setSelectedFormateur] = useState('all');
  const [selectedModalite, setSelectedModalite] = useState('all');
  const [selectedNiveau, setSelectedNiveau] = useState('all');
  const [selectedFinancement, setSelectedFinancement] = useState('all');
  const [sortBy, setSortBy] = useState('titre');
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);

  const itemsPerPage = 9;

  console.log('CatalogPage rendering with', formations?.length || 0, 'formations');

  // Get active formations only
  const activeFormations = useMemo(() => {
    return formations?.filter(formation => formation.active) || [];
  }, [formations]);

  // Filtering logic
  const filteredFormations = useMemo(() => {
    let result = activeFormations;

    // Search filter
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      result = result.filter(formation => 
        formation.titre.toLowerCase().includes(searchLower) ||
        formation.accroche.toLowerCase().includes(searchLower)
      );
    }

    // Thematic filter
    if (selectedThematique !== 'all') {
      result = result.filter(formation => formation.thematique_id === selectedThematique);
    }

    // Formateur filter
    if (selectedFormateur !== 'all') {
      result = result.filter(formation => formation.formateur_id === selectedFormateur);
    }

    // Modalite filter
    if (selectedModalite !== 'all') {
      result = result.filter(formation => 
        formation.modalites.some(modalite => 
          modalite.toLowerCase() === selectedModalite.toLowerCase()
        )
      );
    }

    // Niveau filter
    if (selectedNiveau !== 'all') {
      result = result.filter(formation => formation.niveau === selectedNiveau);
    }

    // Financement filter
    if (selectedFinancement !== 'all') {
      result = result.filter(formation => 
        formation.financements_eligibles?.includes(selectedFinancement)
      );
    }

    return result;
  }, [activeFormations, searchTerm, selectedThematique, selectedFormateur, selectedModalite, selectedNiveau, selectedFinancement]);

  // Sorting logic
  const sortedFormations = useMemo(() => {
    const sorted = [...filteredFormations];
    switch (sortBy) {
      case 'titre':
        return sorted.sort((a, b) => a.titre.localeCompare(b.titre));
      case 'prix':
        return sorted.sort((a, b) => a.prix.amount - b.prix.amount);
      case 'niveau':
        return sorted.sort((a, b) => a.niveau.localeCompare(b.niveau));
      default:
        return sorted;
    }
  }, [filteredFormations, sortBy]);

  // Pagination logic
  const totalPages = Math.ceil(sortedFormations.length / itemsPerPage);
  const paginatedFormations = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return sortedFormations.slice(startIndex, startIndex + itemsPerPage);
  }, [sortedFormations, currentPage]);

  // Helper functions
  const getFormateur = (formateurId: string) => {
    return formateurs?.find(f => f.id === formateurId);
  };

  const getThematique = (thematiqueId: string) => {
    return thematiques?.find(t => t.id === thematiqueId);
  };

  const getFinancementLabels = (financementIds?: string[]) => {
    if (!financementIds || !financements) return [];
    return financementIds
      .map(id => financements.find(f => f.id === id))
      .filter(Boolean)
      .map(f => f!.nom);
  };

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedThematique('all');
    setSelectedFormateur('all');
    setSelectedModalite('all');
    setSelectedNiveau('all');
    setSelectedFinancement('all');
    setCurrentPage(1);
  };

  return (
    <>
      <Head>
        <title>Catalogue des Formations | Syloma</title>
        <meta name="description" content="Découvrez notre offre complète de formations professionnelles certifiées Qualiopi. Management, communication, digital, développement personnel." />
      </Head>

      <Header />

      <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
        {/* Breadcrumb */}
        <div className="border-b border-border/50 bg-background/80 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Link href="/" className="hover:text-primary transition-colors">
                Accueil
              </Link>
              <span>/</span>
              <span className="text-foreground font-medium">Catalogue des formations</span>
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <div className="relative py-16 lg:py-20">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-primary/5"></div>
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 
              className="text-4xl lg:text-5xl font-bold text-foreground mb-6"
              data-editable
              data-name="catalog.hero.title"
            >
              Catalogue des Formations
            </h1>
            <p 
              className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed"
              data-editable
              data-name="catalog.hero.subtitle"
            >
              Explorez notre offre complète de formations professionnelles certifiées Qualiopi. 
              Trouvez la formation qui correspondra parfaitement à vos objectifs de développement.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
              <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-4">
                <div className="text-2xl font-bold text-primary">{activeFormations.length}</div>
                <div className="text-sm text-muted-foreground">Formations disponibles</div>
              </div>
              <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-4">
                <div className="text-2xl font-bold text-primary">{thematiques?.filter(t => t.active).length || 0}</div>
                <div className="text-sm text-muted-foreground">Thématiques</div>
              </div>
              <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-4">
                <div className="text-2xl font-bold text-primary">{formateurs?.filter(f => f.actif).length || 0}</div>
                <div className="text-sm text-muted-foreground">Formateurs experts</div>
              </div>
              <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-4">
                <div className="text-2xl font-bold text-primary">100%</div>
                <div className="text-sm text-muted-foreground">Certifié Qualiopi</div>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardHeader className="pb-4">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                {/* Search Bar */}
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Rechercher une formation..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-background/50"
                  />
                </div>

                <div className="flex items-center space-x-3">
                  {/* Filters Toggle */}
                  <Button
                    variant="outline"
                    onClick={() => setShowFilters(!showFilters)}
                    className="bg-background/50"
                  >
                    <Filter className="h-4 w-4 mr-2" />
                    Filtres
                    <ChevronDown className={`h-4 w-4 ml-2 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
                  </Button>

                  {/* Sort */}
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-48 bg-background/50">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="titre">Trier par nom</SelectItem>
                      <SelectItem value="prix">Trier par prix</SelectItem>
                      <SelectItem value="niveau">Trier par niveau</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>

            {/* Advanced Filters */}
            {showFilters && (
              <CardContent className="pt-0">
                <Separator className="mb-6" />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
                  {/* Thematique Filter */}
                  <Select value={selectedThematique} onValueChange={setSelectedThematique}>
                    <SelectTrigger className="bg-background/50">
                      <SelectValue placeholder="Thématique" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Toutes les thématiques</SelectItem>
                      {thematiques?.filter(t => t.active).map(thematique => (
                        <SelectItem key={thematique.id} value={thematique.id}>
                          {thematique.nom}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {/* Formateur Filter */}
                  <Select value={selectedFormateur} onValueChange={setSelectedFormateur}>
                    <SelectTrigger className="bg-background/50">
                      <SelectValue placeholder="Formateur" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tous les formateurs</SelectItem>
                      {formateurs?.filter(f => f.actif).map(formateur => (
                        <SelectItem key={formateur.id} value={formateur.id}>
                          {formateur.nom}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {/* Modalite Filter */}
                  <Select value={selectedModalite} onValueChange={setSelectedModalite}>
                    <SelectTrigger className="bg-background/50">
                      <SelectValue placeholder="Modalité" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Toutes modalités</SelectItem>
                      <SelectItem value="présentiel">Présentiel</SelectItem>
                      <SelectItem value="distanciel">Distanciel</SelectItem>
                      <SelectItem value="hybride">Hybride</SelectItem>
                    </SelectContent>
                  </Select>

                  {/* Niveau Filter */}
                  <Select value={selectedNiveau} onValueChange={setSelectedNiveau}>
                    <SelectTrigger className="bg-background/50">
                      <SelectValue placeholder="Niveau" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tous niveaux</SelectItem>
                      <SelectItem value="Débutant">Débutant</SelectItem>
                      <SelectItem value="Intermédiaire">Intermédiaire</SelectItem>
                      <SelectItem value="Avancé">Avancé</SelectItem>
                    </SelectContent>
                  </Select>

                  {/* Financement Filter */}
                  <Select value={selectedFinancement} onValueChange={setSelectedFinancement}>
                    <SelectTrigger className="bg-background/50">
                      <SelectValue placeholder="Financement" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tous financements</SelectItem>
                      {financements?.filter(f => f.actif).map(financement => (
                        <SelectItem key={financement.id} value={financement.id}>
                          {financement.nom}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {/* Reset Button */}
                  <Button 
                    variant="outline" 
                    onClick={resetFilters}
                    className="bg-background/50"
                  >
                    Réinitialiser
                  </Button>
                </div>
              </CardContent>
            )}
          </Card>
        </div>

        {/* Results */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          {/* Results Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <p className="text-muted-foreground">
                {filteredFormations.length} formation{filteredFormations.length > 1 ? 's' : ''} trouvée{filteredFormations.length > 1 ? 's' : ''}
              </p>
            </div>
          </div>

          {/* Formations Grid */}
          {paginatedFormations.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-12">
              {paginatedFormations.map(formation => {
                const formateur = getFormateur(formation.formateur_id);
                const thematique = getThematique(formation.thematique_id);
                const financementLabels = getFinancementLabels(formation.financements_eligibles);

                return (
                  <Card 
                    key={formation.id} 
                    className="group hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300 transform hover:-translate-y-1 bg-card/50 backdrop-blur-sm border-border/50 overflow-hidden"
                  >
                    {/* Formation Image */}
                    {formation.image_principale && (
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={formation.image_principale.url}
                          alt={formation.image_principale.alt_text || formation.titre}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                        <div className="absolute top-4 left-4">
                          <Badge 
                            variant="secondary" 
                            className="bg-primary/90 text-primary-foreground"
                          >
                            {thematique?.nom}
                          </Badge>
                        </div>
                        <div className="absolute top-4 right-4">
                          <Badge 
                            variant="outline" 
                            className="bg-background/90 border-border/50"
                          >
                            {formation.niveau}
                          </Badge>
                        </div>
                      </div>
                    )}

                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between space-x-3">
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                            {formation.titre}
                          </h3>
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {formation.accroche}
                          </p>
                        </div>
                      </div>

                      {/* Formateur */}
                      {formateur && (
                        <div className="flex items-center space-x-3 pt-3">
                          {formateur.logo_photo ? (
                            <img
                              src={formateur.logo_photo.url}
                              alt={formateur.logo_photo.alt_text || formateur.nom}
                              className="w-8 h-8 rounded-full object-cover"
                            />
                          ) : (
                            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                              <Users className="h-4 w-4 text-primary" />
                            </div>
                          )}
                          <div className="min-w-0">
                            <p className="text-sm font-medium text-foreground">{formateur.nom}</p>
                          </div>
                        </div>
                      )}
                    </CardHeader>

                    <CardContent className="py-3">
                      {/* Modalites */}
                      <div className="flex flex-wrap gap-1 mb-3">
                        {formation.modalites.map((modalite, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {modalite}
                          </Badge>
                        ))}
                      </div>

                      {/* Infos pratiques */}
                      <div className="space-y-2 text-sm text-muted-foreground">
                        <div className="flex items-center space-x-2">
                          <Clock className="h-4 w-4 flex-shrink-0" />
                          <span className="line-clamp-1">{formation.duree}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <MapPin className="h-4 w-4 flex-shrink-0" />
                          <span className="line-clamp-1">{formation.lieu}</span>
                        </div>
                      </div>

                      {/* Financements eligibles */}
                      {financementLabels.length > 0 && (
                        <div className="mt-3">
                          <p className="text-xs font-medium text-muted-foreground mb-1">Financement :</p>
                          <div className="flex flex-wrap gap-1">
                            {financementLabels.slice(0, 2).map((label, index) => (
                              <Badge key={index} variant="secondary" className="text-xs bg-primary/5 text-primary">
                                {label}
                              </Badge>
                            ))}
                            {financementLabels.length > 2 && (
                              <Badge variant="secondary" className="text-xs">
                                +{financementLabels.length - 2}
                              </Badge>
                            )}
                          </div>
                        </div>
                      )}
                    </CardContent>

                    <CardFooter className="pt-3 flex items-center justify-between">
                      <div>
                        <div className="flex items-center space-x-1">
                          <Euro className="h-4 w-4 text-muted-foreground" />
                          <span className="text-lg font-semibold text-foreground">
                            {formation.prix.amount.toLocaleString('fr-FR')} €
                          </span>
                        </div>
                      </div>

                      <Link href={`/formations/${formation.slug}`}>
                        <Button 
                          size="sm"
                          className="bg-primary hover:bg-primary/90"
                          data-editable
                          data-name="catalog.formation_card.detail_button"
                        >
                          Voir détails
                        </Button>
                      </Link>
                    </CardFooter>
                  </Card>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="max-w-md mx-auto">
                <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search className="h-12 w-12 text-muted-foreground" />
                </div>
                <h3 
                  className="text-xl font-semibold text-foreground mb-2"
                  data-editable
                  data-name="catalog.empty.title"
                >
                  Aucune formation trouvée
                </h3>
                <p 
                  className="text-muted-foreground mb-6"
                  data-editable
                  data-name="catalog.empty.description"
                >
                  Essayez de modifier vos critères de recherche ou réinitialisez les filtres.
                </p>
                <Button onClick={resetFilters} variant="outline">
                  Réinitialiser les filtres
                </Button>
              </div>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center">
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="bg-background/50"
                >
                  Précédent
                </Button>
                
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <Button
                    key={page}
                    variant={page === currentPage ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentPage(page)}
                    className={page === currentPage ? "bg-primary" : "bg-background/50"}
                  >
                    {page}
                  </Button>
                ))}

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="bg-background/50"
                >
                  Suivant
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
}

export const getStaticProps: GetStaticProps<CatalogPageProps> = async () => {
  console.log('Building catalog page with static data');

  const formations = getCMSData<Formation>('formations');
  const formateurs = getCMSData<Formateur>('formateurs');
  const thematiques = getCMSData<Thematique>('thematiques');
  const financements = getCMSData<Financement>('financements');

  return {
    props: {
      formations,
      formateurs,
      thematiques,
      financements
    }
  };
};
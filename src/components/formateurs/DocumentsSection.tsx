import React from 'react';
import { Download, FileText, Shield, Info, BookOpen, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';

const DocumentsSection = () => {
  console.log('DocumentsSection component rendering');

  const documents = [
    {
      icon: FileText,
      title: "Dossier de présentation Syloma",
      description: "Présentation complète de l'organisme, nos services et processus",
      format: "PDF",
      size: "2.1 MB",
      category: "Général"
    },
    {
      icon: Shield,
      title: "Certification Qualiopi",
      description: "Notre certificat Qualiopi officiel et conditions d'usage",
      format: "PDF", 
      size: "1.5 MB",
      category: "Certification"
    },
    {
      icon: BookOpen,
      title: "Guide du formateur partenaire",
      description: "Manuel complet des processus, obligations et bonnes pratiques",
      format: "PDF",
      size: "3.2 MB",
      category: "Guide"
    },
    {
      icon: CreditCard,
      title: "Grille tarifaire et commissions",
      description: "Détail des frais de gestion et exemples de calculs",
      format: "PDF",
      size: "800 KB",
      category: "Tarifs"
    },
    {
      icon: FileText,
      title: "Modèles de documents",
      description: "Templates de CV, fiches pédagogiques et supports qualité",
      format: "ZIP",
      size: "5.1 MB",
      category: "Templates"
    },
    {
      icon: Info,
      title: "FAQ Formateurs détaillée",
      description: "Toutes les réponses aux questions fréquentes des formateurs",
      format: "PDF",
      size: "1.8 MB",
      category: "Support"
    }
  ];

  const handleDownload = (documentTitle: string) => {
    console.log('Downloading document:', documentTitle);
    // Ici on pourrait implémenter la logique de téléchargement réel
    // Pour le moment, on simule juste le clic
  };

  return (
    <section className="py-24 bg-gradient-to-b from-muted/20 to-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 
            className="text-3xl md:text-4xl font-bold text-foreground mb-6"
            data-editable
            data-name="formateurs.documents.title"
          >
            Documentation et ressources
          </h2>
          <p 
            className="text-xl text-muted-foreground leading-relaxed"
            data-editable
            data-name="formateurs.documents.subtitle"
          >
            Téléchargez tous les documents nécessaires pour comprendre notre fonctionnement 
            et préparer votre candidature en tant que formateur partenaire.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {documents.map((doc, index) => (
            <div 
              key={index}
              className="group bg-card/50 backdrop-blur-sm rounded-2xl p-6 border border-border/50 hover:border-primary/30 transition-all duration-500 hover:shadow-lg hover:shadow-primary/10"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0 p-3 bg-primary/10 rounded-xl group-hover:bg-primary/20 transition-colors duration-300">
                    <doc.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <span className="inline-flex items-center px-2 py-1 bg-secondary/50 text-secondary-foreground text-xs rounded-full">
                      {doc.category}
                    </span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <h3 className="text-lg font-semibold text-foreground mb-3">
                {doc.title}
              </h3>
              
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                {doc.description}
              </p>

              {/* Metadata */}
              <div className="flex items-center justify-between text-xs text-muted-foreground mb-6">
                <span className="bg-muted/50 px-2 py-1 rounded">
                  {doc.format}
                </span>
                <span>{doc.size}</span>
              </div>

              {/* Download Button */}
              <Button 
                onClick={() => handleDownload(doc.title)}
                className="w-full bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                variant="outline"
              >
                <Download className="h-4 w-4 mr-2" />
                Télécharger
              </Button>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Info */}
          <div className="bg-gradient-to-r from-card/50 to-card/30 backdrop-blur-sm rounded-2xl p-8 border border-border/50">
            <h3 
              className="text-xl font-bold text-foreground mb-4"
              data-editable
              data-name="formateurs.documents.contact_title"
            >
              Besoin d'accompagnement ?
            </h3>
            <p 
              className="text-muted-foreground mb-6 leading-relaxed"
              data-editable
              data-name="formateurs.documents.contact_description"
            >
              Notre équipe est disponible pour répondre à toutes vos questions 
              et vous accompagner dans votre démarche d'adhésion.
            </p>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-3">
                <span className="w-2 h-2 bg-primary rounded-full"></span>
                <span 
                  className="text-muted-foreground"
                  data-editable
                  data-name="formateurs.documents.contact_email"
                >
                  formateurs@syloma.fr
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="w-2 h-2 bg-primary rounded-full"></span>
                <span 
                  className="text-muted-foreground"
                  data-editable
                  data-name="formateurs.documents.contact_phone"
                >
                  +33 1 23 45 67 89
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="w-2 h-2 bg-primary rounded-full"></span>
                <span 
                  className="text-muted-foreground"
                  data-editable
                  data-name="formateurs.documents.contact_hours"
                >
                  Du lundi au vendredi, 9h-18h
                </span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="bg-gradient-to-r from-primary/5 to-primary/10 backdrop-blur-sm rounded-2xl p-8 border border-primary/20">
            <h3 
              className="text-xl font-bold text-foreground mb-4"
              data-editable
              data-name="formateurs.documents.links_title"
            >
              Liens utiles
            </h3>
            <div className="space-y-4">
              <a 
                href="#adhesion" 
                className="flex items-center space-x-3 text-muted-foreground hover:text-primary transition-colors duration-300"
              >
                <span className="w-2 h-2 bg-current rounded-full"></span>
                <span>Formulaire d'adhésion</span>
              </a>
              <a 
                href="/faq" 
                className="flex items-center space-x-3 text-muted-foreground hover:text-primary transition-colors duration-300"
              >
                <span className="w-2 h-2 bg-current rounded-full"></span>
                <span>FAQ Formateurs</span>
              </a>
              <a 
                href="/a-propos" 
                className="flex items-center space-x-3 text-muted-foreground hover:text-primary transition-colors duration-300"
              >
                <span className="w-2 h-2 bg-current rounded-full"></span>
                <span>À propos de Syloma</span>
              </a>
              <a 
                href="/formations" 
                className="flex items-center space-x-3 text-muted-foreground hover:text-primary transition-colors duration-300"
              >
                <span className="w-2 h-2 bg-current rounded-full"></span>
                <span>Catalogue des formations</span>
              </a>
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-primary/10 to-primary/20 rounded-2xl p-8 backdrop-blur-sm border border-primary/20">
            <h3 
              className="text-2xl font-bold text-foreground mb-4"
              data-editable
              data-name="formateurs.documents.final_cta_title"
            >
              Prêt à nous rejoindre ?
            </h3>
            <p 
              className="text-lg text-muted-foreground mb-6"
              data-editable
              data-name="formateurs.documents.final_cta_description"
            >
              Consultez nos documents et lancez-vous dans l'aventure Syloma
            </p>
            <Button 
              asChild
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 px-8"
            >
              <a href="#adhesion">
                <span data-editable data-name="formateurs.documents.final_cta_button">
                  Commencer ma candidature
                </span>
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DocumentsSection;
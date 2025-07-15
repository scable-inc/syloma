import React from 'react';
import { Search, FileText, GraduationCap, CreditCard, CheckCircle, Users } from 'lucide-react';

const ProcessusSection = () => {
  console.log('ProcessusSection component rendering');

  const etapes = [
    {
      numero: 1,
      icon: Search,
      titre: "Vous trouvez vos clients",
      description: "Prospectez librement selon vos méthodes. Négociez vos tarifs et conditions. Vous restez totalement autonome sur votre activité commerciale.",
      details: [
        "Liberté commerciale totale",
        "Fixation libre de vos tarifs",
        "Négociation directe avec vos clients",
        "Accompagnement commercial si souhaité"
      ]
    },
    {
      numero: 2,
      icon: FileText,
      titre: "Nous gérons la convention",
      description: "Dès validation de votre client, Syloma édite automatiquement tous les documents légaux conformes Qualiopi.",
      details: [
        "Convention de formation automatique",
        "Programme détaillé conforme",
        "Documents administratifs complets",
        "Validation juridique incluse"
      ]
    },
    {
      numero: 3,
      icon: GraduationCap,
      titre: "Vous dispensez la formation",
      description: "Concentrez-vous sur votre expertise pédagogique. Nous fournissons tous les supports qualité nécessaires.",
      details: [
        "Supports de suivi fournis",
        "Feuilles d'émargement conformes",
        "Grilles d'évaluation standardisées",
        "Assistance technique si besoin"
      ]
    },
    {
      numero: 4,
      icon: CreditCard,
      titre: "Facturation & Règlement",
      description: "Syloma facture directement le client final. Vous nous refacturez votre prestation. Règlement garanti sous 30 jours.",
      details: [
        "Facturation client par Syloma",
        "Gestion des financements OPCO/CPF",
        "Refacturation simple de votre part",
        "Paiement sécurisé sous 30 jours"
      ]
    }
  ];

  const benefices = [
    {
      icon: CheckCircle,
      titre: "Aucune charge administrative",
      description: "Plus de gestion documentaire, de suivi qualité ou d'obligations réglementaires"
    },
    {
      icon: Users,
      titre: "Réseau professionnel",
      description: "Accès à une communauté de formateurs experts pour enrichir vos compétences"
    },
    {
      icon: Search,
      titre: "Autonomie préservée",
      description: "Vous gardez la maîtrise totale de votre prospection et de vos relations clients"
    }
  ];

  return (
    <section id="processus" className="py-24 bg-gradient-to-b from-background to-muted/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 
            className="text-3xl md:text-4xl font-bold text-foreground mb-6"
            data-editable
            data-name="formateurs.processus.title"
          >
            Comment ça fonctionne ?
          </h2>
          <p 
            className="text-xl text-muted-foreground leading-relaxed"
            data-editable
            data-name="formateurs.processus.subtitle"
          >
            Un processus simple et transparent qui vous libère de toute contrainte administrative 
            tout en vous donnant accès aux financements publics.
          </p>
        </div>

        {/* Étapes */}
        <div className="space-y-16 mb-20">
          {etapes.map((etape, index) => (
            <div 
              key={index}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
              }`}
            >
              {/* Contenu */}
              <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                <div className="flex items-center space-x-4 mb-6">
                  <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground rounded-2xl text-xl font-bold">
                    {etape.numero}
                  </div>
                  <h3 className="text-2xl font-bold text-foreground">
                    {etape.titre}
                  </h3>
                </div>

                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                  {etape.description}
                </p>

                <ul className="space-y-3">
                  {etape.details.map((detail, detailIndex) => (
                    <li key={detailIndex} className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Visual */}
              <div className={index % 2 === 1 ? 'lg:col-start-1' : ''}>
                <div className="relative bg-gradient-to-br from-primary/10 to-primary/20 rounded-3xl p-12 backdrop-blur-sm border border-primary/20">
                  <div className="flex items-center justify-center w-24 h-24 bg-primary/20 rounded-2xl mx-auto mb-6">
                    <etape.icon className="h-12 w-12 text-primary" />
                  </div>
                  
                  {/* Decorative Elements */}
                  <div className="absolute -top-6 -right-6 w-12 h-12 bg-secondary/30 rounded-full blur-lg"></div>
                  <div className="absolute -bottom-4 -left-4 w-8 h-8 bg-primary/30 rounded-full blur-md"></div>
                  
                  {/* Step connector */}
                  {index < etapes.length - 1 && (
                    <div className="hidden lg:block absolute -bottom-8 left-1/2 transform -translate-x-1/2">
                      <div className="w-0.5 h-16 bg-gradient-to-b from-primary/50 to-transparent"></div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bénéfices */}
        <div className="bg-gradient-to-r from-card/50 to-card/30 backdrop-blur-sm rounded-3xl p-8 lg:p-12 border border-border/50">
          <h3 
            className="text-2xl font-bold text-foreground text-center mb-12"
            data-editable
            data-name="formateurs.processus.benefits_title"
          >
            Vos bénéfices concrets
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefices.map((benefice, index) => (
              <div key={index} className="text-center space-y-4">
                <div className="flex items-center justify-center w-16 h-16 bg-primary/10 rounded-2xl mx-auto">
                  <benefice.icon className="h-8 w-8 text-primary" />
                </div>
                <h4 className="text-xl font-semibold text-foreground">
                  {benefice.titre}
                </h4>
                <p className="text-muted-foreground leading-relaxed">
                  {benefice.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Refacturation Details */}
        <div className="mt-16 bg-gradient-to-r from-primary/5 to-primary/10 rounded-2xl p-8 border border-primary/20">
          <h3 
            className="text-2xl font-bold text-foreground mb-6"
            data-editable
            data-name="formateurs.processus.refacturation_title"
          >
            Système de refacturation transparent
          </h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h4 className="text-lg font-semibold text-foreground mb-4">Comment ça marche :</h4>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start space-x-3">
                  <span className="flex-shrink-0 w-2 h-2 bg-primary rounded-full mt-2"></span>
                  <span>Syloma facture le client final (entreprise, OPCO, CPF...)</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="flex-shrink-0 w-2 h-2 bg-primary rounded-full mt-2"></span>
                  <span>Vous émettez une facture HT vers Syloma pour votre prestation</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="flex-shrink-0 w-2 h-2 bg-primary rounded-full mt-2"></span>
                  <span>Règlement garanti sous 30 jours maximum</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="flex-shrink-0 w-2 h-2 bg-primary rounded-full mt-2"></span>
                  <span>Commission transparente communiquée dès l'adhésion</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-card/50 rounded-xl p-6 border border-border/50">
              <h4 className="text-lg font-semibold text-foreground mb-4">Vos avantages :</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>✓ Aucune gestion de recouvrement</li>
                <li>✓ Pas de risque d'impayés</li>
                <li>✓ Optimisation fiscale automatique</li>
                <li>✓ TVA exonérée selon réglementation</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessusSection;
import React from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin, ExternalLink } from 'lucide-react';

const Footer = () => {
  console.log('Footer component rendering');

  const footerSections = [
    {
      title: 'Formation',
      links: [
        { label: 'Catalogue', href: '/formations' },
        { label: 'Financement', href: '/financement' },
        { label: 'Modalités', href: '/modalites' },
        { label: 'Accessibilité', href: '/accessibilite' }
      ]
    },
    {
      title: 'Organisme',
      links: [
        { label: 'À propos', href: '/a-propos' },
        { label: 'Certifications', href: '/certifications' },
        { label: 'Qualité', href: '/qualite' },
        { label: 'Témoignages', href: '/temoignages' }
      ]
    },
    {
      title: 'Formateurs',
      links: [
        { label: 'Rejoindre Syloma', href: '/formateurs' },
        { label: 'Avantages', href: '/formateurs#avantages' },
        { label: 'Processus', href: '/formateurs#processus' },
        { label: 'Support', href: '/formateurs#support' }
      ]
    },
    {
      title: 'Support',
      links: [
        { label: 'FAQ', href: '/faq' },
        { label: 'Contact', href: '/contact' },
        { label: 'Aide', href: '/aide' },
        { label: 'Documents', href: '/documents' }
      ]
    }
  ];

  const certifications = [
    { name: 'Qualiopi', logo: '🎖️' },
    { name: 'Audit Véritas', logo: '✅' },
    { name: 'DataDock', logo: '📋' }
  ];

  return (
    <footer className="bg-gradient-to-br from-background via-muted/30 to-background border-t border-border/50">
      {/* Newsletter Section */}
      <div className="border-b border-border/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-2xl p-8 backdrop-blur-sm border border-primary/10">
            <div className="text-center max-w-2xl mx-auto">
              <h3 
                className="text-2xl font-bold text-foreground mb-4"
                data-editable
                data-name="homepage.footer.newsletter_title"
              >
                Restez informé de nos nouveautés
              </h3>
              <p 
                className="text-muted-foreground mb-6"
                data-editable
                data-name="homepage.footer.newsletter_description"
              >
                Recevez nos dernières formations, actualités qualité et conseils en formation professionnelle.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Votre adresse email"
                  className="flex-1 px-4 py-3 bg-background/70 backdrop-blur-sm border border-border/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-300"
                  data-editable
                  data-name="homepage.footer.newsletter_input_placeholder"
                />
                <button 
                  className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors duration-300 font-medium"
                  data-editable
                  data-name="homepage.footer.newsletter_button"
                >
                  S&#39;inscrire
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary/70 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-xl">S</span>
              </div>
              <div className="flex flex-col">
                <span 
                  className="text-xl font-bold text-foreground"
                  data-editable
                  data-name="homepage.footer.logo_text"
                >
                  Syloma
                </span>
                <span 
                  className="text-sm text-muted-foreground"
                  data-editable
                  data-name="homepage.footer.logo_subtitle"
                >
                  Organisme de formation
                </span>
              </div>
            </Link>
            
            <p 
              className="text-muted-foreground mb-6 leading-relaxed"
              data-editable
              data-name="homepage.footer.company_description"
            >
              Votre organisme de formation de confiance, certifié Qualiopi. 
              Nous accompagnons stagiaires et formateurs dans l&#39;excellence pédagogique.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-muted-foreground hover:text-primary transition-colors duration-300">
                <Mail size={18} />
                <span data-editable data-name="homepage.footer.email">contact@syloma.fr</span>
              </div>
              <div className="flex items-center space-x-3 text-muted-foreground hover:text-primary transition-colors duration-300">
                <Phone size={18} />
                <span data-editable data-name="homepage.footer.phone">+33 1 23 45 67 89</span>
              </div>
              <div className="flex items-center space-x-3 text-muted-foreground hover:text-primary transition-colors duration-300">
                <MapPin size={18} />
                <span data-editable data-name="homepage.footer.address">Paris, France</span>
              </div>
            </div>
          </div>

          {/* Navigation Sections */}
          {footerSections.map((section, index) => (
            <div key={index}>
              <h4 className="font-semibold text-foreground mb-4">{section.title}</h4>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      href={link.href}
                      className="text-muted-foreground hover:text-primary transition-colors duration-300 text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Certifications */}
        <div className="mt-16 pt-8 border-t border-border/50">
          <div className="flex flex-col lg:flex-row items-center justify-between space-y-6 lg:space-y-0">
            <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-8">
              <span 
                className="text-sm font-medium text-foreground"
                data-editable
                data-name="homepage.footer.certifications_label"
              >
                Nos certifications :
              </span>
              <div className="flex items-center space-x-6">
                {certifications.map((cert, index) => (
                  <div key={index} className="flex items-center space-x-2 text-muted-foreground">
                    <span className="text-lg">{cert.logo}</span>
                    <span className="text-sm font-medium">{cert.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Legal Links */}
            <div className="flex items-center space-x-6 text-sm">
              <Link href="/mentions-legales" className="text-muted-foreground hover:text-primary transition-colors duration-300">
                Mentions légales
              </Link>
              <Link href="/politique-confidentialite" className="text-muted-foreground hover:text-primary transition-colors duration-300">
                Confidentialité
              </Link>
              <Link href="/cgv" className="text-muted-foreground hover:text-primary transition-colors duration-300">
                CGV
              </Link>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-8 pt-8 border-t border-border/30 text-center">
            <p 
              className="text-sm text-muted-foreground"
              data-editable
              data-name="homepage.footer.copyright"
            >
              © 2025 Syloma. Tous droits réservés. | ORGANISME DE FORMATION CERTIFIÉ QUALIOPI
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
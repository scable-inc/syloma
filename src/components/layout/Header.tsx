import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigationItems = [
    { label: 'Accueil', href: '/' },
    { label: 'Formations', href: '/formations' },
    { label: 'À propos', href: '/a-propos' },
    { label: 'Formateurs', href: '/formateurs' },
    { label: 'FAQ', href: '/faq' }
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  console.log('Header component rendering, isScrolled:', isScrolled, 'isMenuOpen:', isMenuOpen);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-background/80 backdrop-blur-xl border-b border-border/50 shadow-lg'
          : 'bg-transparent'
      }`}
      data-editable
      data-name="homepage.header.container"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/70 rounded-xl flex items-center justify-center transform group-hover:scale-105 transition-transform duration-300">
                <span className="text-white font-bold text-lg">S</span>
              </div>
              <div className="absolute inset-0 bg-primary/30 rounded-xl blur-lg group-hover:animate-pulse"></div>
            </div>
            <div className="flex flex-col">
              <span 
                className="text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300"
                data-editable
                data-name="homepage.header.logo_text"
              >
                Syloma
              </span>
              <span 
                className="text-xs text-muted-foreground hidden sm:block"
                data-editable
                data-name="homepage.header.logo_subtitle"
              >
                Organisme de formation
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navigationItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className="relative px-4 py-2 text-foreground hover:text-primary transition-all duration-300 group"
              >
                <span className="relative z-10">{item.label}</span>
                <div className="absolute inset-0 bg-primary/10 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-95 group-hover:scale-100"></div>
              </Link>
            ))}
          </nav>

          {/* CTA Buttons - Desktop */}
          <div className="hidden lg:flex items-center space-x-3">
            <Link href="/contact">
              <Button 
                variant="outline" 
                size="sm"
                className="bg-background/50 backdrop-blur-sm hover:bg-primary/10 border-primary/20"
                data-editable
                data-name="homepage.header.contact_button"
              >
                Contact
              </Button>
            </Link>
            <Link href="/formations">
              <Button 
                size="sm"
                className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg hover:shadow-primary/25 transition-all duration-300"
                data-editable
                data-name="homepage.header.catalog_button"
              >
                Catalogue
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="lg:hidden p-2 text-foreground hover:text-primary transition-colors duration-300"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`lg:hidden transition-all duration-500 overflow-hidden ${
            isMenuOpen ? 'max-h-96 opacity-100 pb-6' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="pt-4 space-y-2">
            {navigationItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className="block px-4 py-3 text-foreground hover:text-primary hover:bg-primary/5 rounded-lg transition-all duration-300"
              >
                {item.label}
              </Link>
            ))}
            
            {/* Mobile CTA Buttons */}
            <div className="pt-4 space-y-3 px-4">
              <Link href="/contact" onClick={() => setIsMenuOpen(false)}>
                <Button 
                  variant="outline" 
                  className="w-full bg-background/50 backdrop-blur-sm hover:bg-primary/10 border-primary/20"
                  data-editable
                  data-name="homepage.header.mobile_contact_button"
                >
                  Contact
                </Button>
              </Link>
              <Link href="/formations" onClick={() => setIsMenuOpen(false)}>
                <Button 
                  className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
                  data-editable
                  data-name="homepage.header.mobile_catalog_button"
                >
                  Catalogue des formations
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
    </header>
  );
};

export default Header;
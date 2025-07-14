import React from 'react';
import Head from 'next/head';
import { GetStaticProps } from 'next';
import { useCMSData, getCMSData } from '@/hooks/use-data';
import { Certification, Temoignage } from '@/types/formations';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/home/HeroSection';
import QualitySection from '@/components/home/QualitySection';
import CertificationsSection from '@/components/home/CertificationsSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import StatsSection from '@/components/home/StatsSection';
import { Toaster } from '@/components/ui/toaster';

interface HomePageProps {
  certifications: Certification[];
  temoignages: Temoignage[];
}

const HomePage: React.FC<HomePageProps> = ({ 
  certifications: initialCertifications, 
  temoignages: initialTemoignages 
}) => {
  console.log('HomePage rendering with initial data');
  console.log('Initial certifications:', initialCertifications?.length || 0);
  console.log('Initial témoignages:', initialTemoignages?.length || 0);

  // Client-side data hydration (MANDATORY pattern)
  const { data: certifications } = useCMSData<Certification>('certifications', {}, initialCertifications);
  const { data: temoignages } = useCMSData<Temoignage>('temoignages', {
    filters: { approuve: true },
    sortBy: 'ordre',
    sortOrder: 'asc'
  }, initialTemoignages);

  console.log('Client-side certifications:', certifications?.length || 0);
  console.log('Client-side témoignages:', temoignages?.length || 0);

  return (
    <>
      <Head>
        <title>Syloma - Organisme de Formation Professionnelle Certifié Qualiopi</title>
        <meta 
          name="description" 
          content="Syloma, votre organisme de formation de confiance. Certification Qualiopi garantie, accompagnement complet pour stagiaires et formateurs. Formations éligibles CPF et OPCO." 
        />
        <meta name="keywords" content="formation professionnelle, organisme formation, Qualiopi, CPF, OPCO, certification, formateur, stagiaire" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Syloma - Formation Professionnelle Certifiée Qualiopi" />
        <meta property="og:description" content="Organisme de formation de référence avec certification Qualiopi. Support administratif complet pour formateurs et stagiaires." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://syloma.fr" />
        <meta property="og:image" content="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=630&q=80" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Syloma - Formation Professionnelle Certifiée" />
        <meta name="twitter:description" content="Organisme de formation Qualiopi. Accompagnement complet pour formateurs et stagiaires." />
        <meta name="twitter:image" content="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=630&q=80" />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "EducationalOrganization",
              "name": "Syloma",
              "description": "Organisme de formation professionnelle certifié Qualiopi",
              "url": "https://syloma.fr",
              "logo": "https://syloma.fr/logo.png",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Paris",
                "addressCountry": "FR"
              },
              "telephone": "+33123456789",
              "email": "contact@syloma.fr",
              "accreditation": "Qualiopi",
              "offers": {
                "@type": "EducationalOccupationalProgram",
                "name": "Formation professionnelle continue",
                "provider": "Syloma"
              }
            })
          }}
        />
        
        <link rel="canonical" href="https://syloma.fr" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="min-h-screen bg-background" data-editable data-name="homepage.container">
        {/* Header */}
        <Header />

        {/* Main Content */}
        <main className="relative">
          {/* Hero Section */}
          <HeroSection />

          {/* Quality Section */}
          <QualitySection />

          {/* Certifications Section */}
          <CertificationsSection />

          {/* Statistics Section */}
          <StatsSection />

          {/* Testimonials Section */}
          <TestimonialsSection />
        </main>

        {/* Footer */}
        <Footer />

        {/* Toast Notifications */}
        <Toaster />
      </div>
    </>
  );
};

export const getStaticProps: GetStaticProps<HomePageProps> = async () => {
  console.log('getStaticProps: Fetching homepage data');

  try {
    // Fetch certifications
    const certifications = getCMSData<Certification>('certifications')
      .filter(cert => cert.active)
      .sort((a, b) => (a.ordre || 0) - (b.ordre || 0));

    // Fetch approved testimonials
    const temoignages = getCMSData<Temoignage>('temoignages')
      .filter(temoignage => temoignage.approuve)
      .sort((a, b) => (a.ordre || 0) - (b.ordre || 0));

    console.log('getStaticProps: Successfully fetched data');
    console.log('Certifications:', certifications.length);
    console.log('Témoignages:', temoignages.length);

    return {
      props: {
        certifications,
        temoignages
      }
    };
  } catch (error) {
    console.error('getStaticProps: Error fetching homepage data:', error);
    
    return {
      props: {
        certifications: [],
        temoignages: []
      }
    };
  }
};

export default HomePage;
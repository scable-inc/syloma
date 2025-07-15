import React from 'react';
import Head from 'next/head';
import { GetStaticProps } from 'next';
import { useCMSData, getCMSData } from '@/hooks/use-data';
import { Temoignage } from '@/types/temoignages';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import FormateurHeroSection from '@/components/formateurs/FormateurHeroSection';
import AvantagesSection from '@/components/formateurs/AvantagesSection';
import ProcessusSection from '@/components/formateurs/ProcessusSection';
import TestimonialsSection from '@/components/formateurs/TestimonialsSection';
import AdhesionForm from '@/components/formateurs/AdhesionForm';
import DocumentsSection from '@/components/formateurs/DocumentsSection';

interface FormateursPageProps {
  temoignages: Temoignage[];
}

export default function FormateursPage({ temoignages: initialTemoignages }: FormateursPageProps) {
  const { data: temoignages } = useCMSData<Temoignage>('temoignages', {
    filters: { type: 'Formateur', approuve: true },
    sortBy: 'ordre',
    sortOrder: 'asc'
  }, initialTemoignages);

  console.log('Formateurs page rendering with', temoignages?.length, 'testimonials');

  return (
    <>
      <Head>
        <title>Rejoindre Syloma - Espace Formateurs | Organisme de Formation</title>
        <meta 
          name="description" 
          content="Rejoignez Syloma et bénéficiez de la certification Qualiopi sans charge administrative. Accès aux financements CPF, OPCO. Processus simplifié pour formateurs indépendants." 
        />
        <meta name="keywords" content="formateur indépendant, certification Qualiopi, financement formation, CPF, OPCO, organisme formation" />
        <meta property="og:title" content="Rejoindre Syloma - Espace Formateurs" />
        <meta property="og:description" content="Certification Qualiopi sans charge administrative pour formateurs" />
      </Head>

      <Header />
      
      <main>
        <FormateurHeroSection />
        <AvantagesSection />
        <ProcessusSection />
        {temoignages && temoignages.length > 0 && (
          <TestimonialsSection temoignages={temoignages} />
        )}
        <AdhesionForm />
        <DocumentsSection />
      </main>

      <Footer />
    </>
  );
}

export const getStaticProps: GetStaticProps<FormateursPageProps> = async () => {
  const allTemoignages = getCMSData<Temoignage>('temoignages');
  const temoignages = allTemoignages.filter(t => t.type === 'Formateur' && t.approuve === true)
    .sort((a, b) => (a.ordre || 0) - (b.ordre || 0));

  console.log('Static props generated with', temoignages.length, 'formateur testimonials');

  return {
    props: {
      temoignages
    }
  };
};
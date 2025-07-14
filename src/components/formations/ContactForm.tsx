import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { useCreateCMSItem } from '@/hooks/use-data';
import { DemandeContact } from '@/types/contacts';
import { toast } from '@/hooks/use-toast';
import { Send, Loader2 } from 'lucide-react';

const formSchema = z.object({
  prenom: z.string().min(2, 'Le prénom doit contenir au moins 2 caractères'),
  nom: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
  email: z.string().email('Adresse email invalide'),
  telephone: z.string().optional(),
  entreprise: z.string().optional(),
  type_demande: z.string().min(1, 'Veuillez sélectionner un type de demande'),
  message: z.string().min(10, 'Le message doit contenir au moins 10 caractères'),
});

type FormValues = z.infer<typeof formSchema>;

interface ContactFormProps {
  formationId: string;
  formationTitre: string;
}

const ContactForm = ({ formationId, formationTitre }: ContactFormProps) => {
  console.log('ContactForm rendering for formation:', formationId, formationTitre);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prenom: '',
      nom: '',
      email: '',
      telephone: '',
      entreprise: '',
      type_demande: '',
      message: `Je souhaite obtenir des informations sur la formation "${formationTitre}".`
    }
  });

  const { mutate: createContact, isLoading } = useCreateCMSItem<DemandeContact>('demandes_contact');

  const onSubmit = (values: FormValues) => {
    console.log('Submitting contact form:', values);

    const contactData: Omit<DemandeContact, 'id' | 'created_at' | 'updated_at'> = {
      ...values,
      formation_id: formationId,
      statut: 'Nouveau',
      priorite: 'Normale'
    };

    createContact(contactData, {
      onSuccess: () => {
        console.log('Contact form submitted successfully');
        toast({
          title: 'Message envoyé !',
          description: 'Nous vous recontacterons dans les plus brefs délais.',
        });
        form.reset();
      },
      onError: (error) => {
        console.error('Error submitting contact form:', error);
        toast({
          title: 'Erreur',
          description: 'Une erreur est survenue lors de l\'envoi du message.',
          variant: 'destructive',
        });
      }
    });
  };

  return (
    <div className="bg-card rounded-xl border border-border p-6">
      <div className="text-center mb-6">
        <h3 
          className="text-lg font-semibold text-foreground mb-2"
          data-editable
          data-name="formation_detail.contact.title"
        >
          Demande d&#39;information
        </h3>
        <p 
          className="text-sm text-muted-foreground"
          data-editable
          data-name="formation_detail.contact.description"
        >
          Intéressé par cette formation ? Contactez-nous pour plus d&#39;informations.
        </p>
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              Prénom *
            </label>
            <input
              {...form.register('prenom')}
              type="text"
              className="w-full px-3 py-2 text-sm bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-300"
              placeholder="Votre prénom"
            />
            {form.formState.errors.prenom && (
              <p className="text-xs text-destructive mt-1">
                {form.formState.errors.prenom.message}
              </p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              Nom *
            </label>
            <input
              {...form.register('nom')}
              type="text"
              className="w-full px-3 py-2 text-sm bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-300"
              placeholder="Votre nom"
            />
            {form.formState.errors.nom && (
              <p className="text-xs text-destructive mt-1">
                {form.formState.errors.nom.message}
              </p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-1">
            Email *
          </label>
          <input
            {...form.register('email')}
            type="email"
            className="w-full px-3 py-2 text-sm bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-300"
            placeholder="votre@email.com"
          />
          {form.formState.errors.email && (
            <p className="text-xs text-destructive mt-1">
              {form.formState.errors.email.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-1">
            Téléphone
          </label>
          <input
            {...form.register('telephone')}
            type="tel"
            className="w-full px-3 py-2 text-sm bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-300"
            placeholder="06 12 34 56 78"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-1">
            Entreprise
          </label>
          <input
            {...form.register('entreprise')}
            type="text"
            className="w-full px-3 py-2 text-sm bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-300"
            placeholder="Nom de votre entreprise"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-1">
            Type de demande *
          </label>
          <select
            {...form.register('type_demande')}
            className="w-full px-3 py-2 text-sm bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-300"
          >
            <option value="">Choisir...</option>
            <option value="Information">Demande d&#39;information</option>
            <option value="Inscription">Demande d&#39;inscription</option>
            <option value="Devis">Demande de devis</option>
            <option value="Autre">Autre demande</option>
          </select>
          {form.formState.errors.type_demande && (
            <p className="text-xs text-destructive mt-1">
              {form.formState.errors.type_demande.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-1">
            Message *
          </label>
          <textarea
            {...form.register('message')}
            rows={4}
            className="w-full px-3 py-2 text-sm bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-300 resize-none"
            placeholder="Détaillez votre demande..."
          />
          {form.formState.errors.message && (
            <p className="text-xs text-destructive mt-1">
              {form.formState.errors.message.message}
            </p>
          )}
        </div>

        <Button 
          type="submit" 
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 transition-all duration-300"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Envoi en cours...
            </>
          ) : (
            <>
              <Send className="mr-2 h-4 w-4" />
              Envoyer ma demande
            </>
          )}
        </Button>

        <p 
          className="text-xs text-muted-foreground text-center mt-3"
          data-editable
          data-name="formation_detail.contact.privacy_notice"
        >
          Vos données sont traitées de manière confidentielle et ne seront utilisées que pour répondre à votre demande.
        </p>
      </form>
    </div>
  );
};

export default ContactForm;
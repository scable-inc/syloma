import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useCreateCMSItem } from '@/hooks/use-data';
import { AdhesionFormateur } from '@/types/contacts';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from '@/hooks/use-toast';
import { Send, Plus, X, Upload } from 'lucide-react';

const formSchema = z.object({
  nom: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  prenom: z.string().min(2, "Le prénom doit contenir au moins 2 caractères"),
  email: z.string().email("Adresse email invalide"),
  telephone: z.string().min(10, "Numéro de téléphone invalide"),
  entreprise: z.string().optional(),
  siret: z.string().optional(),
  specialites: z.array(z.string()).min(1, "Veuillez sélectionner au moins une spécialité"),
  experience: z.string().min(50, "Veuillez décrire votre expérience (minimum 50 caractères)"),
  certifications_detenues: z.array(z.string()).optional(),
  site_web: z.string().url("URL invalide").optional().or(z.literal("")),
  linkedin: z.string().url("URL LinkedIn invalide").optional().or(z.literal("")),
  type_demande: z.string().min(1, "Veuillez sélectionner le type de demande"),
  message: z.string().optional(),
  acceptation_cgv: z.boolean().refine(val => val === true, "Vous devez accepter les conditions générales"),
  newsletter: z.boolean().optional()
});

type FormValues = z.infer<typeof formSchema>;

const AdhesionForm = () => {
  console.log('AdhesionForm component rendering');

  const [customSpecialites, setCustomSpecialites] = useState<string[]>([]);
  const [customCertifications, setCustomCertifications] = useState<string[]>([]);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nom: "",
      prenom: "",
      email: "",
      telephone: "",
      entreprise: "",
      siret: "",
      specialites: [],
      experience: "",
      certifications_detenues: [],
      site_web: "",
      linkedin: "",
      type_demande: "",
      message: "",
      acceptation_cgv: false,
      newsletter: false
    }
  });

  const { mutate: createAdhesion, isLoading } = useCreateCMSItem<AdhesionFormateur>('adhesions_formateurs');

  const specialitesPredefinis = [
    "Management et Leadership",
    "Communication Professionnelle", 
    "Informatique et Digital",
    "Développement Personnel",
    "Comptabilité et Finance",
    "Vente et Marketing",
    "Ressources Humaines",
    "Qualité et Sécurité",
    "Langues étrangères",
    "Bureautique",
    "Autre"
  ];

  const certificationsPredefinies = [
    "Certification Coach ICC",
    "Master RH",
    "CISSP",
    "Certification Microsoft",
    "Certification PCC ICF",
    "Praticien PNL",
    "Qualiopi Formateur",
    "Autre"
  ];

  const addCustomSpecialite = (value: string) => {
    if (value.trim() && !customSpecialites.includes(value.trim())) {
      const newSpecialites = [...customSpecialites, value.trim()];
      setCustomSpecialites(newSpecialites);
      const currentValues = form.getValues('specialites');
      form.setValue('specialites', [...currentValues, value.trim()]);
    }
  };

  const addCustomCertification = (value: string) => {
    if (value.trim() && !customCertifications.includes(value.trim())) {
      const newCertifications = [...customCertifications, value.trim()];
      setCustomCertifications(newCertifications);
      const currentValues = form.getValues('certifications_detenues') || [];
      form.setValue('certifications_detenues', [...currentValues, value.trim()]);
    }
  };

  const removeCustomSpecialite = (index: number) => {
    const removedItem = customSpecialites[index];
    setCustomSpecialites(customSpecialites.filter((_, i) => i !== index));
    const currentValues = form.getValues('specialites');
    form.setValue('specialites', currentValues.filter(item => item !== removedItem));
  };

  const removeCustomCertification = (index: number) => {
    const removedItem = customCertifications[index];
    setCustomCertifications(customCertifications.filter((_, i) => i !== index));
    const currentValues = form.getValues('certifications_detenues') || [];
    form.setValue('certifications_detenues', currentValues.filter(item => item !== removedItem));
  };

  const onSubmit = (values: FormValues) => {
    console.log('Submitting adhesion form:', values);

    const formattedData = {
      ...values,
      specialites: values.specialites,
      certifications_detenues: values.certifications_detenues || [],
      experience: `<p>${values.experience.replace(/\n/g, '</p><p>')}</p>`,
      message: values.message ? `<p>${values.message.replace(/\n/g, '</p><p>')}</p>` : undefined
    };

    createAdhesion(formattedData, {
      onSuccess: () => {
        toast({
          title: "Demande envoyée avec succès !",
          description: "Nous étudierons votre candidature et vous contacterons sous 48h maximum.",
        });
        form.reset();
        setCustomSpecialites([]);
        setCustomCertifications([]);
      },
      onError: (error) => {
        console.error('Error submitting form:', error);
        toast({
          title: "Erreur lors de l'envoi",
          description: "Une erreur est survenue. Veuillez réessayer ou nous contacter directement.",
          variant: "destructive",
        });
      }
    });
  };

  return (
    <section id="adhesion" className="py-24 bg-gradient-to-b from-background to-muted/20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 
            className="text-3xl md:text-4xl font-bold text-foreground mb-6"
            data-editable
            data-name="formateurs.adhesion.title"
          >
            Rejoindre Syloma
          </h2>
          <p 
            className="text-lg text-muted-foreground leading-relaxed"
            data-editable
            data-name="formateurs.adhesion.subtitle"
          >
            Remplissez ce formulaire pour nous présenter votre profil. 
            Nous étudierons votre candidature et vous contacterons sous 48h.
          </p>
        </div>

        <div className="bg-card/50 backdrop-blur-sm rounded-3xl p-8 lg:p-12 border border-border/50">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {/* Informations personnelles */}
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-foreground border-b border-border pb-3">
                  Informations personnelles
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="nom"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nom *</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Votre nom" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="prenom"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Prénom *</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Votre prénom" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email professionnel *</FormLabel>
                        <FormControl>
                          <Input {...field} type="email" placeholder="votre@email.fr" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="telephone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Téléphone *</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="06 12 34 56 78" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Informations professionnelles */}
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-foreground border-b border-border pb-3">
                  Activité professionnelle
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="entreprise"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Structure/Entreprise</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Nom de votre structure" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="siret"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>SIRET</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Numéro SIRET" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Spécialités */}
                <FormField
                  control={form.control}
                  name="specialites"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Spécialités de formation *</FormLabel>
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                          {specialitesPredefinis.map((specialite) => (
                            <label key={specialite} className="flex items-center space-x-2 cursor-pointer">
                              <Checkbox
                                checked={field.value.includes(specialite)}
                                onCheckedChange={(checked) => {
                                  if (checked) {
                                    field.onChange([...field.value, specialite]);
                                  } else {
                                    field.onChange(field.value.filter((item) => item !== specialite));
                                  }
                                }}
                              />
                              <span className="text-sm">{specialite}</span>
                            </label>
                          ))}
                        </div>
                        
                        {/* Custom specialités */}
                        {customSpecialites.length > 0 && (
                          <div className="space-y-2">
                            <p className="text-sm font-medium">Spécialités ajoutées :</p>
                            <div className="flex flex-wrap gap-2">
                              {customSpecialites.map((item, index) => (
                                <span key={index} className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                                  {item}
                                  <button
                                    type="button"
                                    onClick={() => removeCustomSpecialite(index)}
                                    className="p-1 hover:bg-primary/20 rounded-full"
                                  >
                                    <X className="h-3 w-3" />
                                  </button>
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                        
                        {/* Add custom specialité */}
                        <div className="flex gap-2">
                          <Input
                            placeholder="Autre spécialité..."
                            onKeyPress={(e) => {
                              if (e.key === 'Enter') {
                                e.preventDefault();
                                addCustomSpecialite(e.currentTarget.value);
                                e.currentTarget.value = '';
                              }
                            }}
                          />
                          <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            onClick={(e) => {
                              const input = (e.target as HTMLElement).parentElement?.querySelector('input') as HTMLInputElement;
                              if (input) {
                                addCustomSpecialite(input.value);
                                input.value = '';
                              }
                            }}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Expérience */}
                <FormField
                  control={form.control}
                  name="experience"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Expérience professionnelle *</FormLabel>
                      <FormControl>
                        <Textarea 
                          {...field} 
                          placeholder="Décrivez votre parcours professionnel, vos expériences en formation, vos domaines d'expertise..."
                          rows={6}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Certifications */}
                <FormField
                  control={form.control}
                  name="certifications_detenues"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Certifications professionnelles</FormLabel>
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {certificationsPredefinies.map((certification) => (
                            <label key={certification} className="flex items-center space-x-2 cursor-pointer">
                              <Checkbox
                                checked={field.value?.includes(certification) || false}
                                onCheckedChange={(checked) => {
                                  const current = field.value || [];
                                  if (checked) {
                                    field.onChange([...current, certification]);
                                  } else {
                                    field.onChange(current.filter((item) => item !== certification));
                                  }
                                }}
                              />
                              <span className="text-sm">{certification}</span>
                            </label>
                          ))}
                        </div>
                        
                        {/* Custom certifications */}
                        {customCertifications.length > 0 && (
                          <div className="space-y-2">
                            <p className="text-sm font-medium">Certifications ajoutées :</p>
                            <div className="flex flex-wrap gap-2">
                              {customCertifications.map((item, index) => (
                                <span key={index} className="inline-flex items-center gap-2 px-3 py-1 bg-secondary/50 rounded-full text-sm">
                                  {item}
                                  <button
                                    type="button"
                                    onClick={() => removeCustomCertification(index)}
                                    className="p-1 hover:bg-secondary/70 rounded-full"
                                  >
                                    <X className="h-3 w-3" />
                                  </button>
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                        
                        {/* Add custom certification */}
                        <div className="flex gap-2">
                          <Input
                            placeholder="Autre certification..."
                            onKeyPress={(e) => {
                              if (e.key === 'Enter') {
                                e.preventDefault();
                                addCustomCertification(e.currentTarget.value);
                                e.currentTarget.value = '';
                              }
                            }}
                          />
                          <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            onClick={(e) => {
                              const input = (e.target as HTMLElement).parentElement?.querySelector('input') as HTMLInputElement;
                              if (input) {
                                addCustomCertification(input.value);
                                input.value = '';
                              }
                            }}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Liens professionnels */}
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-foreground border-b border-border pb-3">
                  Présence en ligne
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="site_web"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Site web / Portfolio</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="https://votre-site.fr" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="linkedin"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Profil LinkedIn</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="https://linkedin.com/in/..." />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Type de demande */}
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-foreground border-b border-border pb-3">
                  Votre demande
                </h3>
                
                <FormField
                  control={form.control}
                  name="type_demande"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Type de demande *</FormLabel>
                      <Select onValueChange={field.onChange}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionnez le type de demande" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="adhesion">Demande d'adhésion complète</SelectItem>
                          <SelectItem value="informations">Demande d'informations</SelectItem>
                          <SelectItem value="partenariat">Discussion partenariat spécifique</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message complémentaire</FormLabel>
                      <FormControl>
                        <Textarea 
                          {...field} 
                          placeholder="Décrivez vos attentes, vos questions, ou tout élément que vous souhaitez partager..."
                          rows={4}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Acceptations */}
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="acceptation_cgv"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="text-sm font-medium leading-relaxed cursor-pointer">
                          J'accepte les conditions générales et la politique de confidentialité *
                        </FormLabel>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="newsletter"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="text-sm font-medium leading-relaxed cursor-pointer">
                          J'accepte de recevoir les actualités et informations de Syloma
                        </FormLabel>
                      </div>
                    </FormItem>
                  )}
                />
              </div>

              {/* Submit Button */}
              <div className="flex justify-center pt-6">
                <Button 
                  type="submit" 
                  disabled={isLoading}
                  size="lg"
                  className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 px-12"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary-foreground mr-3"></div>
                      Envoi en cours...
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5 mr-3" />
                      Envoyer ma candidature
                    </>
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </section>
  );
};

export default AdhesionForm;
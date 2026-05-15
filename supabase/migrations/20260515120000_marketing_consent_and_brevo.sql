alter table public.leads
alter column consent set default false;

comment on column public.leads.consent is
'Consentement explicite pour recevoir les conseils, guides, offres et recommandations email de Litho Intelligence.';

comment on column public.leads.metadata is
'Données de segmentation marketing : source, intention, pierre recommandée, statut de synchronisation Brevo et contexte de capture.';

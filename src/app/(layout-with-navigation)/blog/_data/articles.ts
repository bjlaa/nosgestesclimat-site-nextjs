'use client'

import budgetFR from '@/locales/blog/fr/budget.mdx'
import campusFr from '@/locales/blog/fr/campus.mdx'
import gesTransportFr from '@/locales/blog/fr/gesTransport.mdx'
import historyFr from '@/locales/blog/fr/historique.mdx'
import impactMobiliteFR from '@/locales/blog/fr/mobilite.mdx'
import dayFr from '@/locales/blog/fr/mondialEnvironnement.mdx'
import { BlogPost } from '@/types/blog'

export const blogData: BlogPost[] = [
  {
    date: '2023-06-05',
    title: 'Journée mondiale de l’environnement',
    slug: 'journée-mondial-environnement',
    description:
      'Entre les actuelles 9 tonnes de l’empreinte moyenne d’un citoyen français, et l’objectif affiché de 2 tonnes , il y a beaucoup de pas à faire ! ',
    content: dayFr,
    image: '/images/blog/WED.jpg',
  },
  {
    date: '2021-05-11',
    title: 'Nos Gestes Climat adapté pour un campus',
    slug: 'campus',
    description:
      'Dans le cadre de leur option-projet, les étudiants de Centrale Nantes se sont attelés à cette tâche et ont repris le simulateur pour en faire une version adaptée à leur campus et ainsi dresser le bilan carbone de l’établissement et des occupants.',
    content: campusFr,
    image: '/images/blog/campus.jpg',
  },
  {
    date: '2020-09-21',
    title: 'Envie de perdre quelques tonnes ?',
    slug: 'historique',
    description:
      'Cette invitation à perdre quelques tonnes, un brin provoquante, ne date pas d’hier : c’était déjà celle du Coach Carbone lancé en 2010 par l’ADEME et la FNH (Fondation pour la Nature et l’Homme) créée par Nicolas Hulot. ',
    content: historyFr,
    image: '/images/blog/coachcarbone.jpg',
  },
  {
    date: '2020-07-29',
    title: "L'affichage des GES sur les titres de transport",
    slug: 'affichage-ges-transport',
    description:
      "Petit état des lieux de l'affichage des gaz à effet de serre (GES) sur les sites de mobilité et les justificatifs de transport…",
    content: gesTransportFr,
    image: '/images/blog/tgv.jpg',
  },
  {
    date: '2020-05-16',
    title: "Le budget et l'empreinte carbone, c'est quoi ?",
    slug: 'budget',
    description:
      "Une explication pas à pas des objectifs climat, de l'échelle de la Terre à celle de l'individu.",
    content: budgetFR,
    image: '/images/blog/empreinte.png',
  },
  {
    date: '2020-03-30',
    title: "L'impact carbone de notre mobilité",
    slug: 'impact-mobilite',
    description:
      "Mon Impact Transport pour rendre visible l'impact carbone du transport",
    content: impactMobiliteFR,
    image: '/images/blog/velo.png',
  },
]

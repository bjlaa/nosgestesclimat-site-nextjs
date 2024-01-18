import { DottedName, NodeValue } from '@/publicodes-state/types'

type migrationType = {
  keysToMigrate: Record<DottedName, DottedName>
  valuesToMigrate: Record<DottedName, Record<string, NodeValue>>
}

export const dottedNamesMigration: migrationType = {
  keysToMigrate: {
    'logement . chauffage . bois . type . bûche . consommation':
      'logement . chauffage . bois . type . bûches . consommation',
    'divers . loisirs . culture . musées et monuments . fréquence': '',
    'logement . vacances . maison secondaire . présent':
      'logement . vacances . résidence secondaire . présent',
    'divers . ameublement . meubles . salon de jardin résine ou métal . nombre':
      '',
    'divers . ameublement . meubles . salon de jardin bois . nombre': '',
    'divers . électroménager . appareils . tondeuse électrique . nombre': '',
    'logement . éco-construit': '',
    'transport . ferry . présent': 'transport . ferry . usager',
    'divers . loisirs . culture . édition . fréquence': '',
    'divers . animaux domestiques . empreinte . choix utilisateur': '',
    'transport . voiture . propriétaire': '',
    'transport . voiture . âge': '',
    'logement . gaz . biogaz . part': 'logement . chauffage . biogaz . part',
    'divers . textile . t-shirt . nombre':
      'divers . textile . t shirt . nombre',
    'divers . électroménager . appareils . lave-linge . nombre':
      'divers . électroménager . appareils . lave linge . nombre',
    'divers . électroménager . appareils . sèche-linge . nombre':
      'divers . électroménager . appareils . sèche linge . nombre',
    'divers . électroménager . appareils . lave-vaisselle . nombre':
      'divers . électroménager . appareils . lave vaisselle . nombre',
    'divers . électroménager . appareils . micro-onde . nombre':
      'divers . électroménager . appareils . micro onde . nombre',
  },
  valuesToMigrate: {
    'logement . chauffage . bois . type': { "'bûche'": 'bûches' },
    'transport . boulot . commun . type': { "'vélo'": '' },
    'alimentation . petit déjeuner . type': { "'français'": 'continental' },
    'alimentation . boisson . eau en bouteille . consommateur': {
      "'négatif'": 'non',
      "'affirmatif'": 'oui',
    },
    'alimentation . type de lait': { "'lait d'avoine'": 'lait avoine' },
    'transport . deux roues . usager': {
      "'négatif'": 'non',
      "'affirmatif'": 'oui',
    },
    'transport . ferry . usager': {
      "'négatif'": 'non',
      "'affirmatif'": 'oui',
    },
  },
}

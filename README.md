## Le site Web nosgestesclimat.fr

## C'est quoi ?

Un simulateur d'empreinte climat individuelle de consommation à l'année, utilisant le modèle [nosgestesclimat](https://github.com/incubateur-ademe/nosgestesclimat).

Pour contribuer au modèle, données sous-jacentes et textes du questionnaire (calculs, facteurs d'émission, textes, questions, réponses, suggestions de saisie), [suivez le guide de contribution](https://github.com/incubateur-ademe/nosgestesclimat/blob/master/CONTRIBUTING.md).

Pour tout ce qui touche à l'interface (style d'un bouton, graphique de résultat, code javascript, etc.) c'est ici [sur le dépôt du _site_](https://github.com/incubateur-ademe/nosgestesclimat-site-nextjs/issues).

> 🇬🇧 Most of the documentation (including issues and the wiki) is written in french, please raise an [issue](https://github.com/incubateur-ademe/nosgestesclimat-site-nextjs/issues/new) if you are interested and do not speak French.

## Et techniquement ?

C'est un un _fork_ d'un outil de vulgarisation de l'empreinte climat [futur.eco](https://futur.eco), lui-même forké d'un simulateur public de cotisations sociales [mon-entreprise.fr](https://mon-entreprise.fr), qui permet de coder en français des règles de calculs, dans le langage [publi.codes](https://publi.codes). De ces règles de calcul, des simulateurs (pour l'utilisateur lambda) et des pages de documentation qui expliquent le calcul (pour l'expert ou le curieux) sont générés automatiquement.

Le code est en NextJS / Typescript / React / TailwindCSS, entre autres.

### 🇬🇧 Installation

The footprint model is stored in the [git submodule](https://git-scm.com/book/en/v2/Git-Tools-Submodules) `nosgestesclimat/` pointing to the corresponding GitHub [repository](https://github.com/incubateur-ademe/nosgestesclimat).

Consequently, to fetch all the data you need to provide the `--recursive` flag when cloning this repository or if it's already cloned you need to run `git submodule update --init --recursive`.

The model YAML files will then be loaded locally (no installation needed, they are loaded by webpack), and your changes to these files will refresh the UI instantly.

> The production version fetches the JSON compiled YAML rules deployed by incubateur-ademe/nosgestesclimat.

Then run this command from this repo:

```
yarn && yarn start
```

> Note: recompiling the model in all supported regions and languages could significantly slow down your dev process.
> Therefore, instead of running `yarn start` you can run webpack in dev mode with `yarn serve` and watch the compilation of the model in a specified language and region with `yarn model:rules-watch -t fr -o FR`.

If you want to run the automatic localisation, which depends on a Netlify Edge function, you must run `netlify dev`.

### 🇬🇧 Tests

#### End-to-end tests

We use [Cypress](https://www.cypress.io/) for end-to-end tests.

To run the tests:

1. you need to start a local server with `yarn run dev`
2. you need to generate the personas spec files with `yarn run e2e:generate`
3. then run the tests with `yarn run e2e` to open the Cypress GUI.

## Réutilisations de ce code

Attention, même si la licence MIT vous permet de réutiliser ce code à votre guise, en citant clairement le fait que vous reprenez nos travaux, vous ne pouvez pas réutiliser la marque Nos Gestes Climat. [Veuillez lire notre guide de personnalisation](https://github.com/incubateur-ademe/nosgestesclimat-site-nextjs/blob/master/PERSONNALISATION.md)

<a href="https://vercel.com/?utm_source=ademe&utm_campaign=oss" alt="Url Vercel"><image src="https://user-images.githubusercontent.com/37937348/161967395-a5064a6a-b4d3-4ede-a940-ad81fa773916.svg" alt="Vercel" width="100" /></a>

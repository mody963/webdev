# Monorepo

Deze repository bevat een Vue/Vite-frontend en een Express/TypeScript-backend.

## Vereisten

- Node.js
- npm
- Visual Studio Code

## Installatie

Installeer de dependencies voor beide projecten afzonderlijk:

```sh
cd backend
npm install

cd ..

cd frontend
npm install
```

## Backend

Start de backend in developmentmodus met automatisch herstarten:

```sh
cd backend
npm run dev
```

## Frontend

Start de frontend met Vite:

```sh
cd frontend
npm run dev
```

Gebruik twee terminals om de frontend en backend tegelijk te kunnen starten.

## Oxc

Dit project gebruikt [Oxc](https://oxc.rs/) voor linting en formatting:

- **Oxlint** controleert JavaScript, TypeScript en Vue-code.
- **Oxfmt** formatteert de broncode.
- De configuratie staat in `backend/.oxlintrc.json`, `frontend/.oxlintrc.json` en `frontend/.oxfmtrc.json`.
- De npm-scripts gebruiken de lokaal geïnstalleerde versies uit `package.json`.

### VS Code extensies

Installeer de volgende extensies:

- Vue (Official)
- Oxc

Deïnstalleer of disable de volgende extensies (indien ze geïnstalleerd staan):

- Vetur
- ESlint
- Prettier
- Django

## Een eigen frontend pagina toevoegen

Voor het echte project is het handig om direct de modules op individuele Pages te maken.

1. Maak in `frontend/src/pages` een nieuw bestand, bijvoorbeeld `YourModuleNamePage.vue`.
2. Voeg je pagina toe aan de routes in `router/index.ts` door het gedeelte van `AboutPage` te kopiëren en aan te passen.
3. Voeg in `App.vue` een nieuwe `RouterLink` toe naar het pad van jouw pagina.

De werking van de router behandelen we later in de lessen.

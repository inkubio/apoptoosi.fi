# apoptoosi.fi
Inkubio ry's annual ball website frontend built with nuxt3. Uses the Directus headless CMS as the backend.

## Deployment
Changes to master branch automatically deploys the changes to Azure static web service.

## Local development
### Setup

Make sure to install the dependencies:

```bash
# yarn
yarn install

# npm
npm install

# pnpm
pnpm install --shamefully-hoist
```

### Development Server

Start the development server on http://localhost:3000

```bash
npm run dev
```

### Production

Build the application for production:

```bash
npm run build
```

Locally preview production build:

```bash
npm run preview
```

Checkout the [deployment documentation](https://v3.nuxtjs.org/guide/deploy/presets) for more information.

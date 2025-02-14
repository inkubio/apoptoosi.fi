# apoptoosi.party
Inkubio ry's annual ball website frontend built with nuxt3. Uses the Directus headless CMS as the backend.

## Deployment
Changes to master branch automatically deploys the changes to Azure static web service.

### Requirements
- The frontend of this app requirements are defined in package.json.
- Directus CMS uses version v11.4.1

## Local development
### Setup

Make sure to install the dependencies:

```bash
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
pnpm run build
```

Locally preview production build:

```bash
npm run preview
```

## Environment variables
The system requires setting up two environment variables. 

This is the secret token generated for a directus user with required permissions for signup
```
SIGNUP_API_TOKEN="secret-directus-api-token"
```

This token is used to setup the url of the directus instance used for this.
```
DIRECTUS_BASE_URL="http://example.com"
```




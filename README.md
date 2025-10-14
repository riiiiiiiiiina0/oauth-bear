# OAuth Bear 🐻

A Next.js application that provides a flexible framework for handling OAuth 2.0 authentication flows with multiple service providers.

## Features

- 🔐 **OAuth 2.0 Flow**: Complete authorization code flow implementation
- 🔄 **Token Refresh**: Built-in token refresh functionality
- 🧩 **Extensible Architecture**: Easy-to-extend base provider class for adding new OAuth providers
- 🎯 **Dynamic Routing**: Next.js App Router with dynamic provider routes
- 📦 **Type-Safe**: Full TypeScript support
- 🎨 **Modern Stack**: Next.js 15, React 19, Tailwind CSS 4

## Supported Providers

- **Raindrop.io** - Bookmark manager integration

## Project Structure

```
oauth-bear/
├── src/
│   ├── app/
│   │   ├── page.tsx                      # Home page with provider links
│   │   └── oauth/
│   │       └── [provider]/
│   │           ├── page.tsx              # Initiates OAuth flow
│   │           └── callback/
│   │               └── route.ts          # Handles OAuth callbacks and token refresh
│   └── components/
│       └── oauth/
│           ├── BaseServiceProvider.ts    # Abstract base class for OAuth providers
│           ├── index.ts                  # Provider registry
│           └── providers/
│               └── RaindropServiceProvider.ts
├── scripts/
│   └── test-refresh-token.js            # Testing utility for token refresh
└── package.json
```

## Getting Started

### Prerequisites

- Node.js 20+ installed
- OAuth credentials from your chosen provider(s)

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd oauth-bear
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env.local` file with your OAuth credentials:

```bash
# Raindrop OAuth Configuration
RAINDROP_CLIENT_ID=your_client_id
RAINDROP_CLIENT_SECRET=your_client_secret
RAINDROP_REDIRECT_URI=http://localhost:3000/oauth/raindrop/callback
RAINDROP_SCOPE=
```

4. Run the development server:

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) with your browser

## Usage

### Initiating OAuth Flow

Navigate to `/oauth/{provider}` (e.g., `/oauth/raindrop`) to start the OAuth flow. The application will:

1. Redirect to the provider's authorization page
2. User authorizes the application
3. Provider redirects back to the callback URL with an authorization code
4. Callback endpoint exchanges the code for access and refresh tokens

### API Endpoints

#### GET `/oauth/[provider]/callback`

Handles the OAuth callback and exchanges authorization code for tokens.

**Query Parameters:**

- `code` (required): Authorization code from OAuth provider

**Response:**

```json
{
  "access_token": "...",
  "refresh_token": "...",
  "expires_in": 3600
}
```

#### POST `/oauth/[provider]/callback`

Refreshes an expired access token using a refresh token.

**Request Body:**

```json
{
  "refresh_token": "your_refresh_token"
}
```

**Response:**

```json
{
  "access_token": "...",
  "refresh_token": "...",
  "expires_in": 3600
}
```

## Adding a New OAuth Provider

1. Create a new provider class in `src/components/oauth/providers/`:

```typescript
import { BaseServiceProvider, TokenResponse } from '../BaseServiceProvider';

export class NewProviderServiceProvider extends BaseServiceProvider {
  constructor() {
    super('newprovider'); // This will be the route name
  }

  async getAuthorizationUrl(): Promise<string> {
    const params = new URLSearchParams({
      client_id: this.clientId,
      redirect_uri: this.redirectUri,
      scope: this.scope,
      response_type: 'code',
    });
    return `https://provider.com/oauth/authorize?${params.toString()}`;
  }

  async getTokens(code: string): Promise<TokenResponse> {
    const response = await fetch('https://provider.com/oauth/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        code,
        grant_type: 'authorization_code',
        client_id: this.clientId,
        client_secret: this.clientSecret,
        redirect_uri: this.redirectUri,
      }),
    });
    return response.json();
  }

  async refreshToken(refreshToken: string): Promise<TokenResponse> {
    const response = await fetch('https://provider.com/oauth/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        grant_type: 'refresh_token',
        client_id: this.clientId,
        client_secret: this.clientSecret,
        refresh_token: refreshToken,
      }),
    });
    return response.json();
  }
}
```

2. Register the provider in `src/components/oauth/index.ts`:

```typescript
import { NewProviderServiceProvider } from './providers/NewProviderServiceProvider';

export const serviceProviders: ServiceProviders = [
  new RaindropServiceProvider(),
  new NewProviderServiceProvider(), // Add your provider here
].reduce((acc, provider) => {
  acc[provider.name] = provider;
  return acc;
}, {} as ServiceProviders);
```

3. Add environment variables to `.env.local`:

```bash
NEWPROVIDER_CLIENT_ID=your_client_id
NEWPROVIDER_CLIENT_SECRET=your_client_secret
NEWPROVIDER_REDIRECT_URI=http://localhost:3000/oauth/newprovider/callback
NEWPROVIDER_SCOPE=your_required_scopes
```

4. Add a link to the home page in `src/app/page.tsx`:

```tsx
<li>
  <Link href="/oauth/newprovider">- New Provider</Link>
</li>
```

## Environment Variables

Environment variables follow a naming convention: `{PROVIDER}_VARIABLE_NAME`

Required variables for each provider:

- `{PROVIDER}_CLIENT_ID`: OAuth client ID
- `{PROVIDER}_CLIENT_SECRET`: OAuth client secret
- `{PROVIDER}_REDIRECT_URI`: OAuth callback URL
- `{PROVIDER}_SCOPE`: Required OAuth scopes (can be empty string)

Replace `{PROVIDER}` with your provider name in uppercase (e.g., `RAINDROP`, `GITHUB`).

## Testing

Test token refresh functionality using the included script:

```bash
node scripts/test-refresh-token.js
```

## Tech Stack

- **Framework**: Next.js 15.5.5
- **React**: 19.1.0
- **TypeScript**: 5.x
- **Styling**: Tailwind CSS 4.x
- **Runtime**: Node.js 20+

## Development

Build for production:

```bash
npm run build
```

Start production server:

```bash
npm start
```

## License

This project is private and not licensed for public use.

## Contributing

To add support for a new OAuth provider, follow the "Adding a New OAuth Provider" section above and submit a pull request.

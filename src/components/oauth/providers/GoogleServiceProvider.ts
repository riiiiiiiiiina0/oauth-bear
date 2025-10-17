import { BaseServiceProvider } from '../BaseServiceProvider';
import { ServiceProvider } from '../types';

export class GoogleServiceProvider
  extends BaseServiceProvider
  implements ServiceProvider
{
  constructor() {
    super('google');
  }

  getAuthorizationUrl(searchParams: {
    [key: string]: string | string[] | undefined;
  }) {
    const scope = searchParams.scope as string;

    const authUrl = new URL('https://accounts.google.com/o/oauth2/v2/auth');
    authUrl.searchParams.set('client_id', process.env.GOOGLE_CLIENT_ID || '');
    authUrl.searchParams.set('redirect_uri', this.callbackUrl);
    authUrl.searchParams.set('response_type', 'code');
    authUrl.searchParams.set('scope', scope);

    return Promise.resolve(authUrl.toString());
  }

  async getAccessToken(code: string) {
    const response = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: process.env.GOOGLE_CLIENT_ID || '',
        client_secret: process.env.GOOGLE_CLIENT_SECRET || '',
        code,
        redirect_uri: this.callbackUrl,
        grant_type: 'authorization_code',
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Failed to get access token: ${error}`);
    }

    return response.json();
  }
}
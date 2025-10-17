import { BaseServiceProvider } from '../BaseServiceProvider';
import { ServiceProvider } from '../types';

export class GitHubServiceProvider
  extends BaseServiceProvider
  implements ServiceProvider
{
  constructor() {
    super('github');
  }

  getAuthorizationUrl(searchParams: {
    [key: string]: string | string[] | undefined;
  }) {
    const scope = searchParams.scope as string;

    const authUrl = new URL('https://github.com/login/oauth/authorize');
    authUrl.searchParams.set('client_id', process.env.GITHUB_CLIENT_ID || '');
    authUrl.searchParams.set('redirect_uri', this.callbackUrl);
    authUrl.searchParams.set('scope', scope);

    return Promise.resolve(authUrl.toString());
  }

  async getAccessToken(code: string) {
    const response = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      },
      body: new URLSearchParams({
        client_id: process.env.GITHUB_CLIENT_ID || '',
        client_secret: process.env.GITHUB_CLIENT_SECRET || '',
        code,
        redirect_uri: this.callbackUrl,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Failed to get access token: ${error}`);
    }

    return response.json();
  }
}
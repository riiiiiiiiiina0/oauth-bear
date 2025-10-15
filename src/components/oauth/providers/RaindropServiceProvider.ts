import { BaseServiceProvider } from '../BaseServiceProvider';
import { TokenResponse } from '../types';

export class RaindropServiceProvider extends BaseServiceProvider {
  constructor() {
    super('raindrop');
  }

  async getAuthorizationUrl(searchParams: {
    [key: string]: string | string[] | undefined;
  }): Promise<string> {
    const params = this.getAuthorizationRequestBody(searchParams);
    return `https://raindrop.io/oauth/authorize?${params.toString()}`;
  }

  async getTokens(code: string): Promise<TokenResponse> {
    const url = 'https://raindrop.io/oauth/access_token';
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
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
    const url = 'https://raindrop.io/oauth/access_token';
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
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

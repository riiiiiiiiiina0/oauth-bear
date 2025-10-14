import { BaseServiceProvider, TokenResponse } from '../BaseServiceProvider';

export class RaindropServiceProvider extends BaseServiceProvider {
  constructor() {
    super('raindrop');
  }

  async getAuthorizationUrl(): Promise<string> {
    const params = new URLSearchParams();
    params.set('client_id', this.clientId);
    params.set('redirect_uri', this.redirectUri);
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

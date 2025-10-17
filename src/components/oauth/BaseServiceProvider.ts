import { SearchParams, TokenResponse } from './types';

export abstract class BaseServiceProvider {
  public readonly name: string;
  protected readonly clientId: string;
  protected readonly clientSecret: string;
  protected readonly redirectUri: string;
  protected readonly scope: string;

  protected readonly authorizationUrl: string;
  protected readonly tokenUrl: string;
  protected readonly refreshTokenUrl: string;

  constructor(
    name: string,
    authorizationUrl: string,
    tokenUrl: string,
    refreshTokenUrl?: string,
  ) {
    this.name = name;

    const _name = name.toUpperCase();
    this.clientId = process.env[`${_name}_CLIENT_ID`] ?? '';
    this.clientSecret = process.env[`${_name}_CLIENT_SECRET`] ?? '';
    this.redirectUri = process.env[`${_name}_REDIRECT_URI`] ?? '';
    this.scope = process.env[`${_name}_SCOPE`] ?? '';

    this.authorizationUrl = authorizationUrl;
    this.tokenUrl = tokenUrl;
    this.refreshTokenUrl = refreshTokenUrl ?? tokenUrl;
  }

  async getAuthorizationUrl(searchParams: {
    [key: string]: string | string[] | undefined;
  }): Promise<string> {
    const params = this.getAuthorizationRequestBody(searchParams);
    return `${this.authorizationUrl}?${params.toString()}`;
  }

  async getTokens(code: string): Promise<TokenResponse> {
    const response = await fetch(this.tokenUrl, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...this.getTokenRequestBody(code),
        grant_type: 'authorization_code',
      }),
    });
    return response.json();
  }

  async refreshToken(refreshToken: string): Promise<TokenResponse> {
    const response = await fetch(this.refreshTokenUrl, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...this.getTokenRequestBody(refreshToken),
        grant_type: 'refresh_token',
      }),
    });
    return response.json();
  }

  protected getAuthorizationRequestBody(
    searchParams: SearchParams,
  ): URLSearchParams {
    const params = new URLSearchParams();
    params.set('client_id', this.clientId);
    params.set('redirect_uri', this.redirectUri);
    params.set('scope', this.scope);
    params.set('response_type', 'code');

    const state = this.getStateFromSearchParams(searchParams);
    if (state) params.set('state', state);

    return params;
  }

  protected getTokenRequestBody(code: string): any {
    return {
      code,
      client_id: this.clientId,
      client_secret: this.clientSecret,
      redirect_uri: this.redirectUri,
    };
  }

  protected getStateFromSearchParams(searchParams: {
    [key: string]: string | string[] | undefined;
  }): string {
    const state = searchParams.state ?? '';

    if (state && typeof state === 'string') {
      return state;
    }

    if (
      state &&
      typeof state === 'object' &&
      'length' in state &&
      state.length > 0
    ) {
      return state.join(',');
    }

    return '';
  }
}

import { SearchParams, TokenResponse } from './types';

export abstract class BaseServiceProvider {
  public readonly name: string;
  protected readonly clientId: string;
  protected readonly clientSecret: string;
  protected readonly redirectUri: string;
  protected readonly scope: string;

  constructor(name: string) {
    this.name = name;

    const _name = name.toUpperCase();
    this.clientId = process.env[`${_name}_CLIENT_ID`] ?? '';
    this.clientSecret = process.env[`${_name}_CLIENT_SECRET`] ?? '';
    this.redirectUri = process.env[`${_name}_REDIRECT_URI`] ?? '';
    this.scope = process.env[`${_name}_SCOPE`] ?? '';
  }

  abstract getAuthorizationUrl(searchParams: {
    [key: string]: string | string[] | undefined;
  }): Promise<string>;

  abstract getTokens(code: string): Promise<TokenResponse>;

  abstract refreshToken(refreshToken: string): Promise<TokenResponse>;

  protected getAuthorizationRequestBody(
    searchParams: SearchParams,
  ): URLSearchParams {
    const params = new URLSearchParams();
    params.set('client_id', this.clientId);
    params.set('redirect_uri', this.redirectUri);

    const state = this.getStateFromSearchParams(searchParams);
    if (state) params.set('state', state);

    return params;
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

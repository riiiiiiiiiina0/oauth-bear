export interface TokenResponse {
  access_token: string;
  refresh_token: string;
  expires_in: number;
}

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

  abstract getAuthorizationUrl(): Promise<string>;

  abstract getTokens(code: string): Promise<TokenResponse>;

  abstract refreshToken(refreshToken: string): Promise<TokenResponse>;
}

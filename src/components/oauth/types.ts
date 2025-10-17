export type SearchParams = {
  [key: string]: string | string[] | undefined;
};

export interface TokenResponse {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  scope?: string;
}

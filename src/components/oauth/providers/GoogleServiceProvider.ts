import { BaseServiceProvider } from '../BaseServiceProvider';

export class GoogleServiceProvider extends BaseServiceProvider {
  constructor() {
    super(
      'google',
      'https://accounts.google.com/o/oauth2/v2/auth',
      'https://oauth2.googleapis.com/token',
    );
  }
}

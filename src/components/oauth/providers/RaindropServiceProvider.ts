import { BaseServiceProvider } from '../BaseServiceProvider';

export class RaindropServiceProvider extends BaseServiceProvider {
  constructor() {
    super(
      'raindrop',
      'https://raindrop.io/oauth/authorize',
      'https://raindrop.io/oauth/access_token',
    );
  }
}

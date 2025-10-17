import { BaseServiceProvider } from '../BaseServiceProvider';

export class GitHubServiceProvider extends BaseServiceProvider {
  constructor() {
    super(
      'github',
      'https://github.com/login/oauth/authorize',
      'https://github.com/login/oauth/access_token',
    );
  }
}

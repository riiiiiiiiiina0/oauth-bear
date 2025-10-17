import { BaseServiceProvider } from './BaseServiceProvider';
import { GitHubServiceProvider } from './providers/GitHubServiceProvider';
import { GoogleServiceProvider } from './providers/GoogleServiceProvider';
import { RaindropServiceProvider } from './providers/RaindropServiceProvider';

export type ServiceProviders = Record<string, BaseServiceProvider>;

export const serviceProviders: ServiceProviders = [
  new RaindropServiceProvider(),
  new GoogleServiceProvider(),
  new GitHubServiceProvider(),
].reduce((acc, provider) => {
  acc[provider.name] = provider;
  return acc;
}, {} as ServiceProviders);

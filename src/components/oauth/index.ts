import { BaseServiceProvider } from './BaseServiceProvider';
import { RaindropServiceProvider } from './providers/RaindropServiceProvider';

export type ServiceProviders = Record<string, BaseServiceProvider>;

export const serviceProviders: ServiceProviders = [
  new RaindropServiceProvider(),
].reduce((acc, provider) => {
  acc[provider.name] = provider;
  return acc;
}, {} as ServiceProviders);

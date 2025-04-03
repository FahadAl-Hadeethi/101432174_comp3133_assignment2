import { ApplicationConfig, inject, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideApollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { InMemoryCache } from '@apollo/client/core';
import { routes } from './app.routes';
import { environment } from '../environments/environment';
import { environment as prodEnvironment } from '../environments/environment.prod';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideApollo(() => {
      const httpLink = inject(HttpLink);
      const uri = isDevMode()
        ? environment.graphqlEndpoint
        : prodEnvironment.graphqlEndpoint;
      return {
        link: httpLink.create({ uri }),
        cache: new InMemoryCache()
      };
    })
  ]
};

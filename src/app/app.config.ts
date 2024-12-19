import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { provideStore, provideState } from '@ngrx/store';
import { provideStoreDevtools } from "@ngrx/store-devtools";
import { provideEffects } from '@ngrx/effects';
import { provideRouterStore, routerReducer } from "@ngrx/router-store";

import { routes } from './app.routes';
import { categoriesReducer } from "./state/categories.reducer";
import { CategoriesRecordsEffects } from "./state/categories-records.effects";
import { MatNativeDateModule } from '@angular/material/core';
import { RequestInterceptor } from '../shared/interceptors/request-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptorsFromDi()),
      {
        provide: HTTP_INTERCEPTORS,
        useClass: RequestInterceptor,
        multi: true
    },
    provideAnimationsAsync(),
    provideEffects(CategoriesRecordsEffects),
    provideStore({
      route: routerReducer
    }),
    provideState({
        name: 'categories',
        reducer: categoriesReducer
    }),
    provideStoreDevtools({ maxAge: 25, logOnly: false }),
    provideRouterStore(),
    importProvidersFrom(MatNativeDateModule),
]
};

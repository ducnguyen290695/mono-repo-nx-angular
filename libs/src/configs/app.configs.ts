import { CommonModule } from '@angular/common';
import {
  HTTP_INTERCEPTORS,
  HttpBackend,
  HttpClientModule,
} from '@angular/common/http';
import {
  ClassSansProvider,
  EnvironmentProviders,
  importProvidersFrom,
  ImportProvidersSource,
  Provider,
} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ApplicationConfig, BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import {
  TranslateLoader,
  TranslateModule,
  TranslateService,
  TranslateStore,
} from '@ngx-translate/core';
import { TranslationResource } from 'ngx-translate-multi-http-loader';
import { RequestInterceptor } from '../api/request-interceptor';
import { SafeTranslatePipe } from '../pipes';
import { HttpLoaderFactory, LangCodeE } from '../services';

export const getAppConfigs = ({
  appRoutes,
  i18nResources,
  rootReducer,
  restImportProviders = [],
  restProviders = [],
  defaultLanguage = LangCodeE.VI,
  ErrorInterceptor,
}: {
  appRoutes: Parameters<typeof provideRouter>[0];
  i18nResources: (string | TranslationResource)[];
  rootReducer: Parameters<typeof StoreModule.forRoot>[0];
  restImportProviders?: ImportProvidersSource[];
  restProviders?: Array<Provider | EnvironmentProviders>;
  defaultLanguage?: LangCodeE;
  ErrorInterceptor?: ClassSansProvider['useClass'];
}): ApplicationConfig => {
  return {
    providers: [
      provideRouter(appRoutes),
      importProvidersFrom(
        BrowserModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        CommonModule,
        HttpClientModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory(i18nResources),
            deps: [HttpBackend],
          },
          defaultLanguage,
        }),
        StoreModule.forRoot(rootReducer),
        SafeTranslatePipe,
        ...restImportProviders,
      ),
      TranslateService,
      TranslateStore,
      {
        provide: HTTP_INTERCEPTORS,
        useClass: ErrorInterceptor,
        multi: true,
      } as Provider,
      {
        provide: HTTP_INTERCEPTORS,
        useClass: RequestInterceptor,
        multi: true,
      },
      ...restProviders,
    ],
  };
};

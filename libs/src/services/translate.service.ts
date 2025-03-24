import { HttpBackend } from '@angular/common/http';
import { inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import {
  MultiTranslateHttpLoader,
  TranslationResource,
} from 'ngx-translate-multi-http-loader';

export enum LangCodeE {
  EN = 'en',
  VI = 'vi',
}

export type TranslationKeyT<T, Prefix extends string = ''> = {
  [K in Extract<keyof T, string>]: T[K] extends string
    ? `${Prefix}${K}`
    : `${Prefix}${K}.${TranslationKeyT<T[K]>}`;
}[Extract<keyof T, string>];

export type TranslationKeysT<TranslationsT> = TranslationKeyT<TranslationsT>;

export class TranslationService<T extends string | string[]> {
  private translate = inject(TranslateService);

  initLanguage() {
    const browserLang = this.translate.getBrowserLang() as string;
    this.translate.setDefaultLang(LangCodeE.EN);
    this.translate.use(browserLang);
  }

  changeLanguage(lang: string) {
    this.translate.use(lang);
  }

  translateText(key: T): string {
    return this.translate.instant(key);
  }
}

export function HttpLoaderFactory(
  resourcesPrefix: (string | TranslationResource)[],
) {
  return (http: HttpBackend) => {
    return new MultiTranslateHttpLoader(http, resourcesPrefix);
  };
}

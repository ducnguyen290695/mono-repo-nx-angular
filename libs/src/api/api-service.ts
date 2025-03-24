import {
  HttpClient,
  HttpContext,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';

interface ApiRequestOptionsI {
  headers?:
    | HttpHeaders
    | {
        [header: string]: string | string[];
      };
  context?: HttpContext;
  observe?: 'body';
  params?:
    | HttpParams
    | {
        [param: string]:
          | string
          | number
          | boolean
          | ReadonlyArray<string | number | boolean>;
      };
  reportProgress?: boolean;
  responseType?: 'json';
  withCredentials?: boolean;
}

export interface ApiConfigsI {
  baseApiUrl: string;
}

export class ApiService {
  private http = inject(HttpClient);

  constructor(private apiConfigs: ApiConfigsI) {}

  get<T>(endpoint: string, options?: ApiRequestOptionsI): Observable<T> {
    return this.http.get<T>(
      `${this.apiConfigs?.baseApiUrl}/${endpoint}`,
      options,
    );
  }

  post<T>(
    endpoint: string,
    data?: T,
    options?: ApiRequestOptionsI,
  ): Observable<T> {
    return this.http.post<T>(
      `${this.apiConfigs?.baseApiUrl}/${endpoint}`,
      data,
      options,
    );
  }

  put<T>(
    endpoint: string,
    data?: T,
    options?: ApiRequestOptionsI,
  ): Observable<T> {
    return this.http.put<T>(
      `${this.apiConfigs?.baseApiUrl}/${endpoint}`,
      data,
      options,
    );
  }

  patch<T>(
    endpoint: string,
    data?: T,
    options?: ApiRequestOptionsI,
  ): Observable<T> {
    return this.http.patch<T>(
      `${this.apiConfigs?.baseApiUrl}/${endpoint}`,
      data,
      options,
    );
  }

  delete<T>(endpoint: string, options?: ApiRequestOptionsI): Observable<T> {
    return this.http.delete<T>(
      `${this.apiConfigs?.baseApiUrl}/${endpoint}`,
      options,
    );
  }
}

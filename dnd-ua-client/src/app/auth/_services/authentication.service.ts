import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';

import { AccessToken, CustomJwt } from '@dnd-ua/shared-lib';

import { environment } from 'dnd-ua-client/src/environments/environment';

@Injectable()
export class AuthenticationService {
  readonly storageAccessTokenKey = 'accessToken';
  readonly storageRefreshTokenKey = 'refreshToken';
  readonly authApiUrl = `${environment.apiUrl}/auth/`;

  constructor(private http: HttpClient) {}

  login(username: string, password: string) {
    return this.http.post<CustomJwt>(
      this.authApiUrl + 'login',
      { username, password }
    ).pipe(
      tap(({ accessToken, refreshToken }) => {
        localStorage.setItem(this.storageAccessTokenKey, accessToken);
        localStorage.setItem(this.storageRefreshTokenKey, refreshToken);
      })
    );
  }

  register(username: string, password: string) {
    return this.http.post<CustomJwt>(
      this.authApiUrl + 'register',
      { username, password }
    ).pipe(
      tap(({ accessToken, refreshToken }) => {
        localStorage.setItem(this.storageAccessTokenKey, accessToken);
        localStorage.setItem(this.storageRefreshTokenKey, refreshToken);
      })
    );
  }

  refreshToken() {
    return this.http.post<{ accessToken: AccessToken }>(
      this.authApiUrl + 'refresh',
      { refreshToken: localStorage.getItem(this.storageRefreshTokenKey) }
    ).pipe(
      tap(({ accessToken }) => {
        localStorage.setItem(this.storageAccessTokenKey, accessToken);
      })
    )
  }

  logout(): void {
    localStorage.removeItem(this.storageAccessTokenKey);
    localStorage.removeItem(this.storageRefreshTokenKey);
  }
}

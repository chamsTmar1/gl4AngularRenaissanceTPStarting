import { Injectable, computed, inject, signal } from '@angular/core';
import { CredentialsDto } from '../dto/credentials.dto';
import { LoginResponseDto } from '../dto/login-response.dto';
import { HttpClient } from '@angular/common/http';
import { API } from '../../../config/api.config';
import { Observable, of, tap } from 'rxjs';
import { CONSTANTES } from 'src/config/const.config';

interface UserState {
  token: string | null;
  userId: string | null;
  email: string | null;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);

  userState = signal<UserState>({
    token: null,
    userId: null,
    email: null,
  });

  authenticated = computed(() => !!this.userState().token);

  constructor() {
    this.loadUserState();
  }

  login$ = (credentials: CredentialsDto): Observable<LoginResponseDto> =>
    this.http.post<LoginResponseDto>(API.login, credentials).pipe(
      tap((response: LoginResponseDto) => {
        const userState: UserState = {
          token: response.id,
          userId: response.userId.toString(),
          email: credentials.email,
        };
        this.setUserState(userState);
      })
    );

  logout$ = (): Observable<void> =>
    of(undefined).pipe(
      tap(() => {
        this.clearUserState();
      })
    );

  private setUserState(userState: UserState) {
    localStorage.setItem(CONSTANTES.tokenKey, userState.token!);
    localStorage.setItem(
      CONSTANTES.userData,
      JSON.stringify({
        userId: userState.userId,
        email: userState.email,
      })
    );
    this.userState.set(userState);
  }

  private clearUserState() {
    localStorage.removeItem(CONSTANTES.tokenKey);
    localStorage.removeItem(CONSTANTES.userData);
    this.userState.set({ token: null, userId: null, email: null });
  }

  private loadUserState() {
    const token = localStorage.getItem(CONSTANTES.tokenKey);
    const userData = localStorage.getItem(CONSTANTES.userData);

    if (token && userData) {
      const { userId, email } = JSON.parse(userData);
      const userState: UserState = { token, userId, email };
      this.userState.set(userState);
    }
  }
}

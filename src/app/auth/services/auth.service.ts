import { Injectable, computed, inject, signal } from '@angular/core';
import { CredentialsDto } from '../dto/credentials.dto';
import { LoginResponseDto } from '../dto/login-response.dto';
import { HttpClient } from '@angular/common/http';
import { API } from '../../../config/api.config';
import { Observable, tap } from 'rxjs';
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

    login(credentials: CredentialsDto): Observable<LoginResponseDto> {
      return this.http.post<LoginResponseDto>(API.login, credentials).pipe(
        tap(response => {
          const userState: UserState = {
            token: response.id,
            userId: response.userId.toString(),
            email: credentials.email,
          };
          
          localStorage.setItem(CONSTANTES.tokenKey, response.id);
          localStorage.setItem(CONSTANTES.userData, JSON.stringify({ userId: response.userId, email: credentials.email }));
          this.userState.set(userState);
        })
      );
    }


  logout() {
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

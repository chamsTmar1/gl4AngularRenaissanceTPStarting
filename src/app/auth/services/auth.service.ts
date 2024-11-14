import { Injectable, inject } from '@angular/core';
import { CredentialsDto } from '../dto/credentials.dto';
import { LoginResponseDto } from '../dto/login-response.dto';
import { HttpClient } from '@angular/common/http';
import { API } from '../../../config/api.config';
import { Observable } from 'rxjs';
import { CONSTANTES } from 'src/config/const.config';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);


  login(credentials: CredentialsDto): Observable<LoginResponseDto> {
    return this.http.post<LoginResponseDto>(API.login, credentials);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem(CONSTANTES.tokenKey);
  }

  logout() {
    localStorage.removeItem(CONSTANTES.tokenKey);
  }
}

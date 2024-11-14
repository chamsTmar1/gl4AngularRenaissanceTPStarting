import { inject } from '@angular/core';
import {HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { CONSTANTES } from 'src/config/const.config';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  
  if (authService.isAuthenticated()) {
    const token = localStorage.getItem(CONSTANTES.tokenKey) ?? '';
    const clonedRequest = req.clone({
      setHeaders: {
        Authorization: token,
      },
    });
    return next(clonedRequest);
  }
  return next(req);
};

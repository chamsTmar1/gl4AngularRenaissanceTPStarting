import { Component, inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { CredentialsDto } from '../dto/credentials.dto';
import { ROUTES, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { APP_ROUTES } from '../../../config/routes.config';
import { FormsModule } from '@angular/forms';
import { CONSTANTES } from 'src/config/const.config';
import { catchError, of, Subject, switchMap, tap } from 'rxjs';
import { CommonModule } from '@angular/common';


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    standalone: true,
    imports: [FormsModule, CommonModule],
})
export class LoginComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  private toastr = inject(ToastrService);

  private loginFormSubmit$ = new Subject<CredentialsDto>();

  loginResult$ = this.loginFormSubmit$.pipe(
    switchMap((credentials: CredentialsDto) =>
      this.authService.login$(credentials).pipe(
        tap(() => {
          this.toastr.success('Bienvenu chez vous :)');
          this.router.navigate([APP_ROUTES.cv]);
        }),
        catchError((error) => {
          this.toastr.error('Veuillez vérifier vos credentials');
          return of({ error: true });
        })
      )
    )
  );

  login(credentials: CredentialsDto) {
    this.loginFormSubmit$.next(credentials);
  }
}

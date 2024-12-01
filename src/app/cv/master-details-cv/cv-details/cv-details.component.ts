import { Component } from '@angular/core';
import { CvService } from '../../services/cv.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../auth/services/auth.service';
import { catchError, exhaustMap, of, Subject, switchMap, tap } from 'rxjs';
import { APP_ROUTES } from '../../../../config/routes.config';
import { Cv } from '../../model/cv';

@Component({
  selector: 'app-cv-details',
  templateUrl: './cv-details.component.html',
  styleUrl: './cv-details.component.css',
})
export class CvDetailsComponent {
  constructor(
    private cvService: CvService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    public authService: AuthService
  ) {}

  $cv = this.activatedRoute.params.pipe(
    switchMap((params) => this.cvService.getCvById(+params['id'])),
    catchError(() => {
      this.router.navigate([APP_ROUTES.cv]);
      return of(null);
    })
  );

  private deleteSubject = new Subject<Cv>();
  deleteResult$ = this.deleteSubject.pipe(
    exhaustMap((cv) =>
      this.cvService.deleteCvById(cv.id).pipe(
        tap(() => {
          this.toastr.success(`${cv.name} supprimé avec succès`);
          this.router.navigate(['cv/list']);
        }),
        catchError(() => {
          this.toastr.error(
            `Problème avec le serveur veuillez contacter l'admin`
          );
          return of(null);
        })
      )
    )
  );

  onDelete(cv: Cv) {
    this.deleteSubject.next(cv);
  }
}

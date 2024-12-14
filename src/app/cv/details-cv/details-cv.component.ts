import { Component, OnInit } from '@angular/core';
import { Cv } from '../model/cv';
import { CvService } from '../services/cv.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { APP_ROUTES } from '../../../config/routes.config';
import { AuthService } from '../../auth/services/auth.service';
import { catchError, exhaustMap, of, Subject, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-details-cv',
  templateUrl: './details-cv.component.html',
  styleUrls: ['./details-cv.component.css'],
})
export class DetailsCvComponent {
  //cv: Cv | null = null;
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
      this.router.navigate([APP_ROUTES.cv, 'list']);
      return of(null);
    })
  );

  private deleteSubject = new Subject<Cv>();
  deleteResult$ = this.deleteSubject.pipe(
    exhaustMap((cv) =>
      this.cvService.deleteCvById(cv.id).pipe(
        tap(() => {
          this.toastr.success(`${cv.name} supprimé avec succès`);
          this.cvService.cvToRemove$.next(cv);
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

import { Component, OnInit } from '@angular/core';
import { Cv } from '../model/cv';
import { CvService } from '../services/cv.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { APP_ROUTES } from '../../../config/routes.config';
import { AuthService } from '../../auth/services/auth.service';
import { catchError, of, Subject, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-details-cv',
  templateUrl: './details-cv.component.html',
  styleUrls: ['./details-cv.component.css'],
})
export class DetailsCvComponent implements OnInit {
  //cv: Cv | null = null;
  constructor(
    private cvService: CvService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    public authService: AuthService
  ) {}

  /*
  $cv = this.cvService.getCvById(+this.activatedRoute.snapshot.params['id']).pipe(
    catchError(() => {
      this.router.navigate([APP_ROUTES.cv]);
      return of(null);
    })
  );
  */

  //syntaxe : activatedRoute.params.subscribe(params=>{this.monParam=params['param']});
  
  $cv = this.activatedRoute.params.pipe(
    switchMap((params) => this.cvService.getCvById(+params['id'])),
    catchError(() => {
      this.router.navigate([APP_ROUTES.cv]);
      return of(null);
    })
  );


  private deleteSubject = new Subject<Cv>();
  deleteResult$ = this.deleteSubject.pipe(
    switchMap((cv) =>
      this.cvService.deleteCvById(cv.id).pipe(
        tap(() => {
          this.toastr.success(`${cv.name} supprimé avec succès`);
          this.router.navigate([APP_ROUTES.cv]);
        }),
        catchError(() => {
          this.toastr.error(`Problème avec le serveur veuillez contacter l'admin`);
          return of(null);
        })
      )
    )
  );

  ngOnInit() {
    /*
    const id = this.activatedRoute.snapshot.params['id'];
    this.cvService.getCvById(+id).subscribe({
        next: (cv) => {
          this.cv = cv;
        },
        error: (e) => {
          this.router.navigate([APP_ROUTES.cv]);
        },
      });
    }
    */
  }

  onDelete(cv: Cv) {
    this.deleteSubject.next(cv);
  }
}
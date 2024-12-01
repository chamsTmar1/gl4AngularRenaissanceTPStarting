import { Component } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';
import { LoggerService } from '../../services/logger.service';
import { ToastrService } from 'ngx-toastr';
import { CvService } from '../services/cv.service';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Cv } from '../model/cv';

@Component({
  selector: 'app-master-details-cv',
  templateUrl: './master-details-cv.component.html',
  styleUrl: './master-details-cv.component.css',
})
export class MasterDetailsCvComponent {
  cvs$: Observable<Cv[]>;
  constructor(
    private logger: LoggerService,
    private toastr: ToastrService,
    private cvService: CvService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.logger.logger('je suis le cvComponent');
    this.toastr.info('Bienvenu dans notre CvTech');
    this.cvs$ = this.cvService.getCvs().pipe(
      catchError(() => {
        this.toastr.error(`
          Attention!! Les données sont fictives, problème avec le serveur.
          Veuillez contacter l'admin.`);
        return of(this.cvService.getFakeCvs());
      })
    );
  }

  selectedCv$ = this.cvService.selectCv$
    .pipe(
      tap((cv) => {
        this.router.navigate([cv.id], { relativeTo: this.activatedRoute });
      }),
      takeUntilDestroyed()
    )
    .subscribe();
}

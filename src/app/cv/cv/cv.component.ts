import { Component } from '@angular/core';
import { Cv } from '../model/cv';
import { LoggerService } from '../../services/logger.service';
import { ToastrService } from 'ngx-toastr';
import { CvService } from '../services/cv.service';
import { catchError, map, of, shareReplay } from 'rxjs';
import { DatePipe } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-cv',
  templateUrl: './cv.component.html',
  styleUrls: ['./cv.component.css'],
  providers: [DatePipe],
})
export class CvComponent {
  //cvs: Cv[] = [];
  //selectedCv: Cv | null = null;
  //date = new Date();

  cvs$ = this.cvService.getCvs().pipe(
    shareReplay(1),
    catchError(() => {
      this.toastr.error(`
        Attention!! Les données sont fictives, problème avec le serveur.
        Veuillez contacter l'admin.`);
      return of(this.cvService.getFakeCvs());
    })
  );

  juniors$ = this.cvs$.pipe(map((cvs) => cvs.filter((cv) => cv.age < 40)));

  seniors$ = this.cvs$.pipe(map((cvs) => cvs.filter((cv) => cv.age >= 40)));

  selectedCv$ = this.cvService.selectCv$.pipe(
    catchError(() => of(null)),
    takeUntilDestroyed()
  );

  date$ = of(new Date()).pipe(
    map((date) => this.datePipe.transform(date, 'fullDate')?.toUpperCase())
  );

  constructor(
    private logger: LoggerService,
    private toastr: ToastrService,
    private cvService: CvService,
    private datePipe: DatePipe
  ) {
    /*
    this.cvService.getCvs().subscribe({
      next: (cvs) => {
        this.cvs = cvs;
      },
      error: () => {
        this.cvs = this.cvService.getFakeCvs();
        this.toastr.error(`
          Attention!! Les données sont fictives, problème avec le serveur.
          Veuillez contacter l'admin.`);
      },
    });
    */
    this.logger.logger('je suis le cvComponent');
    this.toastr.info('Bienvenu dans notre CvTech');
    //this.cvService.selectCv$.subscribe((cv) => (this.selectedCv = cv));
  }
}

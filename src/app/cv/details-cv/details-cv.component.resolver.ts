import { inject } from '@angular/core';
import { ResolveFn, Router } from '@angular/router';
import { Cv } from '../model/cv';
import { CvService } from '../services/cv.service';
import { catchError, Observable, throwError } from 'rxjs';
import { APP_ROUTES } from 'src/config/routes.config';

export const cvDetailsResolver: ResolveFn<Cv> = (
  route
): Observable<Cv> => {
  const cvService = inject(CvService);
  const id = route.params['id'];
  const router = inject(Router)
  return cvService.getCvById(+id).pipe(
    catchError((e) => {
        router.navigate([APP_ROUTES.cv]);
        return throwError(() => {new Error(e)});
      },
  ));
};
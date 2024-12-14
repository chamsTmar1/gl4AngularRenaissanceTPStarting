import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { CvService } from '../services/cv.service';
import { debounceTime, map, switchMap, catchError, of, Observable, distinctUntilChanged } from 'rxjs';

export function uniqueCinValidator(cvService: CvService): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    return of(control.value).pipe(
      distinctUntilChanged(),
      debounceTime(300),
      switchMap((value) =>
        cvService.selectByProperty('cin', value).pipe(
          map((cvs) => {
            const isUnique = !(cvs && cvs.length > 0);
            return isUnique ? null : { cinNotUnique: true };
          }),
          catchError((err) => {
            console.error('Erreur de validation:', err);
            return of(null);
          })
        )
      )
    );
  }
}


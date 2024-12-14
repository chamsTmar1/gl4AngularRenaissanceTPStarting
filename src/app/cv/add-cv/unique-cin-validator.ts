import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { CvService } from '../services/cv.service';
import { debounceTime, map, switchMap, catchError, of, Observable, distinctUntilChanged } from 'rxjs';

export function uniqueCinValidator(cvService: CvService): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    if (!control.value) {
      return of(null); 
    }

    return of(control.value).pipe(
      debounceTime(300), 
      distinctUntilChanged(), 
      switchMap((cin) => 
        cvService.checkCinExists(cin).pipe(
          map((exists) => (exists ? { cinTaken: true } : null)),
          catchError(() => of(null)) 
        )
      )
    );
  };
}

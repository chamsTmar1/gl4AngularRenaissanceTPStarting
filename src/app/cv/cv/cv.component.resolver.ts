import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Observable } from 'rxjs';
import { Cv } from '../model/cv';
import { CvService } from '../services/cv.service';

export const CvsResolver: ResolveFn<Cv[]> = (): Observable<Cv[]> => {
  const cvService = inject(CvService);
  return cvService.getCvs();
};
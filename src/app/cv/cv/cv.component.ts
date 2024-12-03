import { Component,inject , signal, WritableSignal} from '@angular/core';
import { Cv } from '../model/cv';
import { LoggerService } from '../../services/logger.service';
import { ToastrService } from 'ngx-toastr';
import { CvService } from '../services/cv.service';

@Component({
  selector: 'app-cv',
  templateUrl: './cv.component.html',
  styleUrls: ['./cv.component.css'],
})
export class CvComponent {
  private readonly logger = inject(LoggerService);
  private readonly toastr = inject(ToastrService);
  private readonly cvService = inject(CvService);

  cvs: WritableSignal<Cv[]> =signal([]);
  selectedCv: WritableSignal<Cv | null> = signal(null);
  
  /*   selectedCv: Cv | null = null; */
  date = new Date();
  constructor() {
    this.cvService.getCvs().subscribe({
      next: (cvs) => {
        this.cvs.set(cvs);
      },
      error: () => {
        this.cvs.set(this.cvService.getFakeCvs());
        this.toastr.error(`
          Attention!! Les données sont fictives, problème avec le serveur.
          Veuillez contacter l'admin.`);
      },
    });
    this.logger.logger('je suis le cvComponent');
    this.toastr.info('Bienvenu dans notre CvTech');
    this.selectedCv.set(this.cvService.selectCv$);
  }
}
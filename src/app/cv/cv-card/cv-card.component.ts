import { Component, Input, inject, Signal, signal, WritableSignal } from '@angular/core';
import { Cv } from '../model/cv';
import { EmbaucheService } from '../services/embauche.service';
import { ToastrService } from 'ngx-toastr';
@Component({
    selector: 'app-cv-card',
    templateUrl: './cv-card.component.html',
    styleUrls: ['./cv-card.component.css'],

})
export class CvCardComponent {
  private embaucheService = inject(EmbaucheService);
  private toastr = inject(ToastrService);
  constructor() {}
  @Input() cv!: WritableSignal<Cv |null> ;

  ngOnInit() {}
  embaucher() {
    if (this.cv()) {
      if (this.embaucheService.embauche(this.cv)) {
        this.toastr.success(
          `${this.cv()?.firstname} ${this.cv()?.name} a été pré embauché`
        );
      } else {
        this.toastr.warning(
          `${this.cv()?.firstname} ${this.cv()?.name} est déjà pré embauché`
        );
      }
    }
  }
}
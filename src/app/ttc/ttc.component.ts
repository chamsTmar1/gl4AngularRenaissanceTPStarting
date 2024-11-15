import { CurrencyPipe } from '@angular/common';
import {
  Component,
  computed,
  input,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-ttc',
  standalone: true,
  imports: [FormsModule, CurrencyPipe],
  templateUrl: './ttc.component.html',
  styleUrl: './ttc.component.css',
})
export class TtcComponent {
  prixHtc: Signal<number> = signal(0);
  quantite: Signal<number> = signal(0);
  tva: Signal<number> = signal(0);
  discount: Signal<number> = computed(() => {
    if (this.quantite() > 15) return 0.3;
    if (this.quantite() > 10) return 0.2;
    return 0;
  });

  prixUnitaire: Signal<number> = computed(() => this.prixHtc() * this.tva());
  prixTotal: Signal<number> = computed(
    () => this.prixUnitaire() * this.quantite()
  );
  discountTotal: Signal<number> = computed(
    () => this.prixTotal() * this.discount()
  );

  calculatePrixUnitaire(): number {
    console.log('a');

    return this.prixHtc() * this.tva();
  }
  calculatePrixTotal(): number {
    console.log('b');
    return this.calculatePrixUnitaire() * this.quantite();
  }

  calculateDiscount() {
    console.log('c');

    return this.calculatePrixTotal() * this.discount();
  }
}

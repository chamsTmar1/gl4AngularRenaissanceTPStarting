import { Injectable, signal } from '@angular/core';
import { Cv } from '../model/cv';
import { Signal,WritableSignal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EmbaucheService {
  private embauchees: WritableSignal<Cv[]> = signal([]);

  constructor() {}

  /**
   *
   * Retourne la liste des embauchees
   *
   * @returns Signal<Cv[]>
   *
   */
  getEmbauchees():Signal<Cv[]> {
    return this.embauchees;
  }

  /**
   *
   * Embauche une personne si elle ne l'est pas encore
   * Sinon il retourne false
   *
   * @param cv : Cv
   * @returns boolean
   */
  embauche(cv: Signal<Cv | null>): boolean {
    if (cv() && this.embauchees().indexOf(cv() as Cv) == -1) {
      this.embauchees.update((embauchees) => [...embauchees, cv() as Cv]);
      return true;
    }

    return false;
  }
}
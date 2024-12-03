import { Injectable, inject} from "@angular/core";
import { Cv } from "../model/cv";
import { Observable } from "rxjs";
import { HttpClient, HttpParams } from "@angular/common/http";
import { API } from "../../../config/api.config";
import {signal, WritableSignal } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class CvService {
  private http = inject(HttpClient);

  private cvs: Cv[] = [
    new Cv(1, "aymen", "sellaouti", "teacher", "as.jpg", "1234", 40),
    new Cv(2, "skander", "sellaouti", "enfant", "       ", "1234", 4),
  ];

  /**
   * Le signal permettant de créer le flux des cvs sélectionnés
   */
  private selectedCvSignal: WritableSignal<Cv | null> = signal(null);

  /**
   * Le flux des cvs sélectionnés
   */
  get selectCv$(): Cv | null {
    return this.selectedCvSignal();
  }

  constructor() {}

  /**
   *
   * Retourne un liste fictive de cvs
   *
   * @returns CV[]
   *
   */
  getFakeCvs(): Cv[] {
    return this.cvs;
  }

  /**
   *
   * Retourne la liste des cvs de l'API
   *
   * @returns Observable<Cv[]>
   *
   */
  getCvs(): Observable<Cv[]> {
    return this.http.get<Cv[]>(API.cv);
  }

  /**
   *
   * supprime un cv par son id de l'API
   *
   * @param id: number
   * @returns Observable<any>
   *
   */
  deleteCvById(id: number): Observable<any> {
    return this.http.delete<any>(API.cv + id);
  }

  addCv(cv: Cv): Observable<Cv> {
    return this.http.post<any>(API.cv, cv);
  }

  /**
   *
   * Retourne un cv par son id de l'API
   *
   * @param id: number
   * @returns Observable<Cv>
   *
   */
  getCvById(id: number): Observable<Cv> {
    return this.http.get<Cv>(API.cv + id);
  }

  /**
   *
   * Cherche un cv avec son id dans la liste fictive de cvs
   *
   * @param id
   * @returns Cv | null
   */
  findCvById(id: number): Cv | null {
    return this.cvs.find((cv) => cv.id == id) ?? null;
  }

  /**
   *
   * Supprime un cv s'il le trouve
   *
   * @param cv : Cv
   * @returns boolean
   */
  deleteCv(cv: Cv): boolean {
    const index = this.cvs.indexOf(cv);
    if (index > -1) {
      this.cvs.splice(index, 1);
      return true;
    }
    return false;
  }

  /**
   * Recherche les cvs dont le name contient la chaine name passée en paramètre
   * @param name : string
   * @returns Observable<Cv[]>
   */
  selectByName(name: string): Observable<Cv[]> {
    const search = `{"where":{"name":{"like":"%${name}%"}}}`;
    const params = new HttpParams().set("filter", search);
    return this.http.get<any>(API.cv, { params });
  }

  /**
   * Recherche les cvs dont la valeur est égale à la chaine passée en paramètre
   * @param property : string, la propriété sur laquelle on va requêter
   * @param value : string, la valeur de la propriété sur laquelle on va requêter
   * @returns Observable<Cv[]>
   */
  selectByProperty(property: string, value: string): Observable<Cv[]> {
    const search = `{"where":{"${property}":"${value}"}}`;
    const params = new HttpParams().set("filter", search);
    return this.http.get<Cv[]>(API.cv, { params });
  }

  /**
   * Permet d'ajouter un cv au flux des cvs sélectionnés
   *
   * @param cv : Le cv à ajouter dans le flux des cvs sélectionnés
   */
  selectCv(cv: Cv) {
    this.selectedCvSignal.set(cv);
  }
}
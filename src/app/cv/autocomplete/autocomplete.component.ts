import { Component, inject } from "@angular/core";
import { FormBuilder, AbstractControl } from "@angular/forms";
import { catchError, debounceTime, distinctUntilChanged, of, switchMap, tap } from "rxjs";
import { CvService } from "../services/cv.service";

@Component({
  selector: "app-autocomplete",
  templateUrl: "./autocomplete.component.html",
  styleUrls: ["./autocomplete.component.css"],
})
export class AutocompleteComponent {
  formBuilder = inject(FormBuilder);
  cvService = inject(CvService);
  get search(): AbstractControl {
    return this.form.get("search")!;
  }
  form = this.formBuilder.group({ search: [""] });
  filteredCvs$ = this.search.valueChanges.pipe(
    debounceTime(900),
    distinctUntilChanged(),
    switchMap((name) =>
      name
        ? this.cvService.selectByName(name).pipe(catchError(() => of([])))
        : of([])
    )
  );
}

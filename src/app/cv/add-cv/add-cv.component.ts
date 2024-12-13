import { Component } from "@angular/core";
import {
  AbstractControl,
  FormBuilder,
  Validators,
} from "@angular/forms";
import { CvService } from "../services/cv.service";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { APP_ROUTES } from "src/config/routes.config";
import { Cv } from "../model/cv";
import { cinAgeValidator } from "../Validators/cin-age-validator";


@Component({
  selector: "app-add-cv",
  templateUrl: "./add-cv.component.html",
  styleUrls: ["./add-cv.component.css"],
})
export class AddCvComponent {
  constructor(
    private cvService: CvService,
    private router: Router,
    private toastr: ToastrService,
    private formBuilder: FormBuilder
  ) {}


  form = this.formBuilder.group(
    {
      name: ["", Validators.required],
      firstname: ["", Validators.required],
      path: [""],
      job: ["", Validators.required],
      cin: ["",
    ],
      age: [
        14,
        {
          validators: [Validators.required, Validators.min(14)],
        },
      ],
    },
  );


  ngOnInit() {


    const ageControl = this.form.get("age");
    const cinControl = this.form.get("cin");
 
    // ici on'est en train d'appliqueer  uen validation initiale
    if (cinControl && ageControl) {
      cinControl.setValidators([
        Validators.required,
        Validators.pattern("[0-9]{8}"),
        cinAgeValidator(ageControl.value!),
      ]);
      cinControl.updateValueAndValidity();
    }
    // validation dynamique du champ CIN en fonction des changements de l'âge
    ageControl?.valueChanges.subscribe((age) => {
      if (cinControl && age) {
        cinControl.setValidators([
           Validators.required,
           Validators.pattern("[0-9]{8}"),
           cinAgeValidator(age),
        ]);
        cinControl.updateValueAndValidity();

      }
    });

    
  }
 
 
  addCv() {
    this.cvService.addCv(this.form.value as Cv).subscribe({
      next: (cv) => {
        this.router.navigate([APP_ROUTES.cv]);
        this.toastr.success(`Le cv ${cv.firstname} ${cv.name}`);
      },
      error: (err) => {
        this.toastr.error(
          `Une erreur s'est produite, Veuillez contacter l'admin`
        );
      },
    });
  }


  get name(): AbstractControl {
    return this.form.get("name")!;
  }
  get firstname() {
    return this.form.get("firstname");
  }
  get age(): AbstractControl {
    return this.form.get("age")!;
  }
  get job() {
    return this.form.get("job");
  }
  get path() {
    return this.form.get("path");
  }
  get cin(): AbstractControl {
    return this.form.get("cin")!;
  }
}



import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { CvService } from '../services/cv.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { APP_ROUTES } from 'src/config/routes.config';
import { Cv } from '../model/cv';
import { CONSTANTES } from '../../../config/const.config';
import { cinAgeValidator } from '../Validators/cin-age-validator';
import { uniqueCinValidator } from './unique-cin-validator';

@Component({
  selector: 'app-add-cv',
  templateUrl: './add-cv.component.html',
  styleUrls: ['./add-cv.component.css'],
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
      name: ['', Validators.required],
      firstname: ['', Validators.required],
      path: [''],
      job: ['', Validators.required],
      cin: [
        '',
        {
          validators: [Validators.required, Validators.pattern('[0-9]{8}')],
          asyncValidators: [uniqueCinValidator(this.cvService)],
          updateOn: 'blur', // to minimize API calls
        },
      ],
      age: [
        0,
        {
          validators: [Validators.required, Validators.min(0)],
        },
      ],
    },
    { validators: cinAgeValidator() }
  );

  ngOnInit(): void {
    this.form.get('path')?.disable();

    this.age.valueChanges.subscribe((age) => {
      age = Number(age);
      if (!age || age < 18) {
        this.path?.disable();
        this.path?.reset();
        return;
      }
      this.path?.enable();
    });

    const cachedCvstr = localStorage.getItem(CONSTANTES.formCache);
    if (cachedCvstr) {
      this.form.patchValue(JSON.parse(cachedCvstr));
    }

    this.form.valueChanges.subscribe((form) => {
      localStorage.setItem(CONSTANTES.formCache, JSON.stringify(form));
    });
  }

  addCv() {
    this.cvService.addCv(this.form.value as Cv).subscribe({
      next: (cv) => {
        this.router.navigate([APP_ROUTES.cv]);
        this.toastr.success(`Le cv ${cv.firstname} ${cv.name}`);
        localStorage.removeItem(CONSTANTES.formCache);
      },
      error: (err) => {
        this.toastr.error(
          `Une erreur s'est produite, Veuillez contacter l'admin`
        );
      },
    });
  }

  get name(): AbstractControl {
    return this.form.get('name')!;
  }
  get firstname() {
    return this.form.get('firstname');
  }
  get age(): AbstractControl {
    return this.form.get('age')!;
  }
  get job() {
    return this.form.get('job');
  }
  get path() {
    return this.form.get('path');
  }
  get cin(): AbstractControl {
    return this.form.get('cin')!;
  }
}

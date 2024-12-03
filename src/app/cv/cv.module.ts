import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from "@angular/router";
import { CvComponent } from "./cv/cv.component";
import { AddCvComponent } from "./add-cv/add-cv.component";
import { AuthGuard } from "../auth/guards/auth.guard";
import { DetailsCvComponent } from "./details-cv/details-cv.component";
import { CvsResolver } from './cv/cv.component.resolver';
import { cvDetailsResolver } from './details-cv/details-cv.component.resolver';

const routes: Routes = [
  {
    path: '',
    component: CvComponent,
    resolve: {
      cvs: CvsResolver
    }
  },
  { path: 'add', component: AddCvComponent, canActivate: [AuthGuard] },
  {
    path: ':id', component: DetailsCvComponent, resolve: {
      cvDetails: cvDetailsResolver
    }
  },
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
  ],
  exports: [RouterModule],
})
export class CvModule { }
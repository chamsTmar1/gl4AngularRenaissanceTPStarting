import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import { CvComponent } from './cv/cv.component';
import { AddCvComponent } from './add-cv/add-cv.component';
import { AuthGuard } from '../auth/guards/auth.guard';
import { DetailsCvComponent } from './details-cv/details-cv.component';


const routes : Routes = [
  { path : '', component : CvComponent },
  { path : 'add', component: AddCvComponent, canActivate: [AuthGuard] },
  { path : ':id', component : DetailsCvComponent }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ],
  exports: [RouterModule]
})
export class CvModule { }

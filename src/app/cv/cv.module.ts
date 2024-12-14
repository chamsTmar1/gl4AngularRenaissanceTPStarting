import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import { CvComponent } from './cv/cv.component';
import { AddCvComponent } from './add-cv/add-cv.component';
import { AuthGuard } from '../auth/guards/auth.guard';
import { DetailsCvComponent } from './details-cv/details-cv.component';
import { CvCardComponent } from './cv-card/cv-card.component';
import { AutocompleteComponent } from './autocomplete/autocomplete.component';
import { ListComponent } from './list/list.component';
import { ItemComponent } from './item/item.component';
import { DefaultImagePipe } from './pipes/default-image.pipe';
import { EmbaucheComponent } from './embauche/embauche.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MasterDetailsCvComponent } from './master-details-cv/master-details-cv.component';

const routes : Routes = [
  { path : '', component : CvComponent },
  { path : 'add', component: AddCvComponent, canActivate: [AuthGuard] },
  { path : ':id', component : DetailsCvComponent }
];

@NgModule({
  declarations: [
    CvComponent,
    AddCvComponent,
    DetailsCvComponent,
    CvCardComponent,
    AutocompleteComponent,
    ListComponent,
    ItemComponent,
    DefaultImagePipe,
    EmbaucheComponent,
    MasterDetailsCvComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    RouterModule,
    CvComponent,
  ]
})
export class CvModule { }

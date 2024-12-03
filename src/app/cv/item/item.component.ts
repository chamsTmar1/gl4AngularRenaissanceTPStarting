import { Component, Input, Output, EventEmitter } from "@angular/core";
import { Cv } from "../model/cv";
import { CvService } from "../services/cv.service";
import { DefaultImagePipe } from '../pipes/default-image.pipe';
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-item",
  templateUrl: "./item.component.html",
  styleUrls: ["./item.component.css"],
})
export class ItemComponent {
  @Input({ required: true }) cv!: Cv;
  @Input() size = 50;
  constructor(private cvService: CvService) {}

  onSelectCv() {
    this.cvService.selectCv(this.cv);
  }
}
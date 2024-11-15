import { Component, Input, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RainbowDirective } from '../../directives/rainbow/rainbow.directive';

@Component({
  selector: 'app-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.css'],
  imports: [RainbowDirective],
  standalone: true,
})
export class ColorComponent implements OnInit {
  private activatedRoute = inject(ActivatedRoute);

  @Input() defaultColor = 'red';

  /**
   *
   * The color representing the Div
   */
  divColor = '';

  /**
   * It change the div backgound color
   *
   * @param newColor: string
   */

  constructor() {
    console.log('In constructor', this.defaultColor);
  }

  ngOnInit(): void {
    console.log('In ngOnInit', this.defaultColor);
    this.divColor = this.defaultColor;
  }

  changeColor(newColor: string) {
    this.divColor = newColor;
  }
}

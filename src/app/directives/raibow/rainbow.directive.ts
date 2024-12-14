import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: 'input[appRainbow]',
})
export class RainbowDirective {
  private colors: string[] = [
    'red',
    'orange',
    'yellow',
    'green',
    'blue',
    'indigo',
    'violet',
  ];

  @HostBinding('style.borderColor')
  borderColor!: string;

  @HostBinding('style.color')
  textColor!: string;

  constructor() {}

  @HostListener('keyup') onKeyUp() {
    const randomColor =
      this.colors[Math.floor(Math.random() * this.colors.length)];
    this.textColor = randomColor;
    this.borderColor = randomColor;
  }
}

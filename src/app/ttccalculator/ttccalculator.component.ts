import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ttccalculator',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './ttccalculator.component.html',
  styleUrl: './ttccalculator.component.css'
})


export class TTCCalculatorComponent {
  priceHT: number = 0 ;  
  quantity: number = 1 ; 
  tva: number = 18 ;     
  discount: number = 0; 
  totalPrice: number = 0; 

  calculateTotalPrice() {
    let basePrice = this.priceHT * this.quantity;
    let tvaAmount = basePrice * ( this.tva / 100 );
    this.discount = 0;

    if (this.quantity >= 10 && this.quantity <= 15) {
      this.discount = 0.20 * (basePrice + tvaAmount);
    } else if (this.quantity > 15) {
      this.discount = 0.30 * (basePrice + tvaAmount);
    }

    this.totalPrice = basePrice + tvaAmount - this.discount;
  }
}


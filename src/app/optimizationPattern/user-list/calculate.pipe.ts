import { Pipe, PipeTransform } from "@angular/core";

export const fibonnaci = (() => {
  const memo: Record<number, number> = {};
  
  return (n: number): number => {
    if (n === 0 || n === 1) {
      return 1;
    }
    if (memo[n] !== undefined) {
      return memo[n]; 
    }
    memo[n] = fibonnaci(n - 1) + fibonnaci(n - 2);
    return memo[n];
  };
})();

@Pipe({
  name: 'calculate',
  pure: true 
})
export class CalculatePipe implements PipeTransform {
  transform(value: number): number {
    const fib = fibonnaci(value);
    console.log({ value, fib }); 
    return fib;
  }
}

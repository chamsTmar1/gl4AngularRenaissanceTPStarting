import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";



export function cinAgeValidator() : ValidatorFn {

    return(control :AbstractControl):ValidationErrors  | null =>{
        

        const cin=control.get('cin')?.value;
        const age=control.get('age')?.value;
        
   
        const firstnumcin=parseInt(cin.substring(0, 2), 10);
        if(age>=60){
            if(firstnumcin>19||firstnumcin<0){
                return {  cinFirstTwoNumInvalid: true}
            }
        }

        else {
            if(firstnumcin <=19){
                return { cinFirstTwoNumInvalid: true}

            }
        }

        return null;




}

}
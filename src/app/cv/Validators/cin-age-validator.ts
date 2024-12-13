import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";



export function cinAgeValidator(age : number) : ValidatorFn {

    return(control :AbstractControl):ValidationErrors  | null =>{


        const cin=control.value;

        if (!cin || cin.length !== 8) {
            return {invalidcinlength:true}
         }
         
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
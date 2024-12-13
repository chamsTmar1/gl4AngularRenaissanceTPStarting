import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";



export function cinAgeValidator() : ValidatorFn {

    return(control :AbstractControl):ValidationErrors  | null =>{
        

        const cin=control.get('cin');
        const age=control.get('age');

        if ((age?.value == null || cin?.value==null || cin?.value.length <2)) return null;


        const firstNumCin=parseInt(cin?.value.substring(0, 2), 10);
        if(age?.value>=60){
            if(firstNumCin>19||firstNumCin<0){
                return {  cinFirstTwoNumInvalid: true}
            }
        }

        else {
            if(firstNumCin <=19){
                return { cinFirstTwoNumInvalid: true}

            }
        }

        return null;




}

}
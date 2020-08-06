import { AbstractControl, ValidatorFn } from '@angular/forms';

export function nameValidator(forbidenName: RegExp): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
        const checker = forbidenName.test(control.value);
    
        return checker? { "forbidenName": {value: control.value}} : null;
    } 
}
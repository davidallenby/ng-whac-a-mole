import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function validatePlayerNameField(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    // If the field is empty, validate this field successfully
    if (!value) { return null; }

    return (value.length !== 3) ? { length: 'Name must be 3 characters'} : null;
  }
}
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';

@Component({
  selector: 'app-form-group',
  standalone: true,
  imports: [CalendarModule, ReactiveFormsModule, CommonModule],
  templateUrl: './form-group.component.html',
  styleUrl: './form-group.component.css'
})
export class FormGroupComponent {

  person = { firstName: "Mushu", lastName: "Wright", birthday: undefined}

  profileForm = new FormGroup({
    firstName: new FormControl(this.person.firstName, [
      Validators.required,
      Validators.minLength(2)
    ]),
    lastName: new FormControl(this.person.lastName),
    birthday: new FormControl(this.person.birthday, [Validators.required, this.forbiddenFutureDate()])
  });

  get firstName() {
    return this.profileForm.get('firstName');
  }

  get birthday() {
    return this.profileForm.get('birthday');
  }


  onSubmit(): void {
    console.warn(this.profileForm.value);
  }
    
  forbiddenFutureDate(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
        // Check if control.value is a Date object
        if (!(control.value instanceof Date)) {
            return { 'invalidDate': { value: control.value } };
        }

        let currentDate = new Date();

        // Check if control.value is in the future
        if (control.value > currentDate) {
            return { 'forbiddenFutureDate': { value: control.value } };
        }

        // If date is not in the future, return null
        return null;
    };
}
}

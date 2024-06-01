import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { RadioButtonModule } from 'primeng/radiobutton';

interface Person {
  firstName: string;
  lastName: string;
  birthday: Date | undefined;
  category: string;
}

@Component({
  selector: 'app-form-group',
  standalone: true,
  imports: [CommonModule, ButtonModule, CalendarModule, InputTextModule, ReactiveFormsModule, DropdownModule, RadioButtonModule],
  templateUrl: './form-group.component.html',
  styleUrl: './form-group.component.css',
})
export class FormGroupComponent implements OnInit{
  person: Person = { firstName: '', lastName: '', birthday: undefined, category: ''};
  categories = [
    { name: 'Accounting', key: 'A' },
    { name: 'Marketing', key: 'M' },
    { name: 'Production', key: 'P' },
    { name: 'Research', key: 'R' }
];

  profileForm = new FormGroup({
    firstName: new FormControl(this.person.firstName, [
      Validators.required,
      Validators.minLength(2),
    ]),
    lastName: new FormControl(this.person.lastName),
    birthday: new FormControl(this.person.birthday, [
      Validators.required,
      this.forbiddenFutureDate(),
    ]),
    category: new FormControl(this.person.category, [
      Validators.required,
      this.forbiddenCategoryOnWeekend()
    ]),
  });

  get firstName() {
    return this.profileForm.get('firstName');
  }

  get birthday() {
    return this.profileForm.get('birthday');
  }

  get category() {
    return this.profileForm.get('category');
  }

  ngOnInit() {
    this.profileForm.get('birthday')?.valueChanges.subscribe(() => {
      const categoryControl = this.profileForm.get('category');
      categoryControl?.updateValueAndValidity();
    });
  }

  onSubmit(): void {
    console.warn(this.profileForm.value);
  }

  /**
   * Custom validator that checks if the date is in the future
   */
  forbiddenFutureDate(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      // Check if control.value is a Date object, if not return invalidDate error
      if (!(control.value instanceof Date)) {
        return { invalidDate: { value: control.value } };
      }

      const currentDate = new Date();

      // Check if control.value is in the future
      if (control.value > currentDate) {
        return { forbiddenFutureDate: { value: control.value } };
      }

      // If date is not in the future, return null
      return null;
    };
  }

  /**
   * Goofy custom validator that checks if the selected category is "Accounting" and the birthday is on a weekend
   */
  forbiddenCategoryOnWeekend(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      // Get the selected category
      const selectedCategory = control.value;

      // Check if the form control is available
      if (!this.profileForm) {
        return null;
      }

      // Get the birthday from the form control, if it is null return null
      const birthday = this.profileForm.get('birthday')?.value;
      if (birthday === null) {
        return null;
      }
      
      // Check if birthday is a weekend
      if (birthday && (birthday.getDay() === 0 || birthday.getDay() === 6)) {
        // Check if the selected category is "Accounting"
        if (selectedCategory.name === 'Accounting') {
          return { forbiddenCategoryOnWeekend: { value: selectedCategory } };
        }
      }

      // If category is not "Accounting" or birthday is not on a weekend, return null
      return null;
    };
  }
}

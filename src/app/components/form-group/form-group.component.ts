import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-group',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './form-group.component.html',
  styleUrl: './form-group.component.css'
})
export class FormGroupComponent {

  person = { firstName: "Mushu", lastName: "Wright"}

  profileForm = new FormGroup({
    firstName: new FormControl(this.person.firstName, [
      Validators.required,
      Validators.minLength(3)
    ]),
    lastName: new FormControl(this.person.lastName),
  });

  onSubmit(): void {
    console.warn(this.profileForm.value);
  }

}

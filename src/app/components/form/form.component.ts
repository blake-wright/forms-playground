import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent {

  name = new FormControl('');

  ngOnInit(): void {
    this.name.valueChanges.subscribe((name) => {
      console.log('name value: ', name)
    })
  }

  updateName(): void {
    this.name.setValue('President Carter');
  }

}

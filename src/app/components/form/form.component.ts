import { Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ButtonModule, InputTextModule, ReactiveFormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css',
})
export class FormComponent implements OnInit {
  name = new FormControl('');

  ngOnInit(): void {
    this.name.valueChanges.subscribe((name) => {
      console.log('name value: ', name);
    });
  }

  updateName(): void {
    this.name.setValue('President Carter');
  }
}

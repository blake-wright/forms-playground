import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormGroupComponent } from './form-group.component';
import { createNewEvent } from '../../shared/utils';
import { ReactiveFormsModule } from '@angular/forms';

describe('FormGroupComponent', () => {
  let component: FormGroupComponent;
  let fixture: ComponentFixture<FormGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormGroupComponent],
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update the value of the input field', () => {
    const input = fixture.nativeElement.querySelector('input');
    const event = createNewEvent('input');

    input.value = 'test';
    input.dispatchEvent(event);

    expect(fixture.componentInstance.profileForm.get('firstName')?.value).toEqual('test');
  });

  it('should update the value in the control', () => {
    component.profileForm.get('firstName')?.setValue("Mamasita");
    fixture.detectChanges();
    const input = fixture.nativeElement.querySelector('input');
    expect(input.value).toBe('Mamasita');
  });

});

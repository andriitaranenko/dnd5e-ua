import { NgIf } from "@angular/common";
import { Component, Input, forwardRef } from "@angular/core";
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";


@Component({
  selector: 'dnd-ua-input',
  template: `
    <mat-form-field appearance="outline">
      <div class="form-field">
        <mat-label *ngIf="label">{{ label }}</mat-label>
        <input matInput type="text" [(ngModel)]="value" (input)="onChange(value)">

        <!-- <ng-container *ngIf="true">
          <button matSuffix mat-icon-button aria-label="Clear" (click)="resetControl()">
            <mat-icon>close</mat-icon>
          </button>
        </ng-container> -->
      </div>
      
        
    </mat-form-field>
  `,
  styleUrls: ['./input.component.scss'],
  standalone: true,
  imports: [MatInputModule, MatFormFieldModule, MatIconModule, MatButtonModule, NgIf, FormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true
    }
  ]
})
export class InputComponent implements ControlValueAccessor {

  @Input() label!: string;

  @Input() disabled: boolean = false;

  value: any;

  constructor() {}

  resetControl(): void {
    this.value = undefined;
    this.onChange(this.value);
  }

  // Function to call when the value changes.
  onChange = (value: any) => {};

  // Function to call when the input is touched (when a star is clicked).
  onTouched = () => {};

  // Allows Angular to update the model (value).
  // Update the model and changes needed for the view here.
  writeValue(value: any): void {
    this.value = value;
  }

  // Allows Angular to register a function to call when the model (value) changes.
  // Save the function as a property to call later here.
  registerOnChange(fn: (value: number) => void): void {
    this.onChange = fn;
  }

  // Allows Angular to register a function to call when the input has been touched.
  // Save the function as a property to call later here.
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  // Allows Angular to disable the input.
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
import { NgFor } from "@angular/common";
import { Component, Input, forwardRef } from "@angular/core";
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatSelectModule } from "@angular/material/select";


@Component({
  selector: 'dnd-ua-select',
  template: `
    <mat-form-field appearance="outline" class="form-field">
      <mat-label>{{ label }}</mat-label>

      <mat-select multiple [(ngModel)]="value" (selectionChange)="onSelectionChange(value)">
        <ng-container *ngFor="let option of options">
          <mat-option [value]="option.value">{{option.label}}</mat-option>
        </ng-container>
      </mat-select>
    </mat-form-field>
  `,
  styleUrls: ['./select.component.scss'],
  standalone: true,
  imports: [MatSelectModule, MatFormFieldModule, MatIconModule, MatButtonModule, NgFor, FormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true
    }
  ]
})
export class SelectComponent implements ControlValueAccessor {

  @Input() label!: string;

  @Input() options!: any[];

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

  onSelectionChange(value: any): void {
    this.onChange(value);
  }
}
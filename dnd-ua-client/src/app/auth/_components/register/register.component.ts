import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatError } from '@angular/material/form-field';
import { RouterLink } from '@angular/router';

import { AuthenticationService } from 'dnd-ua-client/src/app/auth/_services/authentication.service';
import { InputComponent } from 'dnd-ua-client/src/app/shared/_components/input/input.component';

@Component({
  selector: 'dnd-ua-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  standalone: true,
  imports: [InputComponent, MatButtonModule, RouterLink, ReactiveFormsModule, MatError],
  providers: [AuthenticationService],
})
export class RegisterComponent {
  registerForm: FormGroup;
  constructor(private readonly formBuilder: FormBuilder, private authenticationService: AuthenticationService) {
    this.registerForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }
  get username(): AbstractControl {
    return this.registerForm.get('username')!;
  }

  get password(): AbstractControl {
    return this.registerForm.get('password')!;
  }
  register() {
    if (!this.registerForm.valid) return;

    const { username, password } = this.registerForm.value;
    this.authenticationService.register(username, password).subscribe(() => {
      console.log('registered and logged in.');
      // TODO redirect
    });
  }
}

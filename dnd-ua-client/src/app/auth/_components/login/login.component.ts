import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatError } from '@angular/material/form-field';
import { RouterLink } from '@angular/router';

import { AuthenticationService } from 'dnd-ua-client/src/app/auth/_services/authentication.service';
import { InputComponent } from 'dnd-ua-client/src/app/shared/_components/input/input.component';

@Component({
  selector: 'dnd-ua-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [InputComponent, MatButtonModule, RouterLink, ReactiveFormsModule, MatError],
  providers: [AuthenticationService],
})
export class LoginComponent {
  loginForm: FormGroup;
  constructor(private readonly formBuilder: FormBuilder, private authenticationService: AuthenticationService) {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }
  get username(): AbstractControl {
    return this.loginForm.get('username')!;
  }

  get password(): AbstractControl {
    return this.loginForm.get('password')!;
  }

  login(): void {
    if (!this.loginForm.valid) return;

    const { username, password } = this.loginForm.value;
    this.authenticationService.login(username, password).subscribe(() => {
      console.log('logged in');
      // TODO redirect
    });
  }
}

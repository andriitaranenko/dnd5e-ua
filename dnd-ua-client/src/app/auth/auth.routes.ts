import { Route } from "@angular/router";
import { LoginComponent } from "dnd-ua-client/src/app/auth/_components/login/login.component";
import { RegisterComponent } from "dnd-ua-client/src/app/auth/_components/register/register.component";

export const authRoutes: Route[] = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
]
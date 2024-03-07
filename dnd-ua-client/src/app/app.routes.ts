import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: 'auth',
    loadChildren: () => import('dnd-ua-client/src/app/auth/auth.routes').then(m => m.authRoutes)
  }
];

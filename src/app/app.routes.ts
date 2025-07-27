import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/motos',
    pathMatch: 'full'
  },
  {
    path: 'motos',
    loadChildren: () => import('./features/moto/moto.routes').then(r => r.MOTO_ROUTES)
  },
  {
    path: '**',
    loadComponent: () => import('./shared/pages/not-found/not-found.component').then(m => m.NotFoundComponent)
  }
];

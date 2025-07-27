import { Routes } from '@angular/router';

export const MOTO_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full'
  },
  {
    path: 'list',
    loadComponent: () => import('./pages/list-moto/list-moto.component').then(c => c.ListMotoComponent),
    title: 'Lista de Motos'
  },
  {
    path: 'detail/:id',
    loadComponent: () => import('./pages/detail-moto/detail-moto.component').then(c => c.DetailMotoComponent),
    title: 'Detalle de Moto'
  }
];

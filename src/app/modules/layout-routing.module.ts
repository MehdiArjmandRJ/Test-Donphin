import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'home',
        data: {},
        loadChildren: () =>
          import('./pages').then((module) => module.HomeModule),
      },
      {
        path: 'dashboard',
        data: {},
        loadChildren: () =>
          import('./pages').then((module) => module.DashboardModule),
      },
    ]
  },
  { path: '**', redirectTo: 'panel/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LayoutRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { PanelGuard } from './core/guards/panel.guard';


const routes: Routes = [
  {
    path: 'panel',
    data: {},
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./modules/layout.module').then((module) => module.LayoutModule),
  },
  {
    path: 'auth',
    data: {},
    canActivate: [PanelGuard],
    loadChildren: () =>
      import('./core/auth/pages/index').then((module) => module.LoginModule),
  },

  { path: '**', redirectTo: 'panel/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }

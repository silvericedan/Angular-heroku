import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: '', redirectTo: 'formulario', pathMatch: 'full' },
  {
    path: '',
    loadChildren: () => import('./modules/modulouno/formulario.module').then((m) => m.FormularioModule)
  },
  { path: '**', redirectTo: 'formulario' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorPageComponent } from './shared/error-page/error-page.component';
import { AuthGuard } from './auth/guards/auth.guard';

const routes: Routes =[
  {
    path: 'auth',
    loadChildren: ()=> import('./auth/auth.module').then(m=> m.AuthModule) //esta sintaxis en la clave del lazyLoad
    
  },
  {
    path: 'heroes',
    loadChildren: ()=> import('./heroes/heroes.module').then(m=> m.HeroesModule), //esta sintaxis en la clave del lazyLoad
    canLoad: [AuthGuard],
    canActivate: [AuthGuard]
  },
  {
    path: '404',
    component: ErrorPageComponent
  },
  {
    path: '**',
    //component: ErrorPageComponent
    redirectTo: '404'
  }
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports:[
    RouterModule
  ]

})
export class AppRoutingModule { }

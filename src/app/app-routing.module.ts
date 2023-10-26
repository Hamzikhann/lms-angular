import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';

import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { PasswordForgotComponent } from './components/password-forgot/password-forgot.component';
import { PasswordResetComponent } from './components/password-reset/password-reset.component';

const routes: Routes = [
  {
    path: 'signin',
    component: SigninComponent,
  },
  {
    path: 'signup',
    component: SignupComponent,
  },
  {
    path: 'forgot-password',
    component: PasswordForgotComponent,
  },
  {
    path: 'reset-password/:token',
    component: PasswordResetComponent,
  },
  {
    path: '',
    loadChildren: () =>
      import('./modules/index.module').then((m) => m.IndexModule),
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  declarations: [
    SignupComponent,
    PasswordForgotComponent,
    PasswordResetComponent,
  ],
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}

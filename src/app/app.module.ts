import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';

import { AuthInterceptor } from './interceptors/auth.interceptor';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PhoneMaskDirective } from './directives/phone-mask/phone-mask.directive';
import { SigninComponent } from './components/signin/signin.component';

@NgModule({
  declarations: [AppComponent, PhoneMaskDirective, SigninComponent],
  imports: [
    AppRoutingModule,
    BrowserModule,
    NgbModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
  ],
  exports: [PhoneMaskDirective],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

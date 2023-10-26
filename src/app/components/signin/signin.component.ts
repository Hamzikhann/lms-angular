import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';

import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent {
  constructor(
    private router: Router,
    private toastr: ToastrService,
    private authService: AuthService
  ) {}

  signIn(form: any) {
    const payload = {
      email: form.value.email,
      password: form.value.password,
    };
    this.authService.login(payload).subscribe((res: any) => {
      form.reset();
      const token: any = res.token;
      const data: any = res.data;

      this.authService.setToken(token);
      this.authService.setUserId(data.user?.id);
      this.authService.setUser(data.user);
      this.toastr.success('Logged in successfull!');
      this.router.navigate(['/']);
    });
  }
}

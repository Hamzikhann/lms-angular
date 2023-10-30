import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/users/api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css'],
})
export class ChangePasswordComponent implements OnInit {
  constructor(private toastr: ToastrService, private apiServices: ApiService) {}

  ngOnInit(): void {}

  changePassword(form: any) {
    const data = {
      path: 'users/update/password',
      payload: {
        oldPassword: form.value.oldPassword,
        password: form.value.newPassword,
        passwordConfirmation: form.value.confirmPassword,
      },
    };
    this.apiServices.postRequest(data).subscribe((data) => {
      form.reset();
      this.toastr.success('Password changed successfully!');
    });
  }
}

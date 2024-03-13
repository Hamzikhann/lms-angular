import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/users/api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css'], // Assuming you have a CSS file
})
export class ChangePasswordComponent implements OnInit {
  changePasswordForm: FormGroup<any> = new FormGroup({});

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private apiServices: ApiService
  ) {}

  ngOnInit(): void {
    this.changePasswordForm = this.formBuilder.group(
      {
        oldPassword: ['', Validators.required],
        newPassword: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(16),
          ],
        ],
        passwordConfirmation: ['', Validators.required],
      },
      {
        validator: this.passwordMatchValidator,
      }
    );
  }

  get f() {
    return this.changePasswordForm.controls;
  }

  passwordMatchValidator(control: FormGroup): { [key: string]: any } | null {
    const password = control.get('newPassword');
    const confirmPassword = control.get('passwordConfirmation');
    return password &&
      confirmPassword &&
      password.value !== confirmPassword.value
      ? { passwordMismatch: true }
      : null;
  }

  changePassword() {
    if (this.changePasswordForm.invalid) {
      return;
    }

    const data = {
      path: 'users/update/password',
      payload: {
        oldPassword: this.changePasswordForm.value.oldPassword, // Access form values here
        password: this.changePasswordForm.value.newPassword,
        passwordConfirmation:
          this.changePasswordForm.value.passwordConfirmation,
      },
    };

    this.apiServices.postRequest(data).subscribe(
      (response) => {
        // Handle successful password change (e.g., reset, display success message)
        this.changePasswordForm.reset();
        this.toastr.success('Password changed successfully!');
      },
      (error) => {
        // Handle errors from the API request
        console.error(error);
        this.toastr.error('Error changing password', error.message); // Display error
      }
    );
  }
}

// import { Component, OnInit } from '@angular/core';
// import { ApiService } from 'src/app/services/users/api.service';
// import { ToastrService } from 'ngx-toastr';

// @Component({
//   selector: 'app-change-password',
//   templateUrl: './change-password.component.html',
//   styleUrls: ['./change-password.component.css'],
// })
// export class ChangePasswordComponent implements OnInit {
//   constructor(private toastr: ToastrService, private apiServices: ApiService) {}

//   ngOnInit(): void {}

//   changePassword(form: any) {
//     const data = {
//       path: 'users/update/password',
//       payload: {
//         oldPassword: form.value.oldPassword,
//         password: form.value.newPassword,
//         passwordConfirmation: form.value.confirmPassword,
//       },
//     };
//     this.apiServices.postRequest(data).subscribe((data) => {
//       form.reset();
//       this.toastr.success('Password changed successfully!');
//     });
//   }
// }

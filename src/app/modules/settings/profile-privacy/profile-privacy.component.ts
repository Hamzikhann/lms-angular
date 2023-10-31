import { Component, ElementRef, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/services/users/api.service';
import { ToastrService } from 'ngx-toastr';
import { ConfigService } from 'src/app/config/config.service';

@Component({
  selector: 'app-profile-privacy',
  templateUrl: './profile-privacy.component.html',
  styleUrls: ['./profile-privacy.component.css'],
})
export class ProfilePrivacyComponent {
  ImgBaseURL: string = this.config.ImgBaseURL;
  user: any = {
    userId: '',
    firstName: '',
    lastName: '',
    email: '',
    managerId: '',
    departmentId: '',
    designationId: '',
    address: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    imageUrl: '',
    jobTitle: '',
    phoneNumber: '',
    skype: '',
  };
  profileImage: any;

  constructor(
    private toastr: ToastrService,
    private apiServices: ApiService,
    private config: ConfigService
  ) {}

  @ViewChild('closeModal') closeModal: ElementRef | undefined;

  ngOnInit(): void {
    this.getUserDetails();
  }

  getUserDetails() {
    const data = {
      path: 'users/detail',
      payload: {},
    };
    this.apiServices.postRequest(data).subscribe((res) => {
      const data = res.data;
      this.user = {
        userId: data.id,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        managerId: data.managerId,
        departmentId: data.departmentId,
        designationId: data.designationId,
        address: data.userProfile.address,
        city: data.userProfile.city,
        state: data.userProfile.state,
        zipcode: data.userProfile.zipcode,
        country: data.userProfile.country,
        imageUrl: data.userProfile.imageUrl,
        jobTitle: data.userProfile.jobTitle,
        phoneNumber: data.userProfile.phoneNumber,
        skype: data.userProfile.skype,
      };
    });
  }

  updateUserProfile() {
    const data = {
      path: 'users/update/profile',
      payload: {
        firstName: this.user.firstName,
        lastName: this.user.lastName,
        email: this.user.email,
        phoneNumber: this.user.phoneNumber,
        skype: this.user.skype,
        jobTitle: this.user.jobTitle,
        address: this.user.address,
        city: this.user.city,
        state: this.user.state,
        zipcode: this.user.zipcode,
        country: this.user.country,
      },
    };
    this.apiServices.postRequest(data).subscribe((data) => {
      this.toastr.success('Profile updated successfully!');
      this.getUserDetails();
    });
  }

  onImageSelected(event: any) {
    this.profileImage = event.target.files[0];
  }

  onImageUpload() {
    if (this.profileImage) {
      const payload = new FormData();
      payload.append('image', this.profileImage);

      const data = {
        path: 'users/update/profile/image',
        payload,
      };
      this.apiServices.postRequest(data).subscribe((data) => {
        this.toastr.success('Profile image updated successfully!');
        this.getUserDetails();
      });
    } else {
      this.toastr.error('Error!', 'Kindly select the profile image to upload.');
    }
  }
}

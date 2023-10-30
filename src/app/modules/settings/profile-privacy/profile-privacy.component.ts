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
  userDetails: any = {
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
  selectedImage: any;

  ImgBaseURL: string = this.config.ImgBaseURL;

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
      this.userDetails = {
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
      console.log(this.userDetails);
    });
  }

  updateUserProfile() {
    const data = {
      path: 'users/update/profile',
      payload: {
        firstName: this.userDetails.firstName,
        lastName: this.userDetails.lastName,
        email: this.userDetails.email,
        jobTitle: this.userDetails.jobTitle,
        phoneNumber: this.userDetails.phoneNumber,
        skype: this.userDetails.skype,
        address: this.userDetails.address,
        city: this.userDetails.city,
        state: this.userDetails.state,
        zipcode: this.userDetails.zipcode,
        country: this.userDetails.country,
      },
    };
    this.apiServices.postRequest(data).subscribe((data) => {
      if (this.closeModal) {
        this.closeModal.nativeElement.click();
      }
      // user.reset();
      this.toastr.success('Profile updated successfully!');
      this.getUserDetails();
    });
  }

  uploadImage(image: File) {
    const payload = new FormData();

    payload.append('image', this.userDetails.imageUrl);

    const data = {
      path: 'users/update/profile/image ',
      payload: {},
    };
    this.apiServices.postRequest(data).subscribe((res) => {
      this.toastr.success('Image updated successfully!');
    });
  }

  onImageSelected(event: any) {
    this.selectedImage = event.target.files[0];
  }

  onSubmit() {
    if (this.selectedImage) {
      this.apiServices
        .postRequest(this.selectedImage)
        .subscribe((response) => {});
    }
  }
}

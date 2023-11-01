import { Component, ElementRef, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/services/users/api.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-course-useful-links',
  templateUrl: './course-useful-links.component.html',
  styleUrls: ['./course-useful-links.component.css'],
})
export class CourseUsefulLinksComponent {
  permission: any = { create: true, update: true, delete: true };
  courseId: any;
  usefulLinks: any;
  usefulLink = {
    id: '',
    title: '',
    description: '',
    linkUrl: '',
  };
  usefulLinkFormType: string = '';

  @ViewChild('closeLinkModal') closeLinkModal: ElementRef | undefined;

  constructor(
    private toastr: ToastrService,
    private apiServices: ApiService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.courseId = this.route.snapshot.paramMap.get('id');
    this.getUsefulLinks();
  }

  getUsefulLinks() {
    const data = {
      path: 'course/useful-links/list',
      payload: {
        courseId: this.courseId,
      },
    };
    this.apiServices.postRequest(data).subscribe((response) => {
      this.usefulLinks = response.data;
    });
  }

  createUsefulLink() {
    const data = {
      path: 'course/useful-links/create',
      payload: {
        courseId: this.courseId,
        title: this.usefulLink.title,
        description: this.usefulLink.description,
        linkUrl: this.usefulLink.linkUrl,
      },
    };
    this.apiServices.postRequest(data).subscribe((data) => {
      if (this.closeLinkModal) {
        this.closeLinkModal.nativeElement.click();
      }
      this.toastr.success('Useful Link added successfully!');
      this.resetUsefulLinkData();
      this.getUsefulLinks();
    });
  }

  updateUsefulLink() {
    const data = {
      path: 'course/useful-links/update',
      payload: {
        linkId: this.usefulLink.id,
        title: this.usefulLink.title,
        description: this.usefulLink.description,
        linkUrl: this.usefulLink.linkUrl,
      },
    };
    this.apiServices.postRequest(data).subscribe((data) => {
      if (this.closeLinkModal) {
        this.closeLinkModal.nativeElement.click();
      }
      this.toastr.success('Useful Link updated successfully!');
      this.resetUsefulLinkData();
      this.getUsefulLinks();
    });
  }

  deleteUsefulLink() {
    const data = {
      path: 'course/useful-links/delete',
      payload: {
        linkId: this.usefulLink.id,
      },
    };
    this.apiServices.postRequest(data).subscribe((data) => {
      if (this.closeLinkModal) {
        this.closeLinkModal.nativeElement.click();
      }
      this.toastr.success('Useful Link deleted successfully!');
      this.resetUsefulLinkData();
      this.getUsefulLinks();
    });
  }

  setUsefulLink(link: any) {
    this.usefulLink = {
      id: link.id,
      title: link.title,
      description: link.description,
      linkUrl: link.linkUrl,
    };
  }

  setUsefulLinkFormType(name: string) {
    this.usefulLinkFormType = name;
  }

  resetUsefulLinkData() {
    this.usefulLinkFormType = 'create';
    this.usefulLink = {
      id: '',
      title: '',
      description: '',
      linkUrl: '',
    };
  }
}

import { Component, ElementRef, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/services/users/api.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Editor, Toolbar } from 'ngx-editor';

@Component({
  selector: 'app-course-useful-links',
  templateUrl: './course-useful-links.component.html',
  styleUrls: ['./course-useful-links.component.css'],
})
export class CourseUsefulLinksComponent {
  loggedInUser: any;
  permission: any = { create: false, update: false, delete: false };

  courseId: any;
  usefulLinks: any;
  usefulLink = {
    id: '',
    title: '',
    description: '',
    linkUrl: '',
  };
  usefulLinkFormType: string = '';

  filteredUsefulLinks: any;

  loading: boolean = false;

  @ViewChild('closeLinkModal') closeLinkModal: ElementRef | undefined;

  constructor(
    private toastr: ToastrService,
    private apiServices: ApiService,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loggedInUser = JSON.parse(this.authService.getUser());
    if (this.loggedInUser.role.title == 'Administrator') {
      this.permission = { create: true, update: true, delete: true };
    }

    this.route.parent?.params.subscribe((params: any) => {
      this.courseId = params.id;
      this.getUsefulLinks();
    });
  }

  editor: Editor = new Editor();
  toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
  ];

  getUsefulLinks() {
    this.loading = true;
    this.usefulLinks = [];
    this.filteredUsefulLinks = [];

    const data = {
      path: 'course/useful-links/list',
      payload: {
        courseId: this.courseId,
      },
    };
    this.apiServices.postRequest(data).subscribe((response) => {
      this.usefulLinks = response.data;
      this.filteredUsefulLinks = this.usefulLinks;
      this.loading = false;
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

  searchUsefulLinks(event: any) {
    const searchQuery = (event.target as HTMLInputElement).value.toLowerCase();
    this.filteredUsefulLinks = this.usefulLinks.filter((link: any) =>
      link.title.toLowerCase().includes(searchQuery)
    );
  }
}

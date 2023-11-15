import { Component, ElementRef, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/services/users/api.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-course-faqs',
  templateUrl: './course-faqs.component.html',
  styleUrls: ['./course-faqs.component.css'],
})
export class CourseFaqsComponent {
  loggedInUser: any;
  permission: any = { create: false, update: false, delete: false };

  courseId: any;
  faqs: any;
  faq: any = {
    id: '',
    title: '',
    description: '',
  };
  faqFormType: string = '';

  filteredFaqs: any;

  loading: boolean = false;

  @ViewChild('closeFaqModal') closeFaqModal: ElementRef | undefined;

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
      this.getFaqs();
    });
  }

  getFaqs() {
    this.loading = true;

    const data = {
      path: 'course/faqs/list',
      payload: {
        courseId: this.courseId,
      },
    };
    this.apiServices.postRequest(data).subscribe((response) => {
      this.faqs = response.data;
      this.filteredFaqs = this.faqs;
      this.loading = false;
    });
  }

  createFaq() {
    const data = {
      path: 'course/faqs/create',
      payload: {
        courseId: this.courseId,
        title: this.faq.title,
        description: this.faq.description,
      },
    };
    this.apiServices.postRequest(data).subscribe((data) => {
      if (this.closeFaqModal) {
        this.closeFaqModal.nativeElement.click();
      }
      this.toastr.success('Faq added successfully!');
      this.resetFaqData();
      this.getFaqs();
    });
  }

  updateFaq() {
    const data = {
      path: 'course/faqs/update ',
      payload: {
        faqId: this.faq.id,
        title: this.faq.title,
        description: this.faq.description,
      },
    };
    this.apiServices.postRequest(data).subscribe((data) => {
      if (this.closeFaqModal) {
        this.closeFaqModal.nativeElement.click();
      }
      this.toastr.success('Faq updated successfully!');
      this.resetFaqData();
      this.getFaqs();
    });
  }

  deleteFaq() {
    const data = {
      path: 'course/faqs/delete',
      payload: {
        faqId: this.faq.id,
      },
    };
    this.apiServices.postRequest(data).subscribe((data) => {
      if (this.closeFaqModal) {
        this.closeFaqModal.nativeElement.click();
      }
      this.toastr.success('Faq deleted successfully!');
      this.resetFaqData();
      this.getFaqs();
    });
  }

  setFaq(faq: any) {
    this.faq = {
      id: faq.id,
      title: faq.title,
      description: faq.description,
    };
  }

  setFaqFormType(name: string) {
    this.faqFormType = name;
  }

  resetFaqData() {
    this.faqFormType = 'create';
    this.faq = {
      id: '',
      title: '',
      description: '',
    };
  }

  searchFaqs(event: any) {
    const searchQuery = (event.target as HTMLInputElement).value.toLowerCase();
    this.filteredFaqs = this.faqs.filter((faq: any) =>
      faq.title.toLowerCase().includes(searchQuery)
    );
  }
}

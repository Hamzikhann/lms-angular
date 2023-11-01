import { Component, ElementRef, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/services/users/api.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
})
export class DetailComponent {
  courseId: any;
  course: any;
  courseDetails: any;
  instructor: any;

  syllabus: any = {
    id: '',
    title: '',
  };

  modules: any;
  module: any = {
    id: '',
    title: '',
    description: '',
  };
  moduleFormType: string = '';

  taskTypes: any;
  tasks: any;
  task: any = {
    id: '',
    title: '',
    estimatedTime: '',
    description: '',
    videoLink: '',
    handoutLink: '',
    taskTypeId: '',
    moduleId: '',
  };
  taskFormType: string = '';

  books: any;
  book: any = {
    id: '',
    title: '',
    edition: '',
    author: '',
    publisher: '',
    bookUrl: '',
  };
  bookFormType: string = '';

  usefulLinks: any;
  usefulLink = {
    id: '',
    title: '',
    description: '',
    linkUrl: '',
  };
  usefulLinkFormType: string = '';

  faqs: any;
  faq: any = {
    id: '',
    title: '',
    description: '',
  };
  faqFormType: string = '';

  index: any;
  sections: any = {
    about: true,
    index: false,
    books: false,
    links: false,
    faqs: false,
  };

  @ViewChild('closeModal') closeModal: ElementRef | undefined;
  @ViewChild('closeModuleModal') closeModuleModal: ElementRef | undefined;
  @ViewChild('closeTaskModal') closeTaskModal: ElementRef | undefined;
  @ViewChild('closeBookModal') closeBookModal: ElementRef | undefined;
  @ViewChild('closeFaqModal') closeFaqModal: ElementRef | undefined;
  @ViewChild('closeLinkModal') closeLinkModal: ElementRef | undefined;

  constructor(
    private toastr: ToastrService,
    private apiServices: ApiService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.courseId = this.route.snapshot.paramMap.get('id');
    this.getCourseDetails();
    this.getTaskTypes();
  }

  toggleSection(name: string) {
    this.sections = {
      about: false,
      index: false,
      books: false,
      links: false,
      faqs: false,
    };
    this.sections[name] = true;
  }

  getCourseDetails() {
    const data = {
      path: 'courses/detail',
      payload: {
        courseId: this.courseId,
      },
    };
    this.apiServices.postRequest(data).subscribe((data) => {
      this.courseDetails = data;
      this.syllabus = {
        id: this.courseDetails.courseSyllabus?.id,
        title: this.courseDetails.courseSyllabus?.title,
      };
      console.log(this.courseDetails);
    });
  }

  getModules() {
    const data = {
      path: 'course/modules/list',
      payload: {
        courseSyllabusId: this.syllabus.id,
      },
    };
    this.apiServices.postRequest(data).subscribe((response) => {
      this.modules = response.data;
    });
  }
  createModule() {
    const data = {
      path: 'course/modules/create',
      payload: {
        courseSyllabusId: this.syllabus.id,
        title: this.module.title,
        description: this.module.description,
      },
    };
    this.apiServices.postRequest(data).subscribe((data) => {
      if (this.closeModuleModal) {
        this.closeModuleModal.nativeElement.click();
      }
      this.toastr.success('Module added successfully!');
      this.getModules();
      this.resetModuleData();
    });
  }
  updateModule() {
    const data = {
      path: 'course/modules/update',
      payload: {
        moduleId: this.module.id,
        title: this.module.title,
        description: this.module.description,
      },
    };
    this.apiServices.postRequest(data).subscribe((data) => {
      if (this.closeModuleModal) {
        this.closeModuleModal.nativeElement.click();
      }
      this.toastr.success('Module updated successfully!');
      this.getModules();
      this.resetModuleData();
    });
  }
  deleteModule() {
    const data = {
      path: 'course/modules/delete ',
      payload: {
        moduleId: this.module.id,
      },
    };
    this.apiServices.postRequest(data).subscribe((data) => {
      if (this.closeModuleModal) {
        this.closeModuleModal.nativeElement.click();
      }
      this.toastr.success('Module deleted successfully!');
      this.getModules();
      this.resetModuleData();
    });
  }
  setModule(module: any) {
    this.module = {
      id: module.id,
      title: module.title,
      description: module.description,
    };
  }
  setModuleFormType(name: string) {
    this.moduleFormType = name;
  }
  resetModuleData() {
    this.moduleFormType = 'create';
    this.module = {
      id: '',
      title: '',
      description: '',
    };
  }

  getTaskTypes() {
    const data = {
      path: 'course/tasks/list/types',
      payload: {},
    };
    this.apiServices.postRequest(data).subscribe((data) => {
      this.taskTypes = data.data;
    });
  }
  createTask() {
    const data = {
      path: 'course/tasks/create',
      payload: {
        title: this.task.title,
        estimatedTime: this.task.estimatedTime,
        contentDescription: this.task.description,
        contentVideoLink: this.task.videoLink,
        contentHandoutLink: this.task.handoutLink,
        courseTaskTypeId: this.task.taskTypeId,
        courseModuleId: this.task.moduleId,
      },
    };
    this.apiServices.postRequest(data).subscribe((data) => {
      if (this.closeTaskModal) {
        this.closeTaskModal.nativeElement.click();
      }
      this.toastr.success('Task added successfully!');
      this.getModules();
      this.resetTaskData();
    });
  }
  updateTask() {
    const data = {
      path: 'course/tasks/update ',
      payload: {
        courseTaskId: this.task.id,
        title: this.task.title,
        estimatedTime: this.task.estimatedTime,
        contentDescription: this.task.description,
        contentVideoLink: this.task.videoLink,
        contentHandoutLink: this.task.handoutLink,
        courseTaskTypeId: this.task.taskTypeId,
      },
    };
    this.apiServices.postRequest(data).subscribe((data) => {
      if (this.closeTaskModal) {
        this.closeTaskModal.nativeElement.click();
      }
      this.toastr.success('Task updated successfully!');
      this.getModules();
      this.resetTaskData();
    });
  }
  deleteTask() {
    const data = {
      path: 'course/tasks/delete',
      payload: {
        courseTaskId: this.task.id,
      },
    };
    this.apiServices.postRequest(data).subscribe((data) => {
      if (this.closeTaskModal) {
        this.closeTaskModal.nativeElement.click();
      }
      this.toastr.success('Task deleted successfully!');
      this.getModules();
      this.resetTaskData();
    });
  }
  setTaskModuleId(moduleId: string) {
    this.task.moduleId = moduleId;
    console.log(this.task);
  }
  setTask(task: any) {
    this.task = {
      id: task.id,
      title: task.title,
      estimatedTime: task.estimatedTime,
      description: task.courseTaskContent.description,
      videoLink: task.courseTaskContent.videoLink,
      handoutLink: task.courseTaskContent.handoutLink,
      taskTypeId: task.courseTaskTypeId,
      moduleId: task.courseModuleId,
    };
  }
  setTaskFormType(name: any) {
    this.taskFormType = name;
  }
  resetTaskData() {
    this.taskFormType = 'create';
    this.task = {
      id: '',
      title: '',
      estimatedTime: '',
      description: '',
      videoLink: '',
      handoutLink: '',
      taskTypeId: '',
      moduleId: '',
    };
  }

  getBooks() {
    const data = {
      path: 'course/books/list ',
      payload: {
        courseId: this.courseId,
      },
    };
    this.apiServices.postRequest(data).subscribe((response) => {
      this.books = response.data;
    });
  }
  createBook() {
    const data = {
      path: 'course/books/create ',
      payload: {
        courseId: this.courseId,
        title: this.book.title,
        edition: this.book.edition,
        author: this.book.author,
        publisher: this.book.publisher,
        bookUrl: this.book.bookUrl,
      },
    };
    this.apiServices.postRequest(data).subscribe((data) => {
      if (this.closeBookModal) {
        this.closeBookModal.nativeElement.click();
      }
      this.toastr.success('Book added successfully!');
      this.getBooks();
      this.resetBookData();
    });
  }
  updateBook() {
    const data = {
      path: 'course/books/update ',
      payload: {
        bookId: this.book.id,
        title: this.book.title,
        edition: this.book.edition,
        author: this.book.author,
        publisher: this.book.publisher,
        bookUrl: this.book.bookUrl,
      },
    };
    this.apiServices.postRequest(data).subscribe((data) => {
      if (this.closeBookModal) {
        this.closeBookModal.nativeElement.click();
      }
      this.toastr.success('Book updated successfully!');
      this.getBooks();
      this.resetBookData();
    });
  }
  deleteBook() {
    const data = {
      path: 'course/books/delete',
      payload: {
        bookId: this.book.id,
      },
    };
    this.apiServices.postRequest(data).subscribe((data) => {
      if (this.closeBookModal) {
        this.closeBookModal.nativeElement.click();
      }
      this.toastr.success('Book deleted successfully!');
      this.getBooks();
      this.resetBookData();
    });
  }
  setBook(book: any) {
    this.book = {
      id: book.id,
      title: book.title,
      edition: book.edition,
      author: book.author,
      publisher: book.publisher,
      bookUrl: book.bookUrl,
    };
  }
  setBookFormType(name: any) {
    this.bookFormType = name;
  }
  resetBookData() {
    this.bookFormType = 'create';
    this.book = {
      id: '',
      title: '',
      edition: '',
      author: '',
      publisher: '',
      bookUrl: '',
    };
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

  getFaqs() {
    const data = {
      path: 'course/faqs/list',
      payload: {
        courseId: this.courseId,
      },
    };
    this.apiServices.postRequest(data).subscribe((response) => {
      this.faqs = response.data;
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
}

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
  instructor: any;
  books: any;
  files: any;
  links: any;
  faqs: any;
  index: any;
  sections: any = {
    about: true,
    index: false,
    files: false,
    books: false,
    links: false,
    faqs: false,
  };
  courseSelected: any;
  courseDetails: any;
  courseIndexes: any;
  selectedIndex: any;
  courseBooks: any;
  selectedBook: any;
  useFulLinks: any;
  selectedLink: any;
  selectedFaq: any;
  taskTypes: any;
  taskDetails: any;
  selectedTask: any;

  constructor(
    private toastr: ToastrService,
    private apiServices: ApiService,
    private route: ActivatedRoute
  ) {}
  @ViewChild('closeModal') closeModal: ElementRef | undefined;

  ngOnInit(): void {
    this.courseId = this.route.snapshot.paramMap.get('id');

    this.getCourseDetails();
    this.getBooks();
    this.getUseFulLinks();
    this.getFaqs();
    this.getTaskTypes();
    // this.getTaskDetails();
  }

  toggleSection(name: string) {
    this.sections = {
      about: false,
      index: false,
      files: false,
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
      this.getCourseIndexes();

      console.log(this.courseDetails);
    });
  }

  getCourseIndexes() {
    const data = {
      path: 'course/modules/list',
      payload: {
        courseSyllabusId: this.courseDetails?.courseSyllabus?.id,
      },
    };
    this.apiServices.postRequest(data).subscribe((data) => {
      this.courseIndexes = data.data;
      // console.log(this.courseIndexes);
    });
  }

  addIndex(index: any) {
    const data = {
      path: 'course/modules/create',
      payload: {
        courseSyllabusId: this.courseDetails?.courseSyllabus?.id,
        title: index.value.title,
        description: index.value.description,
      },
    };
    this.apiServices.postRequest(data).subscribe((data) => {
      if (this.closeModal) {
        this.closeModal.nativeElement.click();
      }
      index.reset();
      this.toastr.success('Index added successfully!');
    });
  }

  setIndex(index: any) {
    this.selectedIndex = index;
    // console.log(this.selectedIndex);
  }

  updateIndex(index: any) {
    const data = {
      path: 'course/modules/update',
      payload: {
        moduleId: this.selectedIndex.id,
        title: index.value.title,
        description: index.value.description,
      },
    };
    this.apiServices.postRequest(data).subscribe((data) => {
      if (this.closeModal) {
        this.closeModal.nativeElement.click();
      }
      index.reset();
      this.selectedIndex = null;
      this.toastr.success('Index updated successfully!');
      this.getCourseIndexes();
    });
  }

  deleteIndex() {
    const data = {
      path: 'course/modules/delete ',
      payload: {
        moduleId: this.selectedIndex.id,
      },
    };
    this.apiServices.postRequest(data).subscribe((data) => {
      if (this.closeModal) {
        this.closeModal.nativeElement.click();
      }
      this.selectedIndex = null;
      this.toastr.success('Index deleted successfully!');
      this.getCourseIndexes();
    });
  }

  getBooks() {
    const data = {
      path: 'course/books/list ',
      payload: {
        courseId: this.courseId,
      },
    };
    this.apiServices.postRequest(data).subscribe((data) => {
      this.courseBooks = data.data;
      this.getCourseDetails();

      // console.log(this.courseBooks);
    });
  }

  addBook(book: any) {
    const data = {
      path: 'course/books/create ',
      payload: {
        courseId: this.courseId,
        title: book.value.title,
        edition: book.value.edition,
        author: book.value.author,
        publisher: book.value.publisher,
        bookUrl: book.value.bookUrl,
      },
    };
    this.apiServices.postRequest(data).subscribe((data) => {
      if (this.closeModal) {
        this.closeModal.nativeElement.click();
      }
      book.reset();
      this.toastr.success('Book added successfully!');
    });
  }

  setBook(book: any) {
    this.selectedBook = book;
    console.log(this.selectedBook);
  }

  updateBook(book: any) {
    const data = {
      path: 'course/books/update ',
      payload: {
        bookId: this.selectedBook.id,
        title: book.value.title,
        edition: book.value.edition,
        author: book.value.author,
        publisher: book.value.publisher,
        bookUrl: book.value.bookUrl,
      },
    };
    this.apiServices.postRequest(data).subscribe((data) => {
      if (this.closeModal) {
        this.closeModal.nativeElement.click();
      }
      book.reset();
      this.selectedBook = null;
      this.toastr.success('Book updated successfully!');
      this.getBooks();
    });
  }

  deleteBook() {
    const data = {
      path: 'course/books/delete',
      payload: {
        bookId: this.selectedBook.id,
      },
    };
    this.apiServices.postRequest(data).subscribe((data) => {
      if (this.closeModal) {
        this.closeModal.nativeElement.click();
      }
      this.selectedBook = null;
      this.toastr.success('Book deleted successfully!');
      this.getBooks();
    });
  }

  getUseFulLinks() {
    const data = {
      path: 'course/useful-links/list',
      payload: {
        courseId: this.courseId,
      },
    };
    this.apiServices.postRequest(data).subscribe((data) => {
      this.useFulLinks = data.data;
      this.getCourseDetails();

      // console.log(this.useFulLinks);
    });
  }

  addUsefulLink(link: any) {
    const data = {
      path: 'course/useful-links/create',
      payload: {
        courseId: this.courseId,
        title: link.value.title,
        description: link.value.description,
        linkUrl: link.value.linkUrl,
      },
    };
    this.apiServices.postRequest(data).subscribe((data) => {
      if (this.closeModal) {
        this.closeModal.nativeElement.click();
      }
      link.reset();
      this.toastr.success('Useful Link added successfully!');
    });
  }

  setLink(link: any) {
    this.selectedLink = link;
    console.log(this.selectedLink);
  }

  updateUsefulLink(link: any) {
    const data = {
      path: 'course/useful-links/update',
      payload: {
        linkId: this.selectedLink.id,
        title: link.value.title,
        description: link.value.description,
        linkUrl: link.value.linkUrl,
      },
    };
    this.apiServices.postRequest(data).subscribe((data) => {
      if (this.closeModal) {
        this.closeModal.nativeElement.click();
      }
      link.reset();
      this.selectedLink = null;
      this.toastr.success('Useful Link updated successfully!');
      this.getUseFulLinks();
    });
  }

  deleteUsefulLink() {
    const data = {
      path: 'course/useful-links/delete',
      payload: {
        linkId: this.selectedLink.id,
      },
    };
    this.apiServices.postRequest(data).subscribe((data) => {
      if (this.closeModal) {
        this.closeModal.nativeElement.click();
      }
      this.selectedLink = null;
      this.toastr.success('Useful Link deleted successfully!');
      this.getUseFulLinks();
    });
  }

  getFaqs() {
    const data = {
      path: 'course/faqs/list',
      payload: {
        courseId: this.courseId,
      },
    };
    this.apiServices.postRequest(data).subscribe((data) => {
      this.faqs = data.data;
      this.getCourseDetails();

      // console.log(this.faqs);
    });
  }

  addFaq(faq: any) {
    const data = {
      path: 'course/faqs/create',
      payload: {
        courseId: this.courseId,
        title: faq.value.title,
        description: faq.value.description,
      },
    };
    this.apiServices.postRequest(data).subscribe((data) => {
      if (this.closeModal) {
        this.closeModal.nativeElement.click();
      }
      faq.reset();
      this.toastr.success('Faq added successfully!');
    });
  }

  setFaq(faq: any) {
    this.selectedFaq = faq;
    console.log(this.selectedFaq);
  }

  updateFaq(faq: any) {
    const data = {
      path: 'course/faqs/update ',
      payload: {
        faqId: this.selectedFaq.id,
        title: faq.value.title,
        description: faq.value.description,
      },
    };
    this.apiServices.postRequest(data).subscribe((data) => {
      if (this.closeModal) {
        this.closeModal.nativeElement.click();
      }
      faq.reset();
      this.selectedFaq = null;
      this.toastr.success('Faq updated successfully!');
      this.getFaqs();
    });
  }

  deleteFaq() {
    const data = {
      path: 'course/faqs/delete',
      payload: {
        faqId: this.selectedFaq.id,
      },
    };
    this.apiServices.postRequest(data).subscribe((data) => {
      if (this.closeModal) {
        this.closeModal.nativeElement.click();
      }
      this.selectedFaq = null;
      this.toastr.success('Faq deleted successfully!');
      this.getFaqs();
    });
  }

  getTaskTypes() {
    const data = {
      path: 'course/tasks/list/types',
      payload: {},
    };
    this.apiServices.postRequest(data).subscribe((data) => {
      this.taskTypes = data.data;
      this.getCourseDetails();

      console.log(this.taskTypes);
    });
  }

  // getTaskDetails() {
  //   const data = {
  //     path: 'course/tasks/detail',
  //     payload: {
  //       courseId: this.courseId,
  //     },
  //   };
  //   this.apiServices.postRequest(data).subscribe((data) => {
  //     this.taskDetails = data;
  //     this.getCourseDetails();

  //     console.log(this.taskDetails);
  //   });
  // }

  addCourseTask(task: any) {
    console.log(task);
    const data = {
      path: 'course/tasks/create',
      payload: {
        title: task.value.title,
        estimatedTime: task.value.estimatedTime,
        contentDescription: task.value.description,
        contentVideoLink: task.value.videoLink,
        contentHandoutLink: task.value.handoutLink,
        courseTaskTypeId: task.value.typeId,
        courseModuleId: task.value.moduleId,
      },
    };
    this.apiServices.postRequest(data).subscribe((data) => {
      if (this.closeModal) {
        this.closeModal.nativeElement.click();
      }
      task.reset();
      this.toastr.success('Task added successfully!');
    });
  }

  setTask(task: any) {
    this.selectedTask = task;
    console.log(this.selectedTask);
  }

  updateCourseTask(task: any) {
    const data = {
      path: 'course/tasks/update ',
      payload: {
        courseTaskId: this.selectedTask.id,
        title: task.value.title,
        estimatedTime: task.value.estimatedTime,
        contentDescription: task.value.description,
        contentVideoLink: task.value.videoLink,
        contentHandoutLink: task.value.handoutLink,
        courseTaskTypeId: task.value.typeId,
      },
    };
    this.apiServices.postRequest(data).subscribe((data) => {
      if (this.closeModal) {
        this.closeModal.nativeElement.click();
      }
      task.reset();
      this.selectedTask = null;
      this.toastr.success('Task updated successfully!');
      this.getCourseDetails();
    });
  }

  deleteTask() {
    const data = {
      path: 'course/tasks/delete',
      payload: {
        courseTaskId: this.selectedTask.id,
      },
    };
    this.apiServices.postRequest(data).subscribe((data) => {
      if (this.closeModal) {
        this.closeModal.nativeElement.click();
      }
      this.selectedTask = null;
      this.toastr.success('Task deleted successfully!');
      this.getCourseDetails();
    });
  }
}

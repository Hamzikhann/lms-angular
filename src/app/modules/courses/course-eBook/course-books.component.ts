import { Component, ElementRef, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/services/users/api.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ConfigService } from 'src/app/config/config.service';
import { PdfViewerComponent } from 'ng2-pdf-viewer';
import { CourseTaskService } from 'src/app/services/course-task/course-task.service';

@Component({
  selector: 'app-course-books',
  templateUrl: './course-books.component.html',
  styleUrls: ['./course-books.component.css'],
})
export class CourseBooksComponent {
  ImgBaseURL: string = this.config.ImgBaseURL;

  loggedInUser: any;
  permission: any = { create: false, update: false, delete: false };

  courseId: any;
  books: any;
  book: any = {
    id: '',
    title: '',
    edition: '',
    author: '',
    publisher: '',
    eBook: '',
  };
  bookFormType: string = '';

  filteredBooks: any;

  loading: boolean = false;

  currentPage: number = 1;
  pageNumber: number | undefined;
  totalPages: number = 0;

  pdfLoaded: boolean = false;

  zoom: number = 1;

  @ViewChild('closeBookModal') closeBookModal: ElementRef | undefined;
  @ViewChild(PdfViewerComponent) pdfViewer?: PdfViewerComponent;

  constructor(
    private toastr: ToastrService,
    private apiServices: ApiService,
    private route: ActivatedRoute,
    private authService: AuthService,
    private courseTaskService: CourseTaskService,
    private config: ConfigService
  ) {}

  ngOnInit(): void {
    this.loggedInUser = JSON.parse(this.authService.getUser());
    if (this.loggedInUser.role.title == 'Administrator') {
      this.permission = { create: true, update: true, delete: true };
    }

    this.courseTaskService.getCourseId().subscribe((data: any) => {
      this.courseId = data;
      this.getBooks();
    });
  }

  getBooks() {
    this.loading = true;
    this.books = [];
    this.filteredBooks = [];

    const data = {
      path: 'course/books/list ',
      payload: {
        courseId: this.courseId,
      },
    };
    this.apiServices.postRequest(data).subscribe((response) => {
      this.books = response.data;
      this.filteredBooks = this.books;
      this.loading = false;
    });
  }

  createBook() {
    const payload = new FormData();

    payload.append('courseId', this.courseId);
    payload.append('title', this.book.title);
    payload.append('edition', this.book.edition);
    payload.append('author', this.book.author);
    payload.append('publisher', this.book.publisher);
    payload.append('ebook', this.book.eBook);

    const data = {
      path: 'course/books/create ',
      payload: payload,
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
    const payload = new FormData();
    payload.append('bookId', this.book.id);
    payload.append('title', this.book.title);
    payload.append('edition', this.book.edition);
    payload.append('author', this.book.author);
    payload.append('publisher', this.book.publisher);
    if (this.book.eBook) {
      payload.append('ebook', this.book.eBook);
    }

    const data = {
      path: 'course/books/update ',
      payload: payload,
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
    };
    const urlSplit = book.bookUrl.split('/');
    if (urlSplit.length > 0 && urlSplit[2]) {
      this.book.eBookUrl = urlSplit[2];
    }
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
      eBook: '',
    };
  }

  // searchBooks(event: any) {
  //   const searchQuery = (event.target as HTMLInputElement).value.toLowerCase();
  //   this.filteredBooks = this.books.filter((book: any) =>
  //     book.title.toLowerCase().includes(searchQuery)
  //   );
  // }

  // eBookSelected(event: any) {
  //   this.book.eBook = event.target.files[0];
  // }
  eBookSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      const fileNameParts = file.name.split('.');
      const fileExtension =
        fileNameParts[fileNameParts.length - 1].toLowerCase();

      if (fileExtension === 'pdf') {
        this.book.eBook = file;
      } else {
        console.log('Only PDF files are allowed.');
        event.target.value = null;
        this.toastr.error('Only PDF files are allowed!');
      }
    }
  }

  search(target: any) {
    if (!target.value) return;
    this.pdfViewer?.eventBus.dispatch('find', {
      query: target.value,
      type: 'again',
      caseSensitive: false,
      findPrevious: undefined,
      highlightAll: true,
      phraseSearch: true,
    });
  }

  afterLoadComplete(pdf: any): void {
    this.totalPages = pdf.numPages;
    this.pdfLoaded = true;

    this.goToPage();

    setTimeout(() => {
      this.route.paramMap.subscribe((params: any) => {
        this.pageNumber = params.get('referenceNo');
        this.goToPage();
      });
    }, 500);
  }

  goToPage() {
    if (
      this.pageNumber &&
      this.pageNumber >= 1 &&
      this.pageNumber <= this.getTotalPages()
    ) {
      this.currentPage = this.pageNumber;
    }
  }

  private getTotalPages(): any {
    return this.totalPages || 0;
  }

  ZoomInPdf() {
    this.zoom += 0.1;
  }

  ZoomOutPdf() {
    if (this.zoom > 0.1) {
      this.zoom -= 0.1;
    }
  }
}

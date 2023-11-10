import { Component, ElementRef, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/services/users/api.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-course-books',
  templateUrl: './course-books.component.html',
  styleUrls: ['./course-books.component.css'],
})
export class CourseBooksComponent {
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
    bookUrl: '',
  };
  bookFormType: string = '';

  loading: boolean = false;

  @ViewChild('closeBookModal') closeBookModal: ElementRef | undefined;
  filteredBooks: any;

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
      this.getBooks();
    });
  }

  getBooks() {
    this.loading = true;

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

  searchBooks(event: any) {
    const searchQuery = (event.target as HTMLInputElement).value.toLowerCase();
    this.filteredBooks = this.books.filter((book: any) =>
      book.title.toLowerCase().includes(searchQuery)
    );
  }
}

import { Component, ElementRef, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/services/users/api.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-course-books',
  templateUrl: './course-books.component.html',
  styleUrls: ['./course-books.component.css'],
})
export class CourseBooksComponent {
  permission: any = { create: true, update: true, delete: true };
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

  @ViewChild('closeBookModal') closeBookModal: ElementRef | undefined;

  constructor(
    private toastr: ToastrService,
    private apiServices: ApiService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.courseId = this.route.snapshot.paramMap.get('id');
    this.getBooks();
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
}

import { Component, ViewChild } from '@angular/core';
import { PdfViewerComponent } from 'ng2-pdf-viewer';
import { ConfigService } from 'src/app/config/config.service';
import { ActivatedRoute } from '@angular/router';

import { CourseTaskService } from 'src/app/services/course-task/course-task.service';

@Component({
  selector: 'app-course-task-type-reading',
  templateUrl: './course-task-type-reading.component.html',
  styleUrls: ['./course-task-type-reading.component.css'],
})
export class CourseTaskTypeReadingComponent {
  ImgBaseURL: string = this.config.ImgBaseURL;

  courseId: any;
  taskId: any;
  taskDetails: any;

  currentPage: number = 1;
  pageNumber: number | undefined;
  totalPages: number = 0;

  pdfLoaded: boolean = false;

  zoom: number = 1;

  @ViewChild(PdfViewerComponent) pdfViewer?: PdfViewerComponent;

  constructor(
    private courseTaskService: CourseTaskService,
    private config: ConfigService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.courseId = this.courseTaskService.getCourseId();

    this.courseTaskService.getTaskId().subscribe((data: any) => {
      this.taskId = data;
    });

    this.courseTaskService.getTaskDetails().subscribe((data: any) => {
      this.taskDetails = data;
    });
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
    console.log(this.pageNumber);
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

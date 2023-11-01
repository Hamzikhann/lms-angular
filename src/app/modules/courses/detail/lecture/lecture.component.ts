import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/users/api.service';

@Component({
  selector: 'app-lecture',
  templateUrl: './lecture.component.html',
  styleUrls: ['./lecture.component.css'],
})
export class LectureComponent implements OnInit {
  courseId: any;
  taskId: any;

  instructor: any;
  sections: any = {
    videos: true,
    handouts: false,
    presentations: false,
  };
  taskDetails: any;

  constructor(
    private toastr: ToastrService,
    private apiServices: ApiService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.courseId = this.route.snapshot.paramMap.get('id');
    this.taskId = this.route.snapshot.paramMap.get('taskId');

    console.log(this.taskId);

    this.getTaskDetails();

    this.instructor = {
      name: 'Dr. Saleha Naghmi',
      qualification: 'PhD.',
      institute:
        'National College of Business Administration and Economics (NCBA&E)',
      image: '/assets/images/people/50/woman-6.jpg',
      email: 'farwa.amin@vu.edu.pk ',
      bio: 'I give personalized attention to all my students and success is a guarantee as per their dedication, .. My method of tutoring is based on jolly Phonics for kindergarten which involves having interactive sessions with them.',
    };
  }

  toggleSection(name: string) {
    this.sections = {
      videos: false,
      handouts: false,
      presentations: false,
    };
    this.sections[name] = true;
  }

  getTaskDetails() {
    const data = {
      path: 'course/tasks/detail',
      payload: {
        courseTaskId: this.taskId,
      },
    };

    this.apiServices.postRequest(data).subscribe((response) => {
      this.taskDetails = response.data;

      console.log(this.taskDetails);
    });
  }
}

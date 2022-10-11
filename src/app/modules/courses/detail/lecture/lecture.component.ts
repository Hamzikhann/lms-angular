import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lecture',
  templateUrl: './lecture.component.html',
  styleUrls: ['./lecture.component.css']
})
export class LectureComponent implements OnInit {

  instructor: any;
  sections: any = {
    videos: true,
    handouts: false,
    presentations: false
  }

  constructor() { }

  ngOnInit(): void {
    this.instructor = {
      name: "Dr. Saleha Naghmi",
      qualification: "PhD.",
      institute: "National College of Business Administration and Economics (NCBA&E)",
      image: "/assets/images/people/50/woman-6.jpg",
      email: "farwa.amin@vu.edu.pk ",
      bio: "I give personalized attention to all my students and success is a guarantee as per their dedication, .. My method of tutoring is based on jolly Phonics for kindergarten which involves having interactive sessions with them."
    }
  }

  toggleSection(name: string) {
    this.sections = {
      videos: false,
      handouts: false,
      presentations: false
    }
    this.sections[name] = true;
  }

}

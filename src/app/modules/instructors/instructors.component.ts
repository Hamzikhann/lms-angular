import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-instructors',
  templateUrl: './instructors.component.html',
  styleUrls: ['./instructors.component.css']
})
export class InstructorsComponent implements OnInit {

  instructors: any;
  assistants: any;

  constructor() { }

  ngOnInit(): void {
    this.instructors = [
      {
        name: "Dr. Talat Afza",
        degree: "Ph. D.",
        university: "Wayne State University, USA",
        image: "/assets/images/people/50/woman-1.jpg",
        id: "1",
      },
      {
        name: "Dr. Naveed A. Malik",
        degree: "ScD Electrical Engineering",
        university: "Massachusetts Institute of Technology, USA",
        image: "/assets/images/people/50/guy-1.jpg",
        id: "2",
      },
      {
        name: "Dr. Muhammad Rizwan Saleem Sandhu",
        degree: "PhD Management (SME Branding) ",
        university: "University of Management and Technology, Lahore",
        image: "/assets/images/people/50/guy-2.jpg",
        id: "3",
      },
      {
        name: "Syed Muhammad Ali ",
        degree: "Masters Degree (Development Studies) ",
        university: "Melbourne University, Melbourne",
        image: "/assets/images/people/50/guy-3.jpg",
        id: "4",
      },
      {
        name: "Dr. Saleha Naghmi ",
        degree: "PhD",
        university: "National College of Business Administration and Economics",
        image: "/assets/images/people/50/woman-2.jpg",
        id: "5",
      },
    ];
    this.assistants = [
      
      {
        name: "Dr. Naveed A. Malik",
        degree: "ScD Electrical Engineering",
        university: "Massachusetts Institute of Technology, USA",
        image: "/assets/images/people/50/guy-4.jpg",
        id: "2",
      },
      {
        name: "Dr. Muhammad Rizwan Saleem Sandhu",
        degree: "PhD Management (SME Branding) ",
        university: "University of Management and Technology, Lahore",
        image: "/assets/images/people/50/guy-5.jpg",
        id: "3",
      },
      {
        name: "Syed Muhammad Ali ",
        degree: "Masters Degree (Development Studies) ",
        university: "Melbourne University, Melbourne",
        image: "/assets/images/people/50/guy-6.jpg",
        id: "4",
      }
    ];
  }

}

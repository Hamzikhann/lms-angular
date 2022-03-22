import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-announements',
  templateUrl: './announements.component.html',
  styleUrls: ['./announements.component.css']
})
export class AnnounementsComponent implements OnInit {

  announcements: any = [];

  constructor() { }

  ngOnInit(): void {
    this.announcements = [
      {
        date: 'Feb 5th, 2021',
        course: {
          icon: '/assets/images/paths/react_40x40@2x.png',
          title: 'Applied Science',
        },
        description: 'Angular is a platform for building mobile and desktop web applications.',
        instructor: 'Arya Stark'
      },
      {
        date: 'Jan 12th, 2021',
        course: {
          icon: '/assets/images/paths/devops_40x40@2x.png',
          title: 'Machine Learning',
        },
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed consectetur ante eu sem posuere pharetra.',
        instructor: 'John Snow'
      },
      {
        date: 'Dec 12th, 2021',
        course: {
          icon: '/assets/images/paths/redis_40x40@2x.png',
          title: 'Chemistry',
        },
        description: 'Maecenas in eros massa. Phasellus ut lectus pellentesque, dapibus mi id, faucibus tortor. Fusce quis lorem et mauris pellentesque scelerisque. ',
        instructor: 'Cersei lannister'
      },
      {
        date: 'Nov 29th, 2021',
        course: {
          icon: '/assets/images/paths/mailchimp_40x40@2x.png',
          title: 'Data Science',
        },
        description: 'Aenean sagittis sollicitudin arcu sit amet congue. Ut ut dignissim purus. Nunc efficitur leo id massa convallis, nec eleifend sem lacinia. ',
        instructor: 'Daenerys Targaryen'
      },
      {
        date: 'Nov 23th, 2021',
        course: {
          icon: '/assets/images/paths/redis_40x40@2x.png',
          title: 'Chemistry',
        },
        description: 'Proin in vehicula magna. Nunc id purus sit amet purus vulputate volutpat sed vel metus.',
        instructor: 'Cersei lannister'
      }
    ]
  }

}

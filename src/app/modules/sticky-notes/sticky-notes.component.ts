import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sticky-notes',
  templateUrl: './sticky-notes.component.html',
  styleUrls: ['./sticky-notes.component.css']
})
export class StickyNotesComponent implements OnInit {

  notes: any= [
    { title: '', color: '', description: '' },
    { title: 'On Time', color: '#9ADCFF', description: 'Be on time so we can start class together.', 'time': '1 day ago' },
    { title: 'Prepared', color: '#FFF89A', description: 'Be prepared! Make sure you have everything you need for each class', 'time': '3 days ago' },
    { title: 'Listen', color: '#6EBF8B', description: 'Listen to your teacher and classmates.', 'time': '2 weeks ago' },
    { title: 'Dolor Sit', color: '#FFF89A', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus laoreet nunc vel luctus condimentum. Phasellus aliquam, libero sit amet tempus posuere, odio ante vestibulum magna, at mattis justo sem sed lectus.', 'time': '2 weeks ago' },
    { title: 'Kind', color: '#FF8AAE', description: 'Be kind to each other and help each other.', 'time': '1 month ago' },
    { title: 'Eleifend tempus', color: '#FFB2A6', description: 'Aenean ut dignissim leo. Vivamus augue sapien, pulvinar eu metus sit amet, imperdiet sollicitudin ante. Mauris rhoncus faucibus justo, eget volutpat nunc porttitor a. Donec nisi est, vehicula eu quam aliquet, dapibus elementum purus. Mauris et est at augue eleifend tempus eget nec erat.', 'time': '4 months ago' },
    { title: 'Ask', color: '#9ADCFF', description: 'Ask for help if you get stuck.', 'time': '1 year ago' },
    { title: 'Difference', color: '#FFB2A6', description: 'Its the teacher that makes difference, not the classroom.', 'time': '1 year ago' },
  ];

  constructor() { }

  ngOnInit(): void {
  }

}

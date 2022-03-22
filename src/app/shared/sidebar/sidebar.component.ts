import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  submenuCourses: boolean = false;
  submenuSessions: boolean = false;
  submenuCommunity: boolean = false;

  urls: any = {
    dashboard: "/",
    courses: "/courses",
    courses_enrolled: "/courses/enrolled",
    sessions: "/sessions",
    sessions_enrolled: "/sessions/enrolled",
    messages: "/messages",
    announcements: "/announcements",
    account_book: "/account-book",
    sticky_notes: "/sticky-notes",
    community: "/community",
    community_ask: "/community/question-ask",
    community_topics: "/community/topics",
    account: "/account",
    account_emails: "/account/email-notifications",
    account_password: "/account/change-password",
    help: "/help",
    help_contact: "/help/contact-us",
    help_report: "/help/report-issue"
  }

  constructor(public router: Router) { }

  ngOnInit(): void {
    this.resetFilters();
    if (this.router.url == '/courses' || this.router.url == '/courses/enrolled') {
      this.submenuCourses = true;
    }
    if (this.router.url == '/sessions' || this.router.url == '/sessions/enrolled') {
      this.submenuSessions = true;
    }
    if (this.router.url == '/community' || this.router.url == '/community/question-ask' || this.router.url == '/community/question-update' || this.router.url == '/community/topics') {
      this.submenuCommunity = true;
    }
  }

  toggleSubMenuCourses() {
    if (!this.router.url.includes('courses')) {
      if (this.submenuCourses) this.submenuCourses = false;
      else if (!this.submenuCourses) this.submenuCourses = true;
    }
    this.submenuCommunity = false;
    this.submenuSessions = false;
  }

  toggleSubMenuSessions() {
    if (!this.router.url.includes('sessions')) {
      if (this.submenuSessions) this.submenuSessions = false;
      else if (!this.submenuSessions) this.submenuSessions = true;
    }
    this.submenuCommunity = false;
    this.submenuCourses = false;
  }

  toggleSubMenuCommunity() {
    if (!this.router.url.includes('community')) {
      if (this.submenuCommunity) this.submenuCommunity = false;
      else if (!this.submenuCommunity) this.submenuCommunity = true;
    }
    this.submenuCourses = false;
    this.submenuSessions = false;
  }

  resetFilters() {
    this.submenuCourses = false;
    this.submenuSessions = false;
    this.submenuCommunity = false;
  }

}

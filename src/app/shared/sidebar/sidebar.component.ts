import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  submenuAssessment: boolean = false;
  submenuSessions: boolean = false;
  submenuCommunity: boolean = false;

  urls: any = {
    home: "/",
    todos: "/todo",
    assessment: "/assessments",
    assessment_assignments: "/assessments/assignments",
    assessment_quizes: "/assessments/quizes",
    assessment_gdb: "/assessment/gdb",
    file_manager: "/file_manager",
    grade_book: "/grade_book",
    messages: "/messages",
    sticky_notes: "/sticky-notes",
    account_book: "/account-book",
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
    if (this.router.url.includes('assessment')) {
      this.submenuAssessment = true;
    }
    if (this.router.url.includes('sessions')) {
      this.submenuSessions = true;
    }
    if (this.router.url.includes('community')) {
      this.submenuCommunity = true;
    }
  }

  toggleSubMenuAssessment() {
    if (!this.router.url.includes('courses')) {
      if (this.submenuAssessment) this.submenuAssessment = false;
      else if (!this.submenuAssessment) this.submenuAssessment = true;
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
    this.submenuAssessment = false;
  }

  toggleSubMenuCommunity() {
    if (!this.router.url.includes('community')) {
      if (this.submenuCommunity) this.submenuCommunity = false;
      else if (!this.submenuCommunity) this.submenuCommunity = true;
    }
    this.submenuAssessment = false;
    this.submenuSessions = false;
  }

  resetFilters() {
    this.submenuAssessment = false;
    this.submenuSessions = false;
    this.submenuCommunity = false;
  }

}

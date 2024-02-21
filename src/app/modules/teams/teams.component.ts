import { Component, ElementRef, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/services/users/api.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css'],
})
export class TeamsComponent {
  teams: any;
  teamsFormType: string = 'create';
  team: any = {
    id: '',
    title: '',
  };

  users: any;
  userFormType: string = 'create';
  user: any = {
    id: '',
    name: '',
  };
  clientId: any;

  loading: boolean = false;

  dtOptions: any = {
    aaSorting: [],
    columnDefs: [{}],
    order: [[0, 'desc']],
  };

  constructor(
    private toastr: ToastrService,
    private apiServices: ApiService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getTeams();
    this.getUsers();
  }

  getTeams() {
    this.loading = true;

    this.teams = [];
    const data = {
      path: 'teams/list',
      payload: {},
    };
    this.apiServices.postRequest(data).subscribe((data) => {
      this.teams = data.data;
      console.log(this.teams);
      this.loading = false;
    });
  }

  addTeam() {
    const data = {
      path: 'teams/create',
      payload: {
        title: this.team.title,
      },
    };
    this.apiServices.postRequest(data).subscribe((data) => {
      this.toastr.success('Team added successfully!');
      this.resetTeamData();
      this.getTeams();
    });
  }

  updateTeam() {
    const data = {
      path: 'teams/update ',
      payload: {
        teamId: this.team.id,
        title: this.team.title,
      },
    };
    this.apiServices.postRequest(data).subscribe((data) => {
      this.toastr.success('Team updated successfully!');
      this.resetTeamData();
      this.getTeams();
    });
  }

  deleteTeam() {
    const data = {
      path: 'teams/delete ',
      payload: {
        teamId: this.team.id,
      },
    };
    this.apiServices.postRequest(data).subscribe((data) => {
      this.toastr.success('Team deleted successfully!');
      this.resetTeamData();
      this.getTeams();
    });
  }

  setTeam(obj: any) {
    this.team = {
      id: obj.id,
      title: obj.title,
    };
  }

  setTeamFormType(name: string) {
    this.teamsFormType = name;
  }

  resetTeamData() {
    this.teamsFormType = 'create';
    this.team = {
      id: '',
      title: '',
    };
  }

  getUsers() {
    const data = {
      path: 'users/list',
      payload: {},
    };
    this.apiServices.postRequest(data).subscribe((data) => {
      this.users = data.data;
    });
  }

  addUser() {
    const data = {
      path: 'team/users/create',
      payload: {
        userIds: [this.user.id],
        teamId: this.team.id,
      },
    };
    this.apiServices.postRequest(data).subscribe((data) => {
      this.toastr.success('User added successfully!');
      this.resetUserData();
      this.getTeams();
    });
  }

  deleteUser() {
    const data = {
      path: 'team/users/delete ',
      payload: {
        teamUserId: this.user.id,
      },
    };
    this.apiServices.postRequest(data).subscribe((data) => {
      this.toastr.success('User deleted successfully!');
      this.resetUserData();
      this.getTeams();
    });
  }

  setUser(obj: any) {
    this.user = {
      id: obj.id,
      name: obj.user.firstName + ' ' + obj.user.lastName,
    };
  }

  setUserFormType(name: string) {
    this.userFormType = name;
  }

  resetUserData() {
    this.user = {
      id: '',
      name: '',
    };
  }
}

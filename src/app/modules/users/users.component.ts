import { Component, ElementRef, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/services/users/api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent {
  users: any;
  roles: any;
  clients: any;
  selectedUser: any;
  userDetails: any;
  userId: any;
  departments: any;
  designations: any;

  constructor(private toastr: ToastrService, private apiServices: ApiService) {}

  @ViewChild('closeModal') closeModal: ElementRef | undefined;

  ngOnInit(): void {
    this.getRoles();
    this.getUsers();
    this.getClients();
    this.getDepartments();
    this.getDesignations();
  }

  getRoles() {
    const data = {
      path: 'roles/list',
      payload: {},
    };
    this.apiServices.postRequest(data).subscribe((data) => {
      this.roles = data.data;
    });
  }

  getUsers() {
    const data = {
      path: 'users/list',
      payload: {},
    };
    this.apiServices.postRequest(data).subscribe((data) => {
      this.users = data.data;
      console.log(this.users);
    });
  }

  getDepartments() {
    const data = {
      path: 'users/list/departments',
      payload: {},
    };
    this.apiServices.postRequest(data).subscribe((data) => {
      this.departments = data.data;
    });
  }

  getDesignations() {
    const data = {
      path: 'users/list/designations',
      payload: {},
    };
    this.apiServices.postRequest(data).subscribe((data) => {
      this.designations = data.data;
    });
  }

  getClients() {
    const data = {
      path: 'clients/list',
      payload: {},
    };
    this.apiServices.postRequest(data).subscribe((data) => {
      this.clients = data.data;
    });
  }

  addUser(user: any) {
    const data = {
      path: 'users/create',
      payload: {
        firstName: user.value.fname,
        lastName: user.value.lname,
        email: user.value.email,
        password: user.value.pass,
        managerId: user.value.managerId,
        departmentId: user.value.deptId,
        designationId: user.value.desigId,
        roleId: user.value.roleId,
        clientId: user.value.clientId,
      },
    };
    this.apiServices.postRequest(data).subscribe((data) => {
      if (this.closeModal) {
        this.closeModal.nativeElement.click();
      }
      user.reset();
      this.toastr.success('User added successfully!');
      this.getUsers();
    });
  }

  setUser(obj: any) {
    this.selectedUser = obj;
    console.log(this.selectedUser);
  }

  deleteUser() {
    const data = {
      path: 'users/delete',
      payload: {
        userId: this.selectedUser.id,
      },
    };
    this.apiServices.postRequest(data).subscribe((data) => {
      if (this.closeModal) {
        this.closeModal.nativeElement.click();
      }
      this.selectedUser = null;
      this.toastr.success('User deleted successfully!');
      this.getUsers();
    });
  }

  updateUser(user: any) {
    const data = {
      path: 'users/update',
      payload: {
        userId: this.selectedUser.id,
        firstName: user.value.fname,
        lastName: user.value.lname,
        email: user.value.email,
        managerId: this.selectedUser.managerId,
        departmentId: this.selectedUser.userDepartmentId,
        designationId: this.selectedUser.userDesignationId,
      },
    };
    this.apiServices.postRequest(data).subscribe((data) => {
      if (this.closeModal) {
        this.closeModal.nativeElement.click();
      }
      user.reset();
      this.selectedUser = null;
      this.toastr.success('User updated successfully!');
      this.getUsers();
    });
  }
}

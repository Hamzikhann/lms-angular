import { Component, ElementRef, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/services/users/api.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent {
  permission: any = { create: false, update: false, delete: false };
  roles: any;
  clients: any;
  departments: any;
  designations: any;
  users: any;
  user: any = {
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    departmentId: '',
    designationId: '',
    managerId: '',
    clientId: '',
    roleId: '',
  };
  loggedInUser: any;
  formType: string = 'create';

  selectedUser: any;
  userDetails: any;
  userId: any;

  loading: boolean = false;

  dtOptions: any = {
    aaSorting: [],
    columnDefs: [{}],
    order: [[0, 'desc']],
  };

  newPassword: string = '';
adduserbool:boolean=false
  constructor(
    private router: Router,
    private toastr: ToastrService,
    private apiServices: ApiService,
    private authService: AuthService
  ) {}

  @ViewChild('closeModal') closeModal: ElementRef | undefined;

  ngOnInit(): void {

    this.loggedInUser = JSON.parse(this.authService.getUser());
    if (this.loggedInUser.role.title == 'Administrator') {
      this.permission = { create: true, update: true, delete: true };

      this.getRoles();
      this.getClients();
      this.getUsers();
    } else if (this.loggedInUser.role.title == 'Client') {
      this.permission = { create: true, update: true, delete: true };

      this.getDepartments();
      this.getDesignations();
      this.getUsers();
    } else {
      this.router.navigate(['/']);
    }
  }

  getRoles() {
    const data = {
      path: 'roles/list',
      payload: {},
    };
    this.apiServices.postRequest(data).subscribe((data) => {
      this.roles = data.data;

      if (this.loggedInUser.role.title == 'Administrator') {
        this.roles = this.roles.filter(
          (role: { title: string }) => role.title !== 'User'
        );
      }
    });
  }

  getUsers() {
    this.loading = true;
    this.users = [];

    const data = {
      path: 'users/list',
      payload: {},
    };
    this.apiServices.postRequest(data).subscribe((data) => {
      this.users = data.data;
      this.loading = false;
    });
  }

  getDepartments() {
    this.loading = true;
    const data = {
      path: 'users/list/departments',
      payload: {},
    };
    this.apiServices.postRequest(data).subscribe((data) => {
      this.departments = data.data;
      this.loading = false;
    });
  }

  getDesignations() {
    this.loading = true;
    const data = {
      path: 'users/list/designations',
      payload: {},
    };
    this.apiServices.postRequest(data).subscribe((data) => {
      this.designations = data.data;
      this.loading = false;
    });
  }

  getClients() {
    this.loading = true;
    const data = {
      path: 'clients/list',
      payload: {},
    };
    this.apiServices.postRequest(data).subscribe((data) => {
      this.clients = data.data;
      this.loading = false;
    });
  }

  togglePassword(fieldId: string) {
    const passwordInput = document.getElementById(fieldId) as HTMLInputElement;
    if (passwordInput) {
      passwordInput.type =
        passwordInput.type === 'password' ? 'text' : 'password';
      const toggleButton = document.querySelector(
        `button[data-for="${fieldId}"]`
      ) as HTMLElement;
      if (toggleButton) {
        const iElement = toggleButton.querySelector('i') as HTMLElement;
        if (iElement) {
          iElement.classList.toggle('fa-eye-slash');
          iElement.classList.toggle('fa-eye');
        }
      }
    }
  }

  addUser() {
    this.users = [];
    const data = {
      path: 'users/create',
      payload: {
        firstName: this.user.firstName,
        lastName: this.user.lastName,
        email: this.user.email,
        password: this.user.password,
        managerId: this.user.managerId,
        departmentId: this.user.departmentId,
        designationId: this.user.designationId,
        clientId: this.user.clientId,
        roleId: this.user.roleId,
      },
    };
    this.apiServices.postRequest(data).subscribe((data) => {
      this.toastr.success('User added successfully!');
      this.resetUserData();
      this.getUsers();
    });
  }

  updateUser() {
    const data = {
      path: 'users/update',
      payload: {
        userId: this.user.id,
        firstName: this.user.firstName,
        lastName: this.user.lastName,
        email: this.user.email,
        managerId: this.user.managerId,
        departmentId: this.user.departmentId,
        designationId: this.user.designationId,
      },
    };
    this.apiServices.postRequest(data).subscribe((data) => {
      this.toastr.success('User updated successfully!');
      this.resetUserData();
      this.getUsers();
    });
  }

  deleteUser() {
    const data = {
      path: 'users/delete',
      payload: {
        userId: this.user.id,
      },
    };
    this.apiServices.postRequest(data).subscribe((data) => {
      this.toastr.success('User deleted successfully!');
      this.resetUserData();
      this.getUsers();
    });
  }

  updateUserPassword() {
    const data = {
      path: 'users/reset/credentials',
      payload: {
        userId: this.user.id,
        newPassword: this.newPassword,
      },
    };
    this.apiServices.postRequest(data).subscribe((data) => {
      if (this.closeModal) {
        this.closeModal.nativeElement.click();
      }
      this.toastr.success('User password updated successfully!');
      this.resetUserData();
      this.getUsers();
    });
  }

  setUser(obj: any) {
    this.user = {
      id: obj.id,
      firstName: obj.firstName,
      lastName: obj.lastName,
      email: obj.email,
      password: obj.password,
      departmentId: obj.userDepartmentId,
      designationId: obj.userDesignationId,
      managerId: obj.managerId,
      clientId: obj.clientId,
      roleId: obj.roleId,
    };
  }

  setFormType(name: string) {
    this.formType = name;
    this.addusertoogle()
  }

  resetUserData() {
    this.formType = 'create';
    this.user = {
      id: '',
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      departmentId: '',
      designationId: '',
      managerId: '',
      clientId: '',
      roleId: '',
    };
  }

  addusertoogle(){
    this.adduserbool=true
  }
  onclose(){
    this.adduserbool=false
    this.formType = 'create';
    this.user={
      id: '',
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      departmentId: '',
      designationId: '',
      managerId: '',
      clientId: '',
      roleId: '',
    };
  }
}

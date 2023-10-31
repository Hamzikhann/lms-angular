import { Component, ElementRef, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/users/api.service';
import { ConfigService } from 'src/app/config/config.service';
@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css'],
})
export class ClientsComponent {
  ImgBaseURL: string = this.config.ImgBaseURL;

  formType: string = 'create';
  clients: any;
  client: any = {
    id: '',
    name: '',
    website: '',
    logoURL: '',
  };
  selectedClient: any;
  logo: any;
  logoError: any;

  constructor(
    private toastr: ToastrService,
    private apiServices: ApiService,
    private config: ConfigService
  ) {}

  @ViewChild('closeModal') closeModal: ElementRef | undefined;

  ngOnInit(): void {
    this.getClients();
  }

  getClients() {
    this.clients = [];
    const data = {
      path: 'clients/list',
      payload: {},
    };
    this.apiServices.postRequest(data).subscribe((data) => {
      this.clients = data.data;
    });
  }

  addClient() {
    const data = {
      path: 'clients/create',
      payload: {
        name: this.client.name,
        website: this.client.website,
      },
    };
    this.apiServices.postRequest(data).subscribe((data) => {
      this.toastr.success('Client added successfully!');
      this.resetClientData();
      this.getClients();
    });
  }

  updateClient() {
    const data = {
      path: 'clients/update',
      payload: {
        clientId: this.client.id,
        name: this.client.name,
        website: this.client.website,
      },
    };
    this.apiServices.postRequest(data).subscribe((data) => {
      this.toastr.success('Client updated successfully!');
      this.resetClientData();
      this.getClients();
    });
  }

  deleteClient() {
    const data = {
      path: 'clients/delete',
      payload: {
        clientId: this.client.id,
      },
    };
    this.apiServices.postRequest(data).subscribe((data) => {
      this.toastr.success('Client deleted successfully!');
      this.resetClientData();
      this.getClients();
    });
  }

  setClientId(id: string) {
    this.client.id = id;
  }

  setClient(obj: any) {
    this.client = {
      id: obj.id,
      name: obj.name,
      website: obj.website,
      logoURL: obj.logoURL,
    };
  }

  resetClientData() {
    this.formType = 'create';
    this.client = {
      id: '',
      name: '',
      website: '',
      logoURL: '',
    };
  }

  setFormType(name: string) {
    this.formType = name;
  }

  updateLogo() {
    const payload = new FormData();
    payload.append('image', this.logo);
    payload.append('clientId', this.client.id);

    const data = {
      path: 'clients/update/image',
      payload,
    };
    this.apiServices.postRequest(data).subscribe((data) => {
      this.toastr.success('Logo updated successfully!');
      this.resetClientData();
      this.getClients();
      if (this.closeModal) {
        this.closeModal.nativeElement.click();
      }
    });
  }

  onSelectLogo(event: any) {
    if (event.addedFiles[0]) {
      this.logo = event.addedFiles[0];
    }
    if (event.rejectedFiles[0]) {
      const reason = event.rejectedFiles[0].reason;
      const type = event.rejectedFiles[0].type;
      if (reason == 'size') this.logoError = 'File size must be less than 1MB';
      if (type != 'image/jpeg' || type != 'image/png') {
        this.logoError = 'File types other than jpeg or png not allowed.';
      }
    }
  }

  onRemoveLogo(event: any) {
    this.logo = null;
  }
}

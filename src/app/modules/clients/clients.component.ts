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

  clients: any;
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
    const data = {
      path: 'clients/list',
      payload: {},
    };
    this.apiServices.postRequest(data).subscribe((data) => {
      this.clients = data.data;
      console.log(this.clients);
    });
  }

  addClient(client: any) {
    const data = {
      path: 'clients/create',
      payload: {
        name: client.value.name,
        website: client.value.web,
      },
    };
    this.apiServices.postRequest(data).subscribe((data) => {
      if (this.closeModal) {
        this.closeModal.nativeElement.click();
      }
      client.reset();
      this.toastr.success('Client added successfully!');
      this.getClients();
    });
  }

  setClient(obj: any) {
    this.selectedClient = obj;
    console.log(this.selectedClient);
  }

  deleteClient() {
    const data = {
      path: 'clients/delete',
      payload: {
        clientId: this.selectedClient.id,
      },
    };
    this.apiServices.postRequest(data).subscribe((data) => {
      if (this.closeModal) {
        this.closeModal.nativeElement.click();
      }
      this.selectedClient = null;
      this.toastr.success('Client deleted successfully!');
      this.getClients();
    });
  }

  updateClient(client: any) {
    const data = {
      path: 'clients/update',
      payload: {
        clientId: this.selectedClient.id,
        name: client.value.name,
        website: client.value.web,
      },
    };
    this.apiServices.postRequest(data).subscribe((data) => {
      if (this.closeModal) {
        this.closeModal.nativeElement.click();
      }
      client.reset();
      this.selectedClient = null;
      this.toastr.success('Client updated successfully!');
      this.getClients();
    });
  }

  updateLogo() {
    const payload = new FormData();
    payload.append('image', this.logo);
    payload.append('clientId', this.selectedClient.id);

    const data = {
      path: 'clients/update/image',
      payload,
    };
    console.log(data);

    this.apiServices.postRequest(data).subscribe((data) => {
      if (this.closeModal) {
        this.closeModal.nativeElement.click();
      }

      this.getClients();
      this.toastr.success('Logo updated successfully!');
    });
  }

  onSelectImage(event: any) {
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
    console.log(this.logo);
  }

  onRemove(event: any) {
    this.logo = null;
  }
}

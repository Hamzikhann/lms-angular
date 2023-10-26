import { Component, ElementRef, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css'],
})
export class ClientsComponent {
  clients: any;

  constructor(private toastr: ToastrService, private apiServices: ApiService) {}

  @ViewChild('closeAddClientModal') closeAddClientModal: ElementRef | undefined;

  ngOnInit(): void {
    this.getClients();
  }

  getClients() {
    const data = {
      path: 'clients/list',
      payload: {},
    };
    this.apiServices.postRequest(data).subscribe((data) => {
      this.clients = data;
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
      if (this.closeAddClientModal) {
        this.closeAddClientModal.nativeElement.click();
      }
      client.reset();
      this.toastr.success('Client added successfully!');
      this.getClients();
    });
  }

  updateClient(client: any) {}
}

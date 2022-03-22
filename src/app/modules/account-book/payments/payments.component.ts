import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css']
})
export class PaymentsComponent implements OnInit {

  accounts: any;
  outstanding_balance: any = 0;

  constructor() { }

  ngOnInit(): void {
    this.accounts = [
      {
        invoice: '10002331',
        date: '26 Feb 2022',
        amount: 12,
        status: 'paid',
        mode: 'cheque'
      },
      {
        invoice: '10003452',
        date: '26 Jan 2022',
        amount: 15,
        status: 'not paid',
        mode: 'cash'
      },
      {
        invoice: '10008531',
        date: '26 Jan 2022',
        amount: 10,
        status: 'not paid',
        mode: 'cash'
      },
      {
        invoice: '10002365',
        date: '26 Nov 2021',
        amount: 8,
        status: 'paid',
        mode: 'bank transfer'
      },
      {
        invoice: '10001231',
        date: '26 Sep 2021',
        amount: 22,
        status: 'paid',
        mode: 'jazz cash'
      },
      {
        invoice: '10002635',
        date: '26 Dec 2020',
        amount: 25,
        status: 'paid',
        mode: 'cheque'
      }
    ]
    this.accounts.forEach((element: any) => {
      if (element.status == 'not paid') {
        this.outstanding_balance += element.amount;
      }
    });
  }

}

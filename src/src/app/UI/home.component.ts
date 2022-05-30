import { Component, OnInit } from '@angular/core';
import { BackendService } from '../services/backend.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  b2cQuestions: string[] = ['do your customers love your Tiny ads, but scared of PoP-Up Monsters?', 'do your customers lack trust/avoid using your payments methods & wonder if your solution is PCI DSS compliant?', 'do you want to have dynamic ads interfaces?', 'do you like your business to accept payments from 100+ countries?', 'do you like add no-code payment api in your ad?', 'do you want to manage all your customer ads from one place?'];
  b2bQuestions: string[] = ['do you want Invoice with payments method built in?', 'do you want your clients to pay on time?', 'do you like your business to accept payments from 100+ countries?', 'do you like to add no-code PCI DSS compliant payment payment methods in your invoice?', 'do you want to offer BUY NOW PAY LATER in your invoice?', 'do you want to manage all your invoices & revenue from one place?', 'do you want to have dynamic invoice interfaces?'];

  constructor(private _backendService: BackendService) { }

  ngOnInit(): void {
  }

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { moveIn, fallIn } from '../router.animations';
import { BackendService } from '../../services/backend.service';
import { DBInBoundData, DBOutBoundData } from '../../services/data.model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  animations: [moveIn(), fallIn()],
  host: { '[@fallIn]': '' }
})
export class SignupComponent implements OnInit {
  state: string = ''; // required for router animation
  dataLoading: boolean = false; // spinner boolean
  IBData: DBInBoundData = new DBInBoundData; // inbound data
  // inbound data
  OBData: DBOutBoundData = new DBOutBoundData; // outbound data
  // outbound data

  constructor(private _router: Router, private _backendService: BackendService) { }

  ngOnInit(): void {
    this.IBData = {
      error: false,
      statusCode: 0, // 0 initial, 1 saved, 2 others
      statusMessage: "", // error or success message from server
      rowCount: 0, // number of rows returned
      data: "" // actual data
    } // inbound data
    this.OBData = {
      rowCount: 1,
      recordType: "signup",
      data: ""
    }; // outbound data
  }

  onSubmit(formData: any) {
    this.dataLoading = true;
    this.OBData.data = formData;
    return this._backendService.createUser(this.OBData).then(res => {
      this.IBData.error = false;
      this.IBData.statusCode = 1;
      let stEmail = (!res) ? "not found" : "User exists";
      this.IBData.statusMessage = stEmail;
    }).catch((error: string | undefined) => {
      this.IBData.error = true;
      this.IBData.statusCode = 0;
      let stEmail = "User ID already exists. Please use another email ID to sign up or reset your password.";
      this.IBData.statusMessage = stEmail;
    }).then(() => this.dataLoading = false);
  }

  routeLoginPage() {
    this._router.navigate(['/login']);
  }

}
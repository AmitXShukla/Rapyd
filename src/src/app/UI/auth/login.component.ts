import { Component, OnInit } from '@angular/core';
import { moveIn, fallIn } from '../router.animations';
import { environment } from '../../../environments/environment';
import { BackendService } from '../../services/backend.service';
import { DBInBoundData, DBOutBoundData } from '../../services/data.model';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [moveIn(), fallIn()],
  host: { '[@fallIn]': '' }
})
export class LoginComponent implements OnInit {
  showPage: boolean = true;
  showFiller: boolean = true;
  socialAuth: boolean = false; // show Google and FB Sign in only when social auth is enabled
  state: string = ''; // required for router animation
  dataLoading: boolean = false; // spinner boolean
  IBData: DBInBoundData = new DBInBoundData; // inbound data
  // inbound data
  OBData: DBOutBoundData = new DBOutBoundData; // outbound data
  // outbound data


  constructor(public auth: AngularFireAuth, private _backendService: BackendService) { }

  ngOnInit(): void {
    if (environment.socialAuthEnabled) {
      this.socialAuth = true; // show Google and FB Sign in only when social auth is enabled
    }
    this.IBData = {
      error: false,
      statusCode: 0, // 0 initial, 1 saved, 2 others
      statusMessage: "", // error or success message from server
      rowCount: 0, // number of rows returned
      data: "" // actual data
    } // inbound data
    this.OBData = {
      rowCount: 1,
      recordType: "login",
      data: ""
    }; // outbound data
  }
  loginEmail(formData: any) {
    this.dataLoading = true;
    this.OBData.data = formData;
    return this._backendService.loginEmail(this.OBData).then(() => {
      this.IBData.error = false;
      this.IBData.statusCode = 1;
    }).catch((error: string) => {
      this.IBData.error = true;
      this.IBData.statusCode = 0;
      this.IBData.statusMessage = error;
    }).then(() => this.dataLoading = false);
  }
  loginSocial(formType: any) {
    this.dataLoading = true;
    return this._backendService.loginSocialAuth(formType).then(() => {
      this.IBData.error = false;
      this.IBData.statusCode = 1;
    }).catch((error: string) => {
      this.IBData.error = true;
      this.IBData.statusCode = 0;
      this.IBData.statusMessage = error;
    }).then(() => this.dataLoading = false);
  }

  logout() {
    this.auth.signOut();
  }
}
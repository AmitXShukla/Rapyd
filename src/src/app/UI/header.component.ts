import { Component, OnInit, Input } from '@angular/core';
import { BackendService } from '../services/backend.service';
// import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input() imageUrl: string | undefined;
  @Input() pageTitle: string | undefined;
  @Input() helpType: string | undefined;
  configData: any;
  // authState: any;

  // constructor(public afAuth: AngularFireAuth) { }
  constructor(private _backendService: BackendService) { }

  ngOnInit(): void {
    this.configData = this._backendService.getConfig("helpText");
    // this.afAuth.authState.subscribe((authState: any) => {
    //   this.authState = authState;
    // })
  }

}
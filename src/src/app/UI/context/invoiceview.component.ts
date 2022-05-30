import { Component, OnInit } from '@angular/core';
import { moveIn, fallIn } from '../router.animations';
import { DBInBoundData, DBOutBoundData } from '../../services/data.model';
import { BackendService } from '../../services/backend.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { Observable, Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-invoiceview',
  templateUrl: './invoiceview.component.html',
  styleUrls: ['./invoiceview.component.css'],
  animations: [moveIn(), fallIn()],
  host: { '[@fallIn]': '' }
})
export class InvoiceviewComponent implements OnInit {
  state: string = ''; // required for router animation
  dataLoading: boolean = false; // spinner boolean
  IBData: DBInBoundData = new DBInBoundData; // inbound data
  // inbound data
  OBData: DBOutBoundData = new DBOutBoundData; // outbound data
  // outbound data
  isEditable = false;
  toggleAd = false;
  docUrl: any;
  iframeSRC: any;
  data$: Observable<any> | undefined;
  fileName = "any";
  _url: SafeResourceUrl | undefined;
  isLinear = false;
  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;
  thirdFormGroup!: FormGroup;
  // myScriptElement: HTMLScriptElement | undefined;

  constructor(private _formBuilder: FormBuilder, private _backendService: BackendService,
    private _router: ActivatedRoute, public domSanitizer: DomSanitizer) {
    // this.myScriptElement = document.createElement("script");
    // this.myScriptElement.src = "../../../assets/checkout.js";
    // document.body.appendChild(this.myScriptElement);
  }

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
      recordType: "login",
      data: ""
    }; // outbound data
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required],
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required],
    });
    let id = this._router.snapshot.paramMap.get("id");
    this.getDocUrl(id);
    this.getCheckOutSrc(id);
  }

  getDocUrl(docId: any) {
    this._backendService.getDoc("INVOICE", docId).subscribe((res: any) => {
      this.docUrl = this._backendService.getFileDownloadUrl(res.files[0]);
    });
  }

  async getCheckOutSrc(docId: any) {
    let Res: { [index: string]: any };
    await this._backendService.getDoc("INVOICE", docId).forEach((item: any) => {
      Res = item;
      this._url = this.domSanitizer.bypassSecurityTrustResourceUrl(Res["checkoutId"]);
    });
  }
}
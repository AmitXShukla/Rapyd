import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { moveIn, fallIn } from '../router.animations';
import { DBInBoundData, DBOutBoundData } from '../../services/data.model';
import { Observable, Subscription } from 'rxjs';
import { DataSource } from '@angular/cdk/collections';
// import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { BackendService } from '../../services/backend.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-ad',
  templateUrl: './ad.component.html',
  styleUrls: ['./ad.component.css'],
  animations: [moveIn(), fallIn()],
  host: { '[@moveIn]': '' }
})
export class AdComponent implements OnInit, OnDestroy {
  state: string = ''; // required for router animation  
  dataLoading: boolean = false; // spinner boolean
  IBData: DBInBoundData = new DBInBoundData; // inbound data
  // inbound data
  OBData: DBOutBoundData = new DBOutBoundData; // outbound data
  // outbound data
  members: any[] | undefined;
  dataSource!: MatTableDataSource<any>;
  myDocData: any;
  data$: Observable<any> | undefined;
  toggleField: string | undefined;
  savedChanges = false;
  error: boolean = false;
  errorMessage: String = "";
  private querySubscription!: Promise<void> | Subscription;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;
  displayedColumns = ['code', 'descr', '_id'];
  salCDs$: any;
  docUrl: Observable<string | null> | undefined;
  docId: string | undefined;
  fileName!: string;
  showDocument: boolean = false;
  showFileUpload: boolean = false;
  embedCode: string | undefined;

  constructor(private _backendService: BackendService) { }

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
    this.toggleField = "searchMode";
    this.dataSource = new MatTableDataSource(this.members);
  }

  //mat table paginator and filter functions
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  // applyFilter(filterValue: string) {
  //   filterValue = filterValue.trim(); // Remove whitespace
  //   filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
  //   this.dataSource.filter = filterValue;
  // }
  ngOnDestroy() {
    // this is not needed when observable is used, in this case, we are registering user on subscription
    if (this.querySubscription) {
      // this.querySubscription.unsubscribe();
    }
  }

  toggle(filter?: string) {
    if (!filter) { filter = "searchMode" }
    else { filter = filter; }
    this.toggleField = filter;
    this.dataLoading = false;
  }

  getData(formData?: any) {
    this.dataLoading = true;
    this._backendService.getDocs('AD', formData).forEach((res) => {
      // console.log("res")
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }).then(() => this.dataLoading = false);
    this.dataLoading = false
  }

  setData(formData: any) {
    this.dataLoading = true;
    let bd = { "amount": formData.price, country: "US", currency: "USD" };
    this._backendService.getCheckOutId(bd).forEach((res) => {
      let Res: { [index: string]: any } = res;
      if (!Res["status"].error_code) {
        formData.checkoutId = this._backendService.getConfig("checkoutBaseAPIUrl") + "/ad/" + Res["data"].id
      }
    }).then((res) => {
      this.querySubscription = this._backendService.setDoc('AD', formData).then((res: any) => {
        if (res) {
          this.savedChanges = true;
          this.error = false;
          this.errorMessage = "";
          this.dataLoading = false;
        }
      }
      ).catch((err: { message: String; }) => {
        if (err) {
          this.error = true;
          this.errorMessage = err.message;
          this.dataLoading = false;
        }
      }
      );
    });
  }

  updateData(formData: { _id: any; }) {
    this.dataLoading = true;
    this.querySubscription = this._backendService.updateDoc('AD', formData._id, formData).then((res: any) => {
      if (res) {
        this.savedChanges = true;
        this.error = false;
        this.errorMessage = "";
        this.dataLoading = false;
      }
    }
    ).catch((err: { message: String; }) => {
      if (err) {
        this.error = true;
        this.errorMessage = err.message;
        this.dataLoading = false;
      }
    });
  }

  getDoc(docId: any) {
    this.docId = docId; // this is required to pass at file upload directive
    this.dataLoading = true;
    this.data$ = this._backendService.getDoc('AD', docId);
    this.toggle('editMode');
    this.dataLoading = false;
    // this.dataLoading = true;
    // this.data$ = this._backendService.getDoc('EMPLOYEE', docId).subscribe(res => {
    //   if (res) {
    //     this.data$ = res;
    //     this.toggle('editMode');
    //     this.dataLoading = false;
    //   }
    // },
    //   (error) => {
    //     this.error = true;
    //     this.errorMessage = error.message;
    //     this.dataLoading = false;
    //   },
    //   () => {
    //     this.dataLoading = false;
    //   });
  }

  deleteDoc(docId: any) {
    if (confirm("Are you sure want to delete this record ?")) {
      this.dataLoading = true;
      this._backendService.deleteDoc('AD', docId).then((res: any) => {
        if (res) {
          this.error = false;
          this.errorMessage = "";
          this.dataLoading = false;
        }
      }
      ).catch((err: { message: String; }) => {
        if (err) {
          this.error = true;
          this.errorMessage = err.message;
          this.dataLoading = false;
        }
      }
      );
    }
  }
  getDocUrl(docUrl: any) {
    this.fileName = docUrl;
    this.docUrl = this._backendService.getFileDownloadUrl(docUrl);
  }

  setEmbedCode(docId: any) {
    return this.embedCode = '<iframe width="560" height="315" src="' + this._backendService.getConfig("checkoutBaseEmbedUrl") + '/ads/' + docId + '" title="Rapyd Payment Solution" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'

  }
}
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AdminService } from '../../../services';
import { Observable, Subscription } from 'rxjs';
import { Admin } from '../../../models/admin-model';

@Component({
  selector: 'app-remove-admin',
  templateUrl: './remove-admin.component.html',
  styleUrls: ['./remove-admin.component.scss']
})


export class RemoveAdminComponent implements OnInit, OnDestroy {
  iconEmpty:string = 'person';
  messageEmpty:string = 'There are no admins';
  iconNotFound:string = 'search';
  messageNotFound:string = 'There are no admins you are loking for';
  removeAdminSubscription: Subscription = new Subscription();
  admins: Observable<Array<any>>;
  arrOfAdmins: Observable<Array<any>>;
  filteredArr: Observable<Array<any>>;
  showSpinner: boolean = true;
  constructor(
    private _adminService: AdminService
  ) {

  }

  getAdminsArr(): void{
    this.removeAdminSubscription.add(this._adminService.getAdminsList()
    .subscribe(res => {
      this.showSpinner = false;
      this.admins = res;
      this.arrOfAdmins = this.admins;
    }))
  }

  ngOnInit() {
    this.getAdminsArr();
  }

  ngOnDestroy(){
    this.removeAdminSubscription.unsubscribe();
  }

  filterItem(phrase) {
    this.admins = this.arrOfAdmins;
    this.admins = this._adminService.findAdmin(phrase, this.admins);
  }
}

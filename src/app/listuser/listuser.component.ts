import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from '../service/user.service';


@Component({
  selector: 'app-listuser',
  templateUrl: './listuser.component.html',
  styleUrls: ['./listuser.component.css']
})
export class ListuserComponent implements OnInit,OnDestroy {
  userData;
  private subs:Subscription;
  searchKeyword:string;
  constructor(private userservice: UserService) { }

  ngOnInit() {
    this.userData = this.userservice.getUsers();
   this.subs = this.userservice.userDataListener().subscribe((data) => {
      this.userData = data;
      console.log("dsf");
      console.log(this.userData);
    });

  }
  trackUser(index:number,user:any):string{
    return user.name;
  }
  onDelete(value){
   console.log(value,"this");
   this.userservice.deleteRow(value);
  }
  onUpdate(value){
    console.log(value);
    this.userservice.UpdateRow(value);
  }
  ngOnDestroy(){
   this.subs.unsubscribe();
  }



}

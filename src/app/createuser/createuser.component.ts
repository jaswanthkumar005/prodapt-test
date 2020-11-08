import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute,ParamMap,Router } from '@angular/router';
import { UserService } from '../service/user.service';
import * as uuid from 'uuid';
import { Employee } from '../employee.model';
@Component({
  selector: 'app-createuser',
  templateUrl: './createuser.component.html',
  styleUrls: ['./createuser.component.css']
})
export class CreateuserComponent implements OnInit,AfterViewInit {
  @ViewChild("f",{static:false}) userForm:NgForm;
   mode = "create";
  employee:Employee;
  private updateId: string;
  constructor(
    private userservice:UserService,
     private activateRoute:ActivatedRoute,
     private router:Router) { }

  ngOnInit() {
    console.log(this.router.url);
    if(this.router.url == "/edit"){
     this.mode = "edit"
    }
   console.log(this.mode);
    this.activateRoute.paramMap.subscribe((paramMap:ParamMap) => {
      console.log(paramMap);
      if(paramMap.has("id")){
        this.mode = "update";
        this.updateId = paramMap.get('id');
        console.log(paramMap.get('id'), "is it");
        const updatedValue = this.userservice.UpdateRow(this.updateId);
        console.log(updatedValue);
        setTimeout(() => {
          this.userForm.setValue({
            firstName:updatedValue.firstName,
            lastName:updatedValue.lastName,
            email:updatedValue.email
          });
        },0)


      }
    })

  }

  ngAfterViewInit(){

  }


  getUserDate(form:NgForm){
    //console.log(this.userForm.value);

   console.log(form.value);
   if(this.mode == "update"){

   this.employee = {
    firstName:this.userForm.value.firstName,
    lastName:this.userForm.value.lastName,
    email:this.userForm.value.email,
    id: this.updateId
  };
   this.userservice.updatePost(this.employee);

   } else{
    this.mode = "create"
    this.employee = {
      firstName:this.userForm.value.firstName,
      lastName:this.userForm.value.lastName,
      email:this.userForm.value.email,
      id: uuid.v4()
    };
    console.log(this.employee);
  this.userservice.getUserValue(this.employee);

   }

   this.router.navigate(['/'],{relativeTo:this.activateRoute});
   form.resetForm();
  }

  resetForm(){
    this.userForm.resetForm();
  }


}

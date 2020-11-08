import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import * as uuid from 'uuid';
import {Employee} from '../employee.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  employee:Employee[] = [
  {
  id: uuid.v4(),
  firstName:"jaswanth",
  lastName:"kumar",
  email:"jaswanthmyname@gmail.com"
  },
  {
    id: uuid.v4(),
    firstName:"khadar",
    lastName:"Mohammad",
    email:"khadar@gmail.com"
    },
    {
      id: uuid.v4(),
      firstName:"varun",
      lastName:"kumar",
      email:"varun@gmail.com"
      },
      {
        id: uuid.v4(),
        firstName:"vijay",
        lastName:"kumar",
        email:"varun@gmail.com"
        }
]
  //userData=[];
 private userUpdatedValue = new Subject<any>();
 //private userFormEditValue = new Subject<any>();
  constructor(private router:Router, private activateRoute: ActivatedRoute){}
  getUserValue(data){
    this.employee.push(data);
    this.userUpdatedValue.next([...this.employee]);
  }
  userDataListener(){
    return this.userUpdatedValue.asObservable();
  }

  getUsers(){
    return this.employee
  }
  deleteRow(id){
    const updatedPost = this.employee.filter(post => post.id !== id);
    this.employee = updatedPost;
    this.userUpdatedValue.next([...this.employee]);
  }
  UpdateRow(id){
    const updatedPost = this.employee.find((data) => {
      return data.id == id;
    });
    console.log(updatedPost);
    return updatedPost;
  }

  updatePost(employee:Employee){
   console.log(employee);
   const updatedPost = [...this.employee];
   const updatedIndex = updatedPost.findIndex(data => data.id == employee.id);
   const post : Employee = {
     id:employee.id,
     firstName:employee.firstName,
     lastName:employee.lastName,
     email:employee.email
   };
   updatedPost[updatedIndex] = post;
   this.employee = updatedPost;
   this.userUpdatedValue.next([...this.employee]);
   this.router.navigate(['/'], {relativeTo:this.activateRoute});
  }
}

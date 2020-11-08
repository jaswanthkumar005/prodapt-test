import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import {interval, Observable, Observer, of, Subscription} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations:[
    trigger('divState',[
     state('normal',style({
       backgroundColor:"orange",
       transform: 'translateX(0)'
     })),
     state('highlighted',style({
      backgroundColor:"red",
       transform: 'translateX(100px)'
     })),
     transition("normal <=> highlighted",animate(1000))
    ]),
    trigger('wildState',[
      state('normal',style({
        backgroundColor:"orange",
        transform: 'translateX(0) scale(1)'
      })),
      state('highlighted',style({
       backgroundColor:"red",
        transform: 'translateX(100px) scale(1)'
      })),
      state('shruken',style({
        backgroundColor:"red",
         transform: 'translateX(0px) scale(0.5)'
       })),
      transition("normal => highlighted",animate(300)),
      transition("highlighted => normal",animate(800)),
      transition("shrunken <=> *",[
        style({
          backgroundColor:"orange"
        }),
        animate(1000,style({
          borderRadius:'50px'
        })),
        animate(1500)
      ])
     ])
  ]
})
export class AppComponent implements OnInit {
  title = 'test-app';
  state = "normal";
  wildState = "normal";
  subscription:Subscription;

  ngOnInit(){


  }




}

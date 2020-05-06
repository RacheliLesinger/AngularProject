import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
users:any=[];
user = {
  name:'',
  email:'',
  password:''
}

onSend({value, valid}){
  if(valid){
    console.log(value);
  }else{
    console.log("Not Valid")
  }
}


  constructor(){}

  ngOnInit() {
  }

  //addUser(newName, newEmail,  newPassword){}
  
}



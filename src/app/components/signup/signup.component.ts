import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
users:any=[];
user = {
  first:'',
  last:'',
  name:'',
  email:'',
  address:'',
  faculty:'',
  password:''
};
submitted = false;

onSend({value, valid}){
  if(valid){
    console.log(value);
    this.saveNewUser();
  }
  else{
    console.log("Not Valid")
  }
}

saveNewUser()
{
  debugger;
  const data = {
    firstname: this.user.first,
    lastname: this.user.last,
    username: this.user.name,
    email: this.user.email,
    address: this.user.address,
    faculty: this.user.faculty,
    password: this.user.password,


    status:"student"
    //faculty:faculty
  };

  this.userService.create(data)
    .subscribe(
      response => {
        console.log(response);
        this.submitted = true;
      },
      error => {
        console.log(error);
      });
}

 constructor(private userService: UserService) { }

  ngOnInit() {
  }

  //addUser(newName, newEmail,  newPassword){}
  
}



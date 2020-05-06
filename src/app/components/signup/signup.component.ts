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
  name:'',
  email:'',
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
    username: this.user.name,
    email: this.user.email,
    password: this.user.password,

    first_name: "first name",
    last_name: "last name",
    status:"status"
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



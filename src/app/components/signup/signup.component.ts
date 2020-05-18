import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { AuthonticationService } from 'src/app/services/authontication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  displayForLecturer=true
  displayForStudent=true
 
  displaySigning=false
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
    this.router.navigate(['/tutorials/' ]);
  }
  else{
    console.log("Not Valid")
  }
}

saveNewUser()
{
  debugger;
  const data = {
    first_name: this.user.first,
    last_name: this.user.last,
    username: this.user.name,
    email: this.user.email,
    address: this.user.address,
    //faculty: this.user.faculty,
    password: this.user.password,


    status:"student"
    //faculty:faculty
  };

  
  this.userService.create(data)
    .subscribe(
      response => {
        console.log(response);
        this.authonticationService.initUser(response);
        this.submitted = true;
      },
      error => {
        console.log(error);
      });
}

 constructor(private userService: UserService,
  private authonticationService: AuthonticationService,
  private router: Router) { }

  ngOnInit() {
  }

  //addUser(newName, newEmail,  newPassword){}
  
}



import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { AuthonticationService } from 'src/app/services/authontication.service';
import { Router } from '@angular/router';
import { FacultyService } from 'src/app/services/faculty.service';
import { Faculty } from 'src/app/models/faculty.model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  displayForLecturer=true
  displayForStudent=true
 
  displaySigning=false;
  facultiesList:Faculty[] = [];
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
    first_name: this.user.first,
    last_name: this.user.last,
    username: this.user.name,
    email: this.user.email,
    address: this.user.address,
    faculty: this.user.faculty,
    password: this.user.password,

    status:"student"
  };

  
  this.userService.create(data)
    .subscribe(
      response => {
        console.log(response);
        this.authonticationService.initUser(response);
        this.submitted = true;
        this.router.navigate(['/tutorials/' ]);
      },
      error => {
        console.log(error);
      });
}

 constructor(private userService: UserService,
  private authonticationService: AuthonticationService,
  private facultysService:FacultyService,
  private router: Router) { }

  ngOnInit() {
    this.facultysService.getAll().subscribe((facultiesData: []) => {
      this.facultiesList = facultiesData;
      console.log(this.facultiesList);
  });
  }

  //addUser(newName, newEmail,  newPassword){}
  
}



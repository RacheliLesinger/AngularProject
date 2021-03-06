import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AuthonticationService } from 'src/app/services/authontication.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  currentUserSignIn:User=null
  displayForLecturer:boolean
  displayForStudent=true
  displaySigning=false
  currentUser = null;
  message = '';
  lectures=[];
  tutorialPerLecturer=[];
  user:any;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private authonticationService: AuthonticationService)  {
      this.currentUserSignIn = this.authonticationService.currentUserValue;
      if(this.currentUser!=null){
      if(this.currentUser.status=="lecturer"){
        this.displayForLecturer=true
      }
      else{
        this.displayForLecturer=false
      }
    }
     }

  ngOnInit() {
    this.userService.getnumOfTutorial().subscribe((lecturesData: []) => {
      this.lectures = lecturesData;
      console.log(this.lectures);
      this.lectures.forEach(value=>{
        console.log("value",value);
        this.userService.get(value._id).subscribe(
          data => {
           this.user=data
           this.tutorialPerLecturer.push({lecturer:this.user.first_name+" "+this.user.last_name,count:value.count})
          }
        )
       
      });
      
  });

    this.message = '';
    this.getUser(this.route.snapshot.paramMap.get('id'));
   
  }

  getUser(user) {
    this.userService.get(user)
      .subscribe(
        data => {
          this.currentUser = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  

  deleteUser() {
    this.userService.delete(this.currentUser.id)
      .subscribe(
        response => {
          console.log(response);
          this.router.navigate(['/users']);
        },
        error => {
          console.log(error);
        });
  }
}

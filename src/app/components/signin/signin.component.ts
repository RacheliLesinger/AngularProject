import { Component, OnInit , ElementRef, ViewChild} from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { AuthonticationService } from 'src/app/services/authontication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  @ViewChild('myMessageDiv',{static: false}) myMessageDiv: ElementRef;
  displayForLecturer=false
  displayForStudent=false
  displaySigning=true;
  errorMessage="no such user or password, try again ";
  errorMessageDisplay=false

  user = {
    uname:'',
    psw:'',
}

  constructor(private userService: UserService,
    private authonticationService: AuthonticationService,private router: Router) { }

  ngOnInit() {
  }
  searchUser() {
    this.userService.findExistsUse(this.user.uname,this.user.psw)
      .subscribe(
        response => {
          if(response)
         { this.authonticationService.initUser(response);
          this.router.navigate(['/tutorials/' ]);
         }
         
        },
        error => {
          console.log(error);
              this.errorMessageDisplay=true
              console.log( this.errorMessageDisplay)
      
        });
  }
}

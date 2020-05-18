import { Component, OnInit } from '@angular/core';
import { TutorialService } from 'src/app/services/tutorial.service';
import { User } from 'src/app/models/user.model';
import { AuthonticationService } from 'src/app/services/authontication.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  displayForLecturer=false
  displayForStudent=false
  displaySigning=true


  currentUser :User;
  tutorials: any;
  currentTutorial = null;
  currentIndex = -1;
  title = '';
  
  constructor(private tutorialService: TutorialService,
              private authonticationService: AuthonticationService) {
            
               }

  ngOnInit() {

    
    this.retrieveTutorials();
    this.currentUser = this.authonticationService.currentUserValue;
    
  }

  public get third(): number {
    if(this.tutorials)
      return Math.ceil(this.tutorials.length / 3);
    return 1;  
}

  retrieveTutorials() {
    this.tutorialService.getAll()
      .subscribe(
        data => {
          this.tutorials = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }


  

}

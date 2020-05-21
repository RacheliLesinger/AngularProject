import { Component, OnInit } from '@angular/core';
import { TutorialService } from 'src/app/services/tutorial.service';
import { ActivatedRoute, Router } from '@angular/router';
import{UserService} from "src/app/services/user.service"
import { FacultyService } from 'src/app/services/faculty.service';
import { AuthonticationService } from 'src/app/services/authontication.service';
import { User } from 'src/app/models/user.model';


@Component({
  selector: 'app-tutorial-details',
  templateUrl: './tutorial-details.component.html',
  styleUrls: ['./tutorial-details.component.css']
})
export class TutorialDetailsComponent implements OnInit {
  displayForLecturer:boolean
  displayForStudent=true
  displaySigning=false
  currentUserSignIn:User=null
  currentTutorial = null;
  currentUser=null;
  currentFaculty=null;
  message = '';

  constructor(
    private tutorialService: TutorialService,
    private userService: UserService,
    private facultyService: FacultyService,
    private route: ActivatedRoute,
    private router: Router,
    private authonticationService: AuthonticationService) {
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
    this.message = '';
    this.getTutorial(this.route.snapshot.paramMap.get('id'));
    
  }

  getTutorial(id) {
    this.tutorialService.getTutorial(id)
      .subscribe(
        data => {
          this.currentTutorial = data;
        
          this.userService.get(this.currentTutorial.name).subscribe( data =>{
            this.currentUser=data;
            console.log(data);
          },  error => {
            console.log(error);
          });
          this.facultyService.get(this.currentTutorial.faculty).subscribe( data =>{
            this.currentFaculty=data;
            console.log(data);
          },  error => {
            console.log(error);
          });
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  // updatePublished(status) {
  //   const data = {
  //     title: this.currentTutorial.title,
  //     description: this.currentTutorial.description,
  //     img:this.currentTutorial.img
  //   };

  //   this.tutorialService.updateTutorial(this.currentTutorial.id, data)
  //     .subscribe(
  //       response => {
  //         this.currentTutorial.published = status;
  //         console.log(response);
  //       },
  //       error => {
  //         console.log(error);
  //       });
  // }

  updateTutorial() {
    this.tutorialService.updateTutorial(this.currentTutorial.id, this.currentTutorial.title, this.currentTutorial.faculty,this.currentTutorial.description,this.currentTutorial.img, this.currentTutorial.link)
      // .subscribe(
      //   response => {
      //     console.log(response);
      //     this.message = 'The tutorial was updated successfully!';
      //   },
      //   error => {
      //     console.log(error);
      //   });
  }

  deleteTutorial() {
    this.tutorialService.deleteTutorial(this.currentTutorial.id)
      .subscribe(
        response => {
          console.log(response);
          this.router.navigate(['/tutorials']);
        },
        error => {
          console.log(error);
        });
  }
}

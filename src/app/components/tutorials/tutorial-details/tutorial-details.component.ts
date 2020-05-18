import { Component, OnInit } from '@angular/core';
import { TutorialService } from 'src/app/services/tutorial.service';
import { ActivatedRoute, Router } from '@angular/router';
import{UserService} from "src/app/services/user.service"
import { FacultyService } from 'src/app/services/faculty.service';

@Component({
  selector: 'app-tutorial-details',
  templateUrl: './tutorial-details.component.html',
  styleUrls: ['./tutorial-details.component.css']
})
export class TutorialDetailsComponent implements OnInit {
  currentTutorial = null;
  currentUser=null;
  currentFaculty=null;
  message = '';

  constructor(
    private tutorialService: TutorialService,
    private userService: UserService,
    private facultyService: FacultyService,
    private route: ActivatedRoute,
    private router: Router) { }

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

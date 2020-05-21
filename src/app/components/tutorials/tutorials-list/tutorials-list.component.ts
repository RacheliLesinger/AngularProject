import { Component, OnInit , OnDestroy} from '@angular/core';
import { TutorialService } from 'src/app/services/tutorial.service';
import { AuthonticationService } from 'src/app/services/authontication.service';
import { User } from 'src/app/models/user.model';
import { PageEvent } from "@angular/material";
import { Subscription } from "rxjs";
import { Tutorial } from 'src/app/models/tutorial.model';
import { Router } from '@angular/router';
import { FacultyService } from 'src/app/services/faculty.service';



@Component({
  selector: 'app-tutorials-list',
  templateUrl: './tutorials-list.component.html',
  styleUrls: ['./tutorials-list.component.css']
})
export class TutorialsListComponent implements OnInit , OnDestroy{
 
  displayForLecturer=false
  displayForStudent=true
  displaySigning=false
  currentUser :User;
  tutorials: Tutorial[] = [];
  isLoading = false;
  totalTutorials = 0;
  tutorialsPerPage = 9;
  currentPage = 1;
  tutorials_search:any;

  faculties: any;
  currentTutoria = null;
  currentIndex = -1;




  title = '';
  description = '';
  faculty: '';

  private tutorialsSub: Subscription;

  constructor(private tutorialService: TutorialService,
              private router: Router,
              private authonticationService: AuthonticationService,
              private facultyService: FacultyService

            ) { 
              this.currentUser = this.authonticationService.currentUserValue;
              console.log(this.currentUser.status)
              if(this.currentUser.status=="lecturer"){
                this.displayForLecturer=true
              }
              else{
                this.displayForLecturer=false
              }
            }

  ngOnInit() {
    this.retrieveFaculties();

    this.retrieveTutorials();
    this.isLoading = true;
    
    // this.tutorialService.getTutorials(this.tutorialsPerPage, this.currentPage);
    this.tutorialsSub = this.tutorialService
      .getTutorialUpdateListener()
      .subscribe((tutorialData: {tutorials: Tutorial[], tutorialCount: number}) => {
        this.isLoading = false;
        this.totalTutorials = tutorialData.tutorialCount;
        this.tutorials = tutorialData.tutorials;
      });
  
  }

 

  retrieveFaculties() {
    this.facultyService.getAll()
      .subscribe(
        data => {
          this.faculties = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  retrieveTutorials() {
    this.tutorialService.getAll()
      .subscribe(
        data => {
          this.tutorials_search = data;
          console.log("@@@@learrr@@@@");
          console.log( this.tutorials_search);
        },
        error => {
          console.log(error);
        });
  }
  openTutorialsDetails(tutorial)
  {
    this.router.navigate(['/tutorials/' + tutorial.id ]);
  }

  setActiveTutoria(tutorial, index) {
    this.currentTutoria = tutorial;
    this.currentIndex = index;
  }
  // retrieveTutorials() {
  //   this.tutorialService.getAll()
  //     .subscribe(
  //       data => {
  //         this.tutorials = data;
  //         console.log(data);
  //       },
  //       error => {
  //         console.log(error);
  //       });
  // }
// --------------------------------------------------------
  // refreshList() {
  //   this.retrieveTutorials();
  //   this.currentTutorial = null;
  //   this.currentIndex = -1;
  // }

  // setActiveTutorial(tutorial, index) {
  //   this.currentTutorial = tutorial;
  //   this.currentIndex = index;
  // }



  // searchTitle() {
  //   this.tutorialService.findByTitle(this.title)
  //     .subscribe(
  //       data => {
  //         this.tutorials = data;
  //         console.log(data);
  //       },
  //       error => {
  //         console.log(error);
  //       });
  // }
  onChangedPage(pageData: PageEvent) {
    this.isLoading = true;
    this.currentPage = pageData.pageIndex + 1;
    this.tutorialsPerPage = pageData.pageSize;
    this.tutorialService.getTutorials(this.tutorialsPerPage, this.currentPage);
  }

  onDelete(tutorialId: string) {
    this.isLoading = true;
    this.tutorialService.deleteTutorial(tutorialId).subscribe(() => {
      this.tutorialService.getTutorials(this.tutorialsPerPage, this.currentPage);
    });
  }
  

 

  ngOnDestroy() {
    this.tutorialsSub.unsubscribe();
  }
  search() {
    this.tutorialService.findByParams(this.title, this.description, this.faculty)
      .subscribe(
        data => {
          this.tutorials_search = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }
}







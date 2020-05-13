import { Component, OnInit , OnDestroy} from '@angular/core';
import { TutorialService } from 'src/app/services/tutorial.service';

import { PageEvent } from "@angular/material";
import { Subscription } from "rxjs";

import { Tutorial } from 'src/app/models/tutorial.model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-tutorials-list',
  templateUrl: './tutorials-list.component.html',
  styleUrls: ['./tutorials-list.component.css']
})
export class TutorialsListComponent implements OnInit , OnDestroy{
  tutorials: Tutorial[] = [];
  isLoading = false;
  totalTutorials = 0;
  tutorialsPerPage = 9;
  currentPage = 1;
  private tutorialsSub: Subscription;

  constructor(private tutorialService: TutorialService,
              private router: Router) { }

  ngOnInit() {
    this.isLoading = true;
    this.tutorialService.getTutorials(this.tutorialsPerPage, this.currentPage);
    this.tutorialsSub = this.tutorialService
      .getTutorialUpdateListener()
      .subscribe((tutorialData: {tutorials: Tutorial[], tutorialCount: number}) => {
        this.isLoading = false;
        this.totalTutorials = tutorialData.tutorialCount;
        this.tutorials = tutorialData.tutorials;
        console.log("tutorialData.tutorials: ", tutorialData.tutorials)
      });
  }

  openTutorialsDetails(tutorial)
  {
    this.router.navigate(['/tutorials/' + tutorial.id ]);
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
}







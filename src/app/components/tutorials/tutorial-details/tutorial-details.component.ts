import { Component, OnInit } from '@angular/core';
import { TutorialService } from 'src/app/services/tutorial.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-tutorial-details',
  templateUrl: './tutorial-details.component.html',
  styleUrls: ['./tutorial-details.component.css']
})
export class TutorialDetailsComponent implements OnInit {
  currentTutorial = null;
  message = '';

  constructor(
    private tutorialService: TutorialService,
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
    this.tutorialService.updateTutorial(this.currentTutorial.id, this.currentTutorial.title,this.currentTutorial.description,this.currentTutorial.img, this.currentTutorial.link)
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

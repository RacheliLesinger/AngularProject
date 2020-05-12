import { Component, OnInit } from '@angular/core';
import { TutorialService } from 'src/app/services/tutorial.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  tutorials: any;
  currentTutorial = null;
  currentIndex = -1;
  title = '';

  constructor(private tutorialService: TutorialService) { }

  ngOnInit() {
    this.retrieveTutorials();

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

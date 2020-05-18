import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'Angular8ClientCrud';
  displaySigning:boolean;
  displayForLecturer:boolean;
  displayForStudent:boolean;

  constructor(router:Router){
    
    this.displaySigning =false;
    this.displayForLecturer=false;
    this.displayForStudent=false;
    router.navigate(['/Merge']);
  }
  componentAdded(component){
    this.displaySigning=component.displaySigning;
    this.displayForStudent=component.displayForStudent;
    this.displayForLecturer=component.displayForLecturer;
  }
  componentRemoved(component){

  }

}

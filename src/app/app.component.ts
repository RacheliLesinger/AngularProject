import { Component } from '@angular/core';



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

  constructor(){
    
    this.displaySigning =false;
    this.displayForLecturer=false;
    this.displayForStudent=false;

  }
  componentAdded(component){
    this.displaySigning=component.displaySigning;
    this.displayForStudent=component.displayForStudent;
    this.displayForLecturer=component.displayForLecturer;
  }
  componentRemoved(component){

  }

}

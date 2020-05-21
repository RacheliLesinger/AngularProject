import { Component, ViewChild, ElementRef } from '@angular/core';
import { WebSocketSubject } from 'rxjs/observable/dom/WebSocketSubject';
import { SharedService } from './services/shared-service';
import {MatSnackBar} from '@angular/material/snack-bar';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  public serverMessage:string;

  private socket$: WebSocketSubject<string>;
  title = 'Angular8ClientCrud';
  displaySigning:boolean;
  displayForLecturer:boolean;
  displayForStudent:boolean;


  constructor(private sharedService: SharedService,private _snackBar: MatSnackBar){
    
    
    this.displaySigning =false;
    this.displayForLecturer=false;
    this.displayForStudent=false;
    this.socket$ = new WebSocketSubject('ws://localhost:8080');
    this.socket$
    .subscribe(
    (message) => {this.serverMessage=message;
    
    },
    
    (err) => console.error(err),
    () => console.warn('Completed!')
    );
    sharedService.changeEmitted$.subscribe(
      text => {
          console.log("sharedService from app",text);
          this.send(text)

      });
  }

  
  openSnackBar() {
   
    this._snackBar.open(this.serverMessage, '', {
      duration: 3000,});

    this.serverMessage=null;

}
  


  componentAdded(component){
    this.displaySigning=component.displaySigning;
    this.displayForStudent=component.displayForStudent;
    this.displayForLecturer=component.displayForLecturer;
  }
  public send(text): void {
    const message = "The lecturer "+text+" add a new tutorial";

    this.serverMessage=message;
    this.socket$.next(message);
   
}
  componentRemoved(component){

  }

}

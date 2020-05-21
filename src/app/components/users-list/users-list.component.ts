import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { FacultyService } from 'src/app/services/faculty.service';


@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
  displayForLecturer=true
  displayForStudent=true
  displaySigning=false

  users: any;
  faculties: any;
  currentUser = null;
  currentIndex = -1;
  name = '';
  status = '';
  faculty: '';

  constructor(private userService: UserService,
    private facultyService: FacultyService,
    private router: Router) { }

  ngOnInit() {
    this.retrieveUsers();
    this.retrieveFaculties();
  }

openUserDetails(user)
{
  this.currentUser = user;
  this.router.navigate(['/users/' + this.currentUser.id ]);
  
}

  retrieveUsers() {
    this.userService.getAll()
      .subscribe(
        data => {
          this.users = data;
          console.log(data);
        },
        error => {
          console.log(error);
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

  refreshList() {
    this.retrieveUsers();
    this.currentUser = null;
    this.currentIndex = -1;
  }

  setActiveUser(user, index) {
    this.currentUser = user;
    this.currentIndex = index;
  }

  removeAllUsers() {
    this.userService.deleteAll()
      .subscribe(
        response => {
          console.log(response);
          this.retrieveUsers();
        },
        error => {
          console.log(error);
        });
  }

  searchName() {
    this.userService.findByUserName(this.name)
      .subscribe(
        data => {
          this.users = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  search() {
    this.userService.findByParams(this.status, this.name, this.faculty)
      .subscribe(
        data => {
          this.users = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }
}


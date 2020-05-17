import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { map } from "rxjs/operators";
import { Router } from "@angular/router";

import { Tutorial } from "src/app/models/tutorial.model";
import { User } from '../models/user.model';

const baseUrl = 'http://localhost:8080/api/tutorials';

@Injectable({ providedIn: "root" })
export class TutorialService {
  private tutorials: Tutorial[] = [];
  private tutorialsUpdated = new Subject<{ tutorials: Tutorial[]; tutorialCount: number }>();

  constructor(private http: HttpClient, private router: Router) {}

  getAll() {
    return this.http.get(baseUrl);
  }

  getTutorials(tutorialsPerPage: number, currentPage: number) {
    const queryParams = `?pagesize=${tutorialsPerPage}&page=${currentPage}`;
    this.http
      .get<{ message: string; tutorials: any; maxTutorials: number }>(
        baseUrl + queryParams
      )
      .pipe(
        map(tutorialData => {
          console.log("!!!tutorialData.tutorials   :" , tutorialData.tutorials)
          return {
            tutorials: tutorialData.tutorials.map(tutorial => {
              return {
               
                title: tutorial.title,
                descriptionent: tutorial.description,
                id: tutorial.id,
                name:tutorial.name,
                img: tutorial.img,
                link:tutorial.link
              };
            }),
            maxTutorials: tutorialData.maxTutorials
          };
        })
      )
      .subscribe(transformedTutorialData => {
        this.tutorials = transformedTutorialData.tutorials;
        this.tutorialsUpdated.next({
          tutorials: [...this.tutorials],
          tutorialCount: transformedTutorialData.maxTutorials
        });
      });
  }
  getTutorialUpdateListener() {
    return this.tutorialsUpdated.asObservable();
  }

  getTutorial(id: string) {
    return this.http.get<{
      _id: string;
      title: string;
      description: string;
      img: string;
      link: string;
      name: User;
    }>(baseUrl + "/" +id);
  }

  addTutorial(title: string, description: string, img: File, link: string ,name:string) {
    const tutorialData = new FormData();
    tutorialData.append("title", title);
    tutorialData.append("description", description);
    tutorialData.append("img", img, title);
    tutorialData.append("link", link);
    tutorialData.append("name", name);
    this.http
      .post<{ message: string; tutorial: Tutorial }>(
        baseUrl,
        tutorialData
      )
      .subscribe(responseData => {
        this.router.navigate(["/"]);
      });
  }

  updateTutorial(id: string, title: string, description: string, img: File | string, link: string) {
    let tutorialData: Tutorial | FormData;
    if (typeof img === "object") {
      tutorialData = new FormData();
      tutorialData.append("id", id);
      tutorialData.append("title", title);
      tutorialData.append("description", description);
      tutorialData.append("img", img, title);
      tutorialData.append("link", link);
    } else {
      tutorialData = {
        id: id,
        title: title,
        description: description,
        name: "",
        img: img,
        link:link
      };
    }
    this.http
      .put(baseUrl + id, tutorialData)
      .subscribe(response => {
        this.router.navigate(["/"]);
      });
  }

  deleteTutorial(tutorialId: string) {
    return this.http
      .delete(baseUrl + "/" +tutorialId);
  }

  findByTitle(title) {
        return this.http.get(`${baseUrl}?title=${title}`);
      }
  findByLecturer(name) {
        return this.http.get(`${baseUrl}?name=${name}`);
      }
}

















// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';

// const baseUrl = 'http://localhost:8080/api/tutorials';

// @Injectable({
//   providedIn: 'root'
// })
// export class TutorialService {

//   constructor(private http: HttpClient) { }

//   getAll() {
//     return this.http.get(baseUrl);
//   }

//   get(id) {
//     return this.http.get(`${baseUrl}/${id}`);
//   }

//   create(data) {
//     return this.http.post(baseUrl, data);
//   }

//   update(id, data) {
//     return this.http.put(`${baseUrl}/${id}`, data);
//   }

//   delete(id) {
//     return this.http.delete(`${baseUrl}/${id}`);
//   }

//   deleteAll() {
//     return this.http.delete(baseUrl);
//   }

//   findByTitle(title) {
//     return this.http.get(`${baseUrl}?title=${title}`);
//   }
// }

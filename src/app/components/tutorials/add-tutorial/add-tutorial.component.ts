import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { TutorialService } from 'src/app/services/tutorial.service';
import { Tutorial } from 'src/app/models/tutorial.model';
import { mimeType } from "./mime-type.validator";
import { AuthonticationService } from 'src/app/services/authontication.service';
import { User } from 'src/app/models/user.model';
import { FacultyService } from 'src/app/services/faculty.service';
import { Faculty } from 'src/app/models/faculty.model';


@Component({
  selector: 'app-add-tutorial',
  templateUrl: './add-tutorial.component.html',
  styleUrls: ['./add-tutorial.component.css']
})

export class AddTutorialComponent implements OnInit {

  displayForLecturer:boolean
  displayForStudent=true
  displaySigning=false

  tutorial: Tutorial;
  isLoading = false;
  form: FormGroup;
  imagePreview: string;
  private mode = "create";
  private tutorialId: string;
  currentUser :User=null;
  facultiesList:Faculty[] = [];
  

  constructor(
    public tutorialsService: TutorialService,
    public facultysService:FacultyService,
    public route: ActivatedRoute,
    private authonticationService: AuthonticationService
  ) {}

  ngOnInit() {
    this.facultysService.getAll().subscribe((facultiesData: []) => {
      this.facultiesList = facultiesData;
      console.log(this.facultiesList);
  });
    this.currentUser = this.authonticationService.currentUserValue;
    if(this.currentUser!=null){
    if(this.currentUser.status=="lecturer"){
      this.displayForLecturer=true
    }
    else{
      this.displayForLecturer=false
    }
  }
    this.form = new FormGroup({
      title: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)]
      }),
      description: new FormControl(null, { validators: [Validators.required] }),
      img: new FormControl(null, {
        validators: [Validators.required],
        asyncValidators: [mimeType]
      }),
      link:new FormControl(null, {
        validators: [ Validators.required]
      }),
      faculty:new FormControl(null, {
        validators: [ Validators.required]
      })
    });
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has("tutorialId")) {
        this.mode = "edit";
        this.tutorialId = paramMap.get("tutorialId");
        this.isLoading = true;
        this.tutorialsService.getTutorial(this.tutorialId).subscribe(tutorialData => {
          this.isLoading = false;
          this.tutorial = {
            id: tutorialData._id,
            title: tutorialData.title,
            description: tutorialData.description,
            name: this.currentUser.id,
            img: tutorialData.img,
            link:tutorialData.link,
            faculty:tutorialData.faculty.id
          };
          this.form.setValue({
            title: this.tutorial.title,
            description: this.tutorial.description,
            img: this.tutorial.img,
            link: this.tutorial.link,
            faculty:this.tutorial.faculty
          });
        });
      } else {
        this.mode = "create";
        this.tutorialId = null;
      }
    });
  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({ img: file });
    this.form.get("img").updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = typeof(reader.result)=='string'?reader.result:"";
    };
    reader.readAsDataURL(file);
  }

  onSaveTutorial() {
    if (this.form.invalid) {
      return;
    }
    this.isLoading = true;
    if (this.mode === "create") {
 
      console.log(this.currentUser)
      console.log(  this.form.value.faculty,)
      this.tutorialsService.addTutorial(
        this.form.value.title,
        this.form.value.faculty,
        this.form.value.description,
        this.form.value.img,
        this.form.value.link,
        this.currentUser.id

      );
    } else {
      this.tutorialsService.updateTutorial(
        this.tutorialId,
        this.form.value.title,
        this.form.value.faculty,
        this.form.value.description,
        this.form.value.img,
        this.form.value.link
      );
    }
    this.form.reset();
  }
}









// import { Component, OnInit } from '@angular/core';
// import { TutorialService } from 'src/app/services/tutorial.service';
// import { mimeType } from "./mime-type.validator";
// import { FormGroup} from "@angular/forms";

// @Component({
//   selector: 'app-add-tutorial',
//   templateUrl: './add-tutorial.component.html',
//   styleUrls: ['./add-tutorial.component.css']
// })
// export class AddTutorialComponent implements OnInit {

//   tutorial = {
//     title: '',
//     description: '',
//     img:'',
//     published: false
//   };
//   submitted = false;

//   constructor(private tutorialService: TutorialService) { }

//   onImagePicked(event: Event) {
//     const file = (event.target as HTMLInputElement).files[0];
//     this.form.patchValue({ image: file });
//     this.form.get("image").updateValueAndValidity();
//     const reader = new FileReader();
//     reader.onload = () => {
//       this.imagePreview = reader.result;
//     };
//     reader.readAsDataURL(file);
//   }

//   ngOnInit() {
//   }

//   saveTutorial() {
//     const data = {
//       title: this.tutorial.title,
//       description: this.tutorial.description,
//       img:this.tutorial.img
//     };

//     this.tutorialService.create(data)
//       .subscribe(
//         response => {
//           console.log(response);
//           this.submitted = true;
//         },
//         error => {
//           console.log(error);
//         });
//   }

//   newTutorial() {
//     this.submitted = false;
//     this.tutorial = {
//       title: '',
//       description: '',
//       img:'',
//       published: false
//     };
//   }

// }

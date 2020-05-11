import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from "@angular/forms";


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddTutorialComponent } from './components/tutorials/add-tutorial/add-tutorial.component';
import { TutorialDetailsComponent } from './components/tutorials/tutorial-details/tutorial-details.component';
import { TutorialsListComponent } from './components/tutorials/tutorials-list/tutorials-list.component';
import { HomeComponent } from './components/home/home.component';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { UsersListComponent } from './components/users-list/users-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { 
  MatInputModule, 
  MatButtonModule, 
  MatSelectModule, 
  MatIconModule , 
  MatListModule,
  MatProgressSpinnerModule, 
  MatCardModule,
  MatToolbarModule,
  MatExpansionModule,
  
  MatPaginatorModule} 
  from '@angular/material';


const appRoutes: Routes = [
  {path:'home',component:HomeComponent},
  {path:'signin',component:SigninComponent},
  {path:'signup',component:SignupComponent}
]


@NgModule({
  declarations: [
    AppComponent,
    AddTutorialComponent,
    TutorialDetailsComponent,
    TutorialsListComponent,
    HomeComponent,
    SigninComponent,
    SignupComponent,
    UsersListComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatInputModule, 
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatListModule,
    MatCardModule,
    MatToolbarModule,
    MatExpansionModule,
    ReactiveFormsModule,
    MatPaginatorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

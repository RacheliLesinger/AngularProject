import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TutorialsListComponent } from './components/tutorials/tutorials-list/tutorials-list.component';
import { TutorialDetailsComponent } from './components/tutorials/tutorial-details/tutorial-details.component';
import { AddTutorialComponent } from './components/tutorials/add-tutorial/add-tutorial.component';
import { UsersListComponent } from './components/users-list/users-list.component';


const routes: Routes = [
  { path: '', redirectTo: 'tutorials', pathMatch: 'full' },
  { path: 'tutorials', component: TutorialsListComponent },
  { path: 'tutorials/:id', component: TutorialDetailsComponent },
  { path: 'users', component: UsersListComponent },
  { path: 'add', component: AddTutorialComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

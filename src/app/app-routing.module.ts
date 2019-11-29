import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListTaskComponent } from './pages/list-task/list-task.component';
import { ListUserComponent } from './pages/list-user/list-user.component';
import { UserComponent } from './pages/user/user.component';


//define routes for angular navigation
const routes: Routes = [
  {path: '', component: ListTaskComponent},
  {path: 'users/:page', component: ListUserComponent},
  {path: 'add-task/:id', component: UserComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

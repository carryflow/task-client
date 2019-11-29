import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

//my imports
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListTaskComponent } from './pages/list-task/list-task.component';
import { ListUserComponent } from './pages/list-user/list-user.component';
import { UserComponent } from './pages/user/user.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



@NgModule({
  declarations: [
    AppComponent,
    ListTaskComponent,
    ListUserComponent,
    UserComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    DragDropModule,
    FormsModule, ReactiveFormsModule, BrowserAnimationsModule,
    MatAutocompleteModule, MatInputModule, MatFormFieldModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

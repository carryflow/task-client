import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Task } from './models/task';
import { Observable, of } from 'rxjs';
import { StateService } from './services/state.service';
import { map, flatMap } from 'rxjs/operators';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'task-client';
  public myControl = new FormControl();
  states: string[] = ['One', 'Two', 'Three'];
  public tasks: Task[] = [];
  public filteredOptions: Observable<Task[]>;

  constructor(private _stateService: StateService) {


  }

  ngOnInit() {
    //Get tasks assigned to a user in the database
    this._stateService.getStates().subscribe(
      response => {
        response.states.forEach(state => {
          state.tasks.forEach(task => {
            this.tasks.push(task);
          });
        });
      }
    );

    //filter tasks to assign to a user
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        map(value => typeof value === 'string' ? value : value.nombre),
        flatMap(value => value ? this._filter(value) : [])
      );
  }

  //function to filter tasks by name, and load in autocomplete
  private _filter(value: string): Observable<Task[]> {
    const filterValue = value.toLowerCase();

    return of(this.tasks.filter(option => option.name.toLowerCase().includes(filterValue)));
  }

  //function to show the task in autocomplete
  mostrarNombre(task?: any): string | undefined {
    return task ? task.name : undefined;
  }

  //function to select an autocomplete task and add the task to the user
  selectTask(event: MatAutocompleteSelectedEvent) {
    let task = event.option.value as Task;
    console.log(task);

    Swal.fire({
      icon: 'info',
      html:
        '<ul class="list-group">' +
        '<li class="list-group-item active">' +
        `Data of the selected task.` +
        '</li>' +
        '<li class="list-group-item">' +
        `Id task: <strong>${task._id}</strong> ` +
        '</li>' +
        '<li class="list-group-item">' +
        `Name task: <strong>${task.name}</strong> ` +
        '</li>' +
        '<li class="list-group-item">' +
        `Creation date: <strong>${task.date}</strong> ` +
        '</li>' +
        '</ul> ',
      showCloseButton: true,
      showCancelButton: false,
      focusConfirm: false,
      confirmButtonText:
        '<i class="fa fa-thumbs-up"></i> Ok!',

    })

    this.myControl.setValue('');
    event.option.focus();
    event.option.deselect();

  }


}

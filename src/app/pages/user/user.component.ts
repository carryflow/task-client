import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { map, startWith, flatMap } from 'rxjs/operators';
import { User } from '../../models/user';
import { StateService } from '../../services/state.service';
import { Task } from 'src/app/models/task';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { element } from 'protractor';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  public user: User;
  public myControl = new FormControl();
  states: string[] = ['One', 'Two', 'Three'];
  public tasks: Task[] = [];
  public filteredOptions: Observable<Task[]>;

  constructor(private _stateService: StateService, private _userService: UserService, private _route: ActivatedRoute, private _router: Router) {
    this.user = new User('', '', '', '', []);

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

    // Get user by your database ID
    this._route.params.subscribe(params => {
      let id = params.id;
      this._userService.getUser(id).subscribe(
        response => {
          this.user = response.user;
        }
      )
    });

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

    if (this.taskExist(task._id)) {
      Swal.fire({
        icon: 'info',
        title: 'The task has already been assigned to this user.',
        showConfirmButton: false,
        timer: 1500
      })
    } else {
      this.user.tasks.push(task);
    }

    this.myControl.setValue('');
    event.option.focus();
    event.option.deselect();

    //assign task to user
    this._userService.saveTaskInUser(this.user).subscribe();

  }

  //verify that the task does not exist in the database so as not to repeat
  taskExist(id): boolean {
    let exist = false;
    this.user.tasks.forEach((item) => {
      if (id === item._id) {
        exist = true;
      }
    });
    return exist;
  }

  //function to remove a user from a task
  deleteTaskUser(task) {
    this.user.tasks = this.user.tasks.filter((item: Task) => task._id !== item._id);
    this._userService.saveTaskInUser(this.user).subscribe();

  }
}

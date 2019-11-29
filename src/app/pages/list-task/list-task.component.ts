import { Component, OnInit, DoCheck } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Task } from '../../models/task';
import { TaskService } from '../../services/task.service';
import { State } from '../../models/state';
import { StateService } from '../../services/state.service';
import { element } from 'protractor';
import * as jQuery from 'jquery';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-task',
  templateUrl: './list-task.component.html',
  styleUrls: ['./list-task.component.css']
})
export class ListTaskComponent implements OnInit {


  public tasks: Task[];
  public task: Task;
  public status: string;
  public states: State[];



  constructor(private _taskService: TaskService, private _stateService: StateService) {
    this.task = new Task('', '', '');
  }

  ngOnInit() {

    //load all states with your tasks
    this.getStates();

  }

  //function that allows you to drag and drop tasks in different states open, in-progress, completed, archived
  drop(event: CdkDragDrop<State[]>) {
    if (event.previousContainer === event.container) {

      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      this._stateService.updateStates(this.states).subscribe();

    } else {

      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
      this._stateService.updateStates(this.states).subscribe();

    }

  }

  //function to load the states with your tasks
  getStates() {
    this._stateService.getStates().subscribe(
      response => {
        this.states = response.states as State[];
        console.log(this.states);
      }
    );
  }

  //function to show  form buttons to add a new task
  newState(state) {

    if (state == 'open') {
      var element_form = document.getElementById("openForm");
      var element_button = document.getElementById("open");

      element_button.classList.add('hidden-form')

      if (state != 'open') {
        element_form.classList.add('hidden-form')
      } else {
        element_form.classList.remove('hidden-form')
      }
      jQuery("#scrollopen").animate({ scrollTop: jQuery('#scrollopen')[0].scrollHeight }, 1000);
    }

    if (state === 'in-progress') {
      var element_form = document.getElementById("in-progressForm");
      var element_button = document.getElementById("in-progress");
      console.log(element_form);

      element_button.classList.add('hidden-form')

      if (state != 'in-progress') {
        element_form.classList.add('hidden-form')
      } else {
        element_form.classList.remove('hidden-form')
      }
      jQuery("#scrollin-progress").animate({ scrollTop: jQuery('#scrollin-progress')[0].scrollHeight }, 1000);
    }

    if (state === 'completed') {
      var element_form = document.getElementById("completedForm");
      var element_button = document.getElementById("completed");
      console.log(element_form);

      element_button.classList.add('hidden-form')

      if (state != 'completed') {
        element_form.classList.add('hidden-form')
      } else {
        element_form.classList.remove('hidden-form')
      }
      jQuery("#scrollcompleted").animate({ scrollTop: jQuery('#scrollcompleted')[0].scrollHeight }, 1000);
    }

    if (state === 'archived') {
      var element_form = document.getElementById("archivedForm");
      var element_button = document.getElementById("archived");
      console.log(element_form);

      element_button.classList.add('hidden-form')

      if (state != 'archived') {
        element_form.classList.add('hidden-form')
      } else {
        element_form.classList.remove('hidden-form')
      }
      jQuery("#scrollarchived").animate({ scrollTop: jQuery('#scrollarchived')[0].scrollHeight }, 1000);
    }

  }

  //function to  hide form buttons to add a new task
  cancelState(state) {
    if (state == 'open') {
      var element_form = document.getElementById("openForm");
      var element_button = document.getElementById("open");
      //console.log(element_form);
      element_form.classList.add('hidden-form')
      element_button.classList.remove('hidden-form')

    }
    if (state === 'in-progress') {
      var element_form = document.getElementById("in-progressForm");
      var element_button = document.getElementById("in-progress");
      console.log(element_form);
      element_form.classList.add('hidden-form')
      element_button.classList.remove('hidden-form')
    }
    if (state === 'completed') {
      var element_form = document.getElementById("completedForm");
      var element_button = document.getElementById("completed");
      console.log(element_form);
      element_form.classList.add('hidden-form')
      element_button.classList.remove('hidden-form')

    }
    if (state === 'archived') {
      var element_form = document.getElementById("archivedForm");
      var element_button = document.getElementById("archived");
      console.log(element_form);
      element_form.classList.add('hidden-form')
      element_button.classList.remove('hidden-form')
    }
  }

  //function to save a new task in the database
  saveTask(form, state) {
    if (this.task.name === '') {
      Swal.fire('Error', 'No puede guardar una tarea vacia', 'error');
    } else {
      this._stateService.saveStateTask(state, this.task).subscribe(
        response => {
          this.getStates();
          form.reset();
          if (state == 'open') {
            jQuery("#scrollopen").animate({ scrollTop: jQuery('#scrollopen')[0].scrollHeight }, 1000);
          }
          if (state == 'in-progress') {
            jQuery("#scrollin-progress").animate({ scrollTop: jQuery('#scrollin-progress')[0].scrollHeight }, 1000);
          }
          if (state == 'completed') {
            jQuery("#scrollcompleted").animate({ scrollTop: jQuery('#scrollcompleted')[0].scrollHeight }, 1000);
          }
          if (state == 'archived') {
            jQuery("#scrollarchived").animate({ scrollTop: jQuery('#scrollarchived')[0].scrollHeight }, 1000);
          }
        },
        err => {
          Swal.fire('Error', err, 'error');
        }
      );
    }

  }

  editTask(state, task) {
    if (state.name == 'open') {
      var element_text = document.getElementById("text" + state.name + task._id);
      var element_input = document.getElementById("input" + state.name + task._id);
      var button_edit = document.getElementById("buttonedit" + state.name + task._id);
      var button_sub = document.getElementById("buttonsub" + state.name + task._id);
      var button_can = document.getElementById("buttoncancel" + state.name + task._id);

      element_text.classList.add('hidden-form')
      element_input.classList.remove('hidden-form')
      button_edit.classList.add('hidden-form')
      button_sub.classList.remove('hidden-form')
      button_can.classList.remove('hidden-form')
    }

    if (state.name == 'in-progress') {
      var element_text = document.getElementById("text" + state.name + task._id);
      var element_input = document.getElementById("input" + state.name + task._id);
      var button_edit = document.getElementById("buttonedit" + state.name + task._id);
      var button_sub = document.getElementById("buttonsub" + state.name + task._id);
      var button_can = document.getElementById("buttoncancel" + state.name + task._id);

      element_text.classList.add('hidden-form')
      element_input.classList.remove('hidden-form')
      button_edit.classList.add('hidden-form')
      button_sub.classList.remove('hidden-form')
      button_can.classList.remove('hidden-form')
    }
    if (state.name == 'completed') {
      var element_text = document.getElementById("text" + state.name + task._id);
      var element_input = document.getElementById("input" + state.name + task._id);
      var button_edit = document.getElementById("buttonedit" + state.name + task._id);
      var button_sub = document.getElementById("buttonsub" + state.name + task._id);
      var button_can = document.getElementById("buttoncancel" + state.name + task._id);

      element_text.classList.add('hidden-form')
      element_input.classList.remove('hidden-form')
      button_edit.classList.add('hidden-form')
      button_sub.classList.remove('hidden-form')
      button_can.classList.remove('hidden-form')
    }
    if (state.name == 'archived') {
      var element_text = document.getElementById("text" + state.name + task._id);
      var element_input = document.getElementById("input" + state.name + task._id);
      var button_edit = document.getElementById("buttonedit" + state.name + task._id);
      var button_sub = document.getElementById("buttonsub" + state.name + task._id);
      var button_can = document.getElementById("buttoncancel" + state.name + task._id);

      element_text.classList.add('hidden-form')
      element_input.classList.remove('hidden-form')
      button_edit.classList.add('hidden-form')
      button_sub.classList.remove('hidden-form')
      button_can.classList.remove('hidden-form')
    }
  }
 
  // function to edit the name of a task in the database
  updateTask(state, task) {
    if (state.name == 'open') {
      var element_text = document.getElementById("text" + state.name + task._id);
      var element_input = document.getElementById("input" + state.name + task._id);
      var button_edit = document.getElementById("buttonedit" + state.name + task._id);
      var button_sub = document.getElementById("buttonsub" + state.name + task._id);
      var button_can = document.getElementById("buttoncancel" + state.name + task._id);

      element_text.classList.remove('hidden-form')
      element_input.classList.add('hidden-form')
      button_edit.classList.remove('hidden-form')
      button_sub.classList.add('hidden-form')
      button_can.classList.add('hidden-form')
    }
    if (state.name == 'in-progress') {
      var element_text = document.getElementById("text" + state.name + task._id);
      var element_input = document.getElementById("input" + state.name + task._id);
      var button_edit = document.getElementById("buttonedit" + state.name + task._id);
      var button_sub = document.getElementById("buttonsub" + state.name + task._id);
      var button_can = document.getElementById("buttoncancel" + state.name + task._id);

      element_text.classList.remove('hidden-form')
      element_input.classList.add('hidden-form')
      button_edit.classList.remove('hidden-form')
      button_sub.classList.add('hidden-form')
      button_can.classList.add('hidden-form')
    }
    if (state.name == 'completed') {
      var element_text = document.getElementById("text" + state.name + task._id);
      var element_input = document.getElementById("input" + state.name + task._id);
      var button_edit = document.getElementById("buttonedit" + state.name + task._id);
      var button_sub = document.getElementById("buttonsub" + state.name + task._id);
      var button_can = document.getElementById("buttoncancel" + state.name + task._id);

      element_text.classList.remove('hidden-form')
      element_input.classList.add('hidden-form')
      button_edit.classList.remove('hidden-form')
      button_sub.classList.add('hidden-form')
      button_can.classList.add('hidden-form')
    }
    if (state.name == 'archived') {
      var element_text = document.getElementById("text" + state.name + task._id);
      var element_input = document.getElementById("input" + state.name + task._id);
      var button_edit = document.getElementById("buttonedit" + state.name + task._id);
      var button_sub = document.getElementById("buttonsub" + state.name + task._id);
      var button_can = document.getElementById("buttoncancel" + state.name + task._id);

      element_text.classList.remove('hidden-form')
      element_input.classList.add('hidden-form')
      button_edit.classList.remove('hidden-form')
      button_sub.classList.add('hidden-form')
      button_can.classList.add('hidden-form')
    }

    this._stateService.updateStates(this.states).subscribe();
  }

  //function to cancel the update of the name of a task
  cancelUpdateTask(state, task) {
    if (state.name == 'open') {
      var element_text = document.getElementById("text" + state.name + task._id);
      var element_input = document.getElementById("input" + state.name + task._id);
      var button_edit = document.getElementById("buttonedit" + state.name + task._id);
      var button_sub = document.getElementById("buttonsub" + state.name + task._id);
      var button_can = document.getElementById("buttoncancel" + state.name + task._id);

      element_text.classList.remove('hidden-form')
      element_input.classList.add('hidden-form')
      button_edit.classList.remove('hidden-form')
      button_sub.classList.add('hidden-form')
      button_can.classList.add('hidden-form')
    }
    if (state.name == 'in-progress') {
      var element_text = document.getElementById("text" + state.name + task._id);
      var element_input = document.getElementById("input" + state.name + task._id);
      var button_edit = document.getElementById("buttonedit" + state.name + task._id);
      var button_sub = document.getElementById("buttonsub" + state.name + task._id);
      var button_can = document.getElementById("buttoncancel" + state.name + task._id);

      element_text.classList.remove('hidden-form')
      element_input.classList.add('hidden-form')
      button_edit.classList.remove('hidden-form')
      button_sub.classList.add('hidden-form')
      button_can.classList.add('hidden-form')
    }
    if (state.name == 'completed') {
      var element_text = document.getElementById("text" + state.name + task._id);
      var element_input = document.getElementById("input" + state.name + task._id);
      var button_edit = document.getElementById("buttonedit" + state.name + task._id);
      var button_sub = document.getElementById("buttonsub" + state.name + task._id);
      var button_can = document.getElementById("buttoncancel" + state.name + task._id);

      element_text.classList.remove('hidden-form')
      element_input.classList.add('hidden-form')
      button_edit.classList.remove('hidden-form')
      button_sub.classList.add('hidden-form')
      button_can.classList.add('hidden-form')
    }
    if (state.name == 'archived') {
      var element_text = document.getElementById("text" + state.name + task._id);
      var element_input = document.getElementById("input" + state.name + task._id);
      var button_edit = document.getElementById("buttonedit" + state.name + task._id);
      var button_sub = document.getElementById("buttonsub" + state.name + task._id);
      var button_can = document.getElementById("buttoncancel" + state.name + task._id);

      element_text.classList.remove('hidden-form')
      element_input.classList.add('hidden-form')
      button_edit.classList.remove('hidden-form')
      button_sub.classList.add('hidden-form')
      button_can.classList.add('hidden-form')
    }
    this.getStates();
    console.log(this.states);
  }


}

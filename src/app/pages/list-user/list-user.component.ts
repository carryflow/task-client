import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit {

  public users:User[];

  public page;
  public next_page;
  public prev_page;
  public status: string;
  public total;
  public pages;

  constructor(private _userService:UserService, private _route: ActivatedRoute, private _router: Router) { }

  ngOnInit() {
    //load current user page
    this.actualPage();
  }

  //function to get the current page of the user list
  actualPage() {
    this._route.params.subscribe(params => {
      let page = +params['page'];
      this.page = page;

      if (!params['page']) {
        page = 1;
      }

      if (!page) {
        page = 1;
      } else {
        this.next_page = page + 1;
        this.prev_page = page - 1;
        if (this.prev_page <= 0) {
          this.prev_page = 1;
        }
      }

      // return user list
      this.getUsers(page);

    });
  }

  //function to get all users of the database
  getUsers(page) {
    this._userService.getUsers(page).subscribe(
      response => {
        console.log(response);
        if (!response.users) {
          this.status = 'error';
        } else {
          this.total = response.total;
          this.users = response.users;
          this.pages = response.pages;

          if (page > this.pages) {
            this._router.navigate(['/users', 1]);
          }
        }
      },
      error => {
        var errorMessage = <any>error;
        console.log(errorMessage);

        if (errorMessage != null) {
          this.status = 'error';
        }
      }
    );
  }


}

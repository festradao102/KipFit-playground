import { Component, OnInit } from '@angular/core';
import {FitUserService} from "../../../../../services/fit-user.service";

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss']
})
export class NewUserComponent implements OnInit {

  fitUser = {
    legalId:'',
    bday:'',
    phone:'',
    emergencyPhone:'',
    user : {
      login:'',
      firstName:'',
      lastName:'',
      email:'',
      imageUrl:'',
      activated:'',
      langKey:'en',
      createdBy:'system',
      password:'star4070*13212321',
      createdDate:'',
      lastModifiedBy:'',
      lastModifiedDate:null,
      authorities:null
    },
    'schedules': [ ],
    'role' : {
      'id' : 1,
      'roleId' : 96382,
      'roleName' : '',
      'fitUsers' : null
    }
  };

  constructor(private fitUserService: FitUserService) { }

  ngOnInit(): void {
  }

  saveUser(): void {
    console.log('saveUser');
    this.fitUser.user.login = this.fitUser.user.email;
    let bday = new Date(this.fitUser.bday);
    this.fitUser.bday = bday.toISOString();

    this.fitUserService.create(this.fitUser)
        .subscribe(
            response => {
              console.log(response);
            },
            error => {
              console.log(error);
            });
  }
}

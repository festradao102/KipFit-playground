import { Component, OnInit } from '@angular/core';
import {FitUserService} from "../../../../../services/fit-user.service";
import Swal from "sweetalert2";
import {ActivatedRoute, Params, Router} from "@angular/router";

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss']
})
export class NewUserComponent implements OnInit {

  isUpdate = true;
  id: string;
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
      activated:true,
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

  constructor(private fitUserService: FitUserService,
              private activeRoute: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.activeRoute.params.subscribe((params: Params) => this.id = params.id );
    if (this.id === '-1') {
      this.isUpdate = false;
    }else{
      this.getUser();
    }
  }

  saveOrUpdate(){
    if(this.isUpdate){
      this.updateUser();
    }else{
      this.saveUser();
    }
  }

  saveUser(): void {
    console.log('saveUser');
    this.fitUser.user.login = this.fitUser.user.email;
    let bday = new Date(this.fitUser.bday);
    this.fitUser.bday = bday.toISOString();

    this.fitUserService.create(this.fitUser)
        .subscribe(
            response => {
              Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Usuario registrado satisfactoriamente',
                showConfirmButton: false,
                timer: 1500
              })
              console.log(response);
            },
            error => {
              console.log(error);
              Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: 'Code:' + error.status + '| Detail:' + error.message,
                showConfirmButton: false,
                timer: 1500
              })
            });
  }

  deleteUser(): void {

    this.fitUserService.delete(this.id)
        .subscribe(
            response => {
              Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Usuario eliminado satisfactoriamente',
                showConfirmButton: false,
                timer: 1500
              })
              console.log(response);
              this.navigateToList();
            },
            error => {
              console.log(error);
              Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: 'Code:' + error.status + '| Detail:' + error.message,
                showConfirmButton: false,
                timer: 1500
              })
            });
  }

  showDeleteConfirmation() : void {
    // @ts-ignore
    Swal.fire({
      title: '¿Desea eliminar el usuario?',
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      denyButtonText:'',
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteUser();
      }
    })
  }

  updateUser(): void {
    console.log('update');
    this.fitUser.user.login = this.fitUser.user.email;
    let bday = new Date(this.fitUser.bday);
    this.fitUser.bday = bday.toISOString();

    this.fitUserService.update(this.fitUser)
        .subscribe(
            response => {
              Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Usuario actualizado satisfactoriamente',
                showConfirmButton: false,
                timer: 1500
              })
              console.log(response);
            },
            error => {
              console.log(error);
              Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: 'Code:' + error.status + '| Detail:' + error.message,
                showConfirmButton: false,
                timer: 1500
              })
            });
  }

  getUser(): void {
    this.fitUserService.get(this.id)
        .subscribe(
            response => {
              console.log(response);
              this.fitUser = response;
              let date = this.changeDateFormat(this.fitUser.bday.toString())
              this.fitUser.bday = date;
            },
            error => {
              console.log(error);
              Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: 'Code:' + error.status + '| Detail:' + error.message,
                showConfirmButton: false,
                timer: 1500
              })
            });
  }

  changeDateFormat(pDate): string{
    let year = pDate.slice(0,4);
    let month = pDate.slice(5,7);
    let day = pDate.slice(8,10);
    return (year + '-' + month + '-' + day);
  }

  navigateToList(): void {
    this.router.navigate(['/users/list-user']);
  }
}

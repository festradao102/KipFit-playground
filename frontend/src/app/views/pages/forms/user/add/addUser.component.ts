import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {RoleService} from '../../../../../services/role.service';
import {FitUserService} from '../../../../../services/fit-user.service';


@Component({
  selector: 'app-add-user',
  templateUrl: './addUser.component.html',
  styleUrls: ['./addUser.component.scss']
})
export class AddUserComponent implements OnInit {
  isUpdate = true;
  id: string;
  roles: any;
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
    schedules: [ ],
    role :  {
      id : 1,
      roleId : 44429,
      roleName : '',
    },
  };

  constructor(private fitUserService: FitUserService,
              private roleService: RoleService,
              private activeRoute: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.activeRoute.params.subscribe((params: Params) => this.id = params.id );
    this.getRoles();
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
    const bday = new Date(this.fitUser.bday);
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
    const bday = new Date(this.fitUser.bday);
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
              const date = this.changeDateFormat(this.fitUser.bday.toString())
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
    const year = pDate.slice(0,4);
    const month = pDate.slice(5,7);
    const day = pDate.slice(8,10);
    return (year + '-' + month + '-' + day);
  }

  navigateToList(): void {
    this.router.navigate(['/user/userDataTable']);
  }

  getRoles(): void {
    this.roleService.getAll()
        .subscribe(
            response => {
              console.log(response);
              this.roles = response;
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

  onRoleSelected(pRoleId) : void {
    console.log('the selected value is ' + pRoleId);
    for (let _i = 0; _i < this.roles.length; _i++) {
      console.log('role ' + this.roles[_i].roleId.toString());
      if (this.roles[_i].roleId.toString() === pRoleId) {
        this.fitUser.role = this.roles[_i];
        console.log(this.fitUser.role.id);
      }
    }
  }
}

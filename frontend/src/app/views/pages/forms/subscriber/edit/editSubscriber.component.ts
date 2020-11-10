import {Component, OnInit, ViewChild} from '@angular/core';

import {DataTable} from 'simple-datatables';
import {ActivatedRoute, Router} from '@angular/router';

import {SubscriberService} from '../../../../../services/subscriber.service';
import {CropperComponent} from "angular-cropperjs";
import {UserService} from "../../../../../services/user.service";
import {FitUserService} from "../../../../../services/fit-user.service";
import {formatDate} from "@angular/common";
import Swal from "sweetalert2";


@Component({
  selector: 'app-edit-subscriber-component',
  templateUrl: './editSubscriber.component.html',
  styleUrls: ['./editSubscriber.component.scss']
})

export class EditSubscriberComponent implements OnInit {
  measurements: any;

    currentFitSubscriber = null;
  measurementsDataTable: any;
    tiemposDePago = [
        "Mensual", "Semanal","Quincenal"
    ];
    imageUrl: any = 'assets/images/placeholder.jpg';
    resultImage: any;
    // Plugin configuration
    config = {
        zoomable: true
    };
    @ViewChild('angularCropper') public angularCropper: CropperComponent;

  constructor(private router: Router,
              private subscriberService: SubscriberService, private userService: UserService, private fitUserService: FitUserService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    //this.measurementsDataTable = new DataTable('#measurementsDataTable');
    this.retrieveSubById(this.route.snapshot.paramMap.get('id'));

  }

  retrieveSubById(id): void {
    this.fitUserService.get(id)
        .subscribe(
            data => {
              console.log(data);
              this.currentFitSubscriber = data;
              this.currentFitSubscriber.bday = formatDate(data.bday, 'yyyy-MM-dd', 'en');
              // const dataTableRows = [];
              // for (const singleMeasurement of data.measurements) {
              //   dataTableRows.push([
              //     singleMeasurement.weight.toString(),
              //     singleMeasurement.dateCreated,
              //     `<a href="/measurements/${singleMeasurement.id}">Ver Detalles</a>`
              //   ]);
              // }
              // console.log(dataTableRows);

              // this.measurementsDataTable.rows().add(dataTableRows);
            },
            error => {
              console.log(error);
            });
  }

    updateSubscriber() {


        this.currentFitSubscriber.bday = new Date(this.currentFitSubscriber.bday);
        this.fitUserService.updateOnly(this.currentFitSubscriber.id, this.currentFitSubscriber).subscribe(
            updatedFituser => {

                this.subscriberService.updateOnly(this.currentFitSubscriber.subscriber.id, this.currentFitSubscriber.subscriber).subscribe(
                    updatedSubscriber => {
                        console.log(updatedSubscriber);
                        this.currentFitSubscriber.user.authorities = ["ROLE_USER"];
                        this.userService.updateOnly(this.currentFitSubscriber.user.id, this.currentFitSubscriber.user).subscribe(
                            updatedUser => {
                                console.log(updatedUser);

                                Swal.fire(
                                    {
                                        position: 'center',
                                        showConfirmButton: false,
                                        timer: 1500,
                                        icon: "success",
                                        title: "Suscriptor Actualizado."
                                    }
                                ).then(result => {
                                    this.retrieveSubById(this.route.snapshot.paramMap.get('id'));
                                })


                            },
                            error => {
                                console.log(error);
                            }
                        );

                    },
                    error => {
                        console.log(error);
                    }
                );


            },
            error => {
                console.log(error);
            }
        );




    }

    deleteSubscriber(fitUser) {
        Swal.fire(
            {
                showCancelButton: true,
                confirmButtonText: 'Eliminar',
                cancelButtonText: 'Cancelar',
                icon: "warning",
                title: "¿Desea eliminar suscriptor?"
            }
        ).then(result => {

            this.fitUserService.delete(fitUser.id).subscribe(
                response => {
                    if (result.isConfirmed) {
                        this.userService.delete(fitUser.user.id).subscribe(
                            response2 => {
                                this.subscriberService.delete(fitUser.subscriber.id).subscribe(
                                    response3 => {
                                        Swal.fire(
                                            'Eliminado!',
                                            'Se elimino el suscriptor.',
                                            'info'
                                        ).then(result => {
                                            this.router.navigateByUrl("subscriberTable");
                                        })

                                    }
                                )
                            }
                        )
                    }
                },
                error => {

                }
            )





        })

    }





    //imagen
    openFileBrowser(event: any) {
        event.preventDefault();
        let element: HTMLElement = document.querySelector("#cropperImageUpload") as HTMLElement;
        element.click()

    }

    handleFileInput(event: any) {
        if (event.target.files.length) {
            let element: HTMLElement = document.querySelector("#cropperImageUpload + .input-group .file-upload-info") as HTMLElement;
            let fileName = event.target.files[0].name;
            element.setAttribute( 'value', fileName)
            var fileTypes = ['jpg', 'jpeg', 'png'];  //acceptable file types
            var extension = event.target.files[0].name.split('.').pop().toLowerCase(),  //file extension from input file
                isSuccess = fileTypes.indexOf(extension) > -1;  //is extension in acceptable types
            if (isSuccess) { //yes
                // start file reader
                const reader = new FileReader();
                const angularCropper = this.angularCropper;
                reader.onload = (event) => {
                    if(event.target.result) {
                        angularCropper.imageUrl = event.target.result;
                    }
                };
                reader.readAsDataURL(event.target.files[0]);
            } else { //no
                alert('Selected file is not an image. Please select an image file.')
            }
        }
    }

    cropImage() {
        this.resultImage = this.angularCropper.cropper.getCroppedCanvas().toDataURL();
        let dwn: HTMLElement = document.querySelector('.download') as HTMLElement;
        dwn.setAttribute('href', this.resultImage);


    }

}

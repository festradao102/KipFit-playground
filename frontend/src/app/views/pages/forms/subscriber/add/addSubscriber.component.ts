import {Component, OnInit, ViewChild} from '@angular/core';

import {any} from "codelyzer/util/function";
import {ActivatedRoute, Router} from '@angular/router';
import {formatDate} from "@angular/common";
import {SubscriberService} from "../../../../../services/subscriber.service";
import {UserService} from "../../../../../services/user.service";
import {FitUserService} from "../../../../../services/fit-user.service";
// import {ImageCropperComponent} from "../../../../../views/pages/advanced-ui/image-cropper/cropper.component";
import {CropperComponent} from "angular-cropperjs";

import {ImageUploadComponent} from "../../../ui-components/image-upload-component/image-upload-component.component";
import Swal from "sweetalert2";

@Component({
  selector: 'app-addSubscriber',
  templateUrl: './addSubscriber.component.html',
  styleUrls: ['./addSubscriber.component.scss']
})


export class AddSubscriberComponent implements OnInit {
  Cloudinary
  subscriber = {
    initialDate: Date,
    medicalConditions: '',
    paymentFreq: '',
    subscriptionPayment: any,
    measurements: any,
    plans: any,
    guidedTrainings: any
  };

  user = {
    login: '',
    password: '',
    firstName: '',
    lastName: '',
    email: '',
    imageUrl: '',
    activated: true,
    langKey: 'en',
    createdDate: '',
    lastModifiedBy: '',
    lastModifiedDate: '',
    authorities: any
  };

  fitUser = {
    legalId: '',
    bday: formatDate(new Date(), 'yyyy-MM-dd', 'en'),
    phone: '',
    emergencyPhone: '',
    user: any,
    subscriber: any,
    schedules: any,
    role: any
  };

  tiemposDePago = [
      "Mensual", "Semanal","Quincenal"
  ];
  @ViewChild('angularCropper') public angularCropper: CropperComponent;
  @ViewChild('imageUploadComponent') public imageUploadComponent: ImageUploadComponent;
  // @ViewChild('swal') public swal: SweetAlert2Module;



  imageUrl: any = 'assets/images/placeholder.jpg';
  resultImage: any;

  // Plugin configuration
  config = {
    zoomable: true
  };
  constructor(private router: Router,private subscriberService: SubscriberService, private userService: UserService, private fitUserService: FitUserService) { }

  ngOnInit(): void {



  }



  saveSubscriber(): void {

    const dataSuscriber = {
      medicalConditions: this.subscriber.medicalConditions,
      paymentFreq: this.subscriber.paymentFreq,
      initialDate: new Date(),
      subscriptionPayment: any,
      measurements: any,
      plans: any,
      guidedTrainings: any,
      fitUser: any
    };
    const dataUser = {
      login: this.user.email,
      password: '123',
      firstName: this.user.firstName,
      lastName: this.user.lastName,
      email: this.user.email,
      imageUrl: this.resultImage,
      activated: true,
      langKey: 'en',
      createdDate: new Date(),
      lastModifiedBy: 'system',
      lastModifiedDate: new Date(),
      authorities: any
    };
    const dataFitUser = {
      legalId: this.fitUser.legalId,
      bday: new Date(this.fitUser.bday),
      phone: this.fitUser.phone,
      emergencyPhone: this.fitUser.emergencyPhone,
      user: any,
      subscriber: any,
      schedules: any,
      role: any
    };


      this.subscriberService.create(dataSuscriber)
          .subscribe(
              subscriberNuevo => {
                console.log(subscriberNuevo);
                this.userService.create(dataUser)
                    .subscribe(
                        userNuevo => {
                          console.log(subscriberNuevo);
                          dataFitUser.user=userNuevo;
                          dataFitUser.subscriber=subscriberNuevo;
                          this.fitUserService.create(dataFitUser)
                              .subscribe(
                                  response => {
                                    console.log(response);
                                    Swal.fire(
                                        {

                                          icon: "success",
                                          title: "Suscriptor Agregado."
                                        }
                                    ).then(result => {
                                    this.router.navigateByUrl("subscriberTable");
                                    })

                                  },
                                  error => {
                                    Swal.fire(
                                        {
                                          icon: "error",
                                          title: error.error.title
                                        }
                                    )
                                  });

                        },
                        error => {
                          Swal.fire(
                              {
                                icon: "error",
                                title: error.error.title
                              }
                          )
                        });

              },
              error => {
                Swal.fire(
                    {
                      icon: "error",
                      title: error.error.title
                    }
                )
              });







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

  foto(){
    const imageUploadComponent = this.imageUploadComponent
    imageUploadComponent.ngOnInit()
  }



}



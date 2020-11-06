import { Component, OnInit } from '@angular/core';

import {any} from "codelyzer/util/function";

import {formatDate} from "@angular/common";
import {SubscriberService} from "../../../../../services/subscriber/subscriber.service";

@Component({
  selector: 'app-add-subscriber',
  templateUrl: './add-subscriber.component.html',
  styleUrls: ['./add-subscriber.component.scss']
})
export class AddSubscriberComponent implements OnInit {
  subscriber = {
    initialDate: '',
    medicalConditions: '',
    paymentFreq: '',
    subscriptionPayment: any,
    measurements: any,
    plans: any,
    guidedTrainings: any
  };

  user = {
    login: '',
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
  constructor() { }
  // constructor(private subscriberService: SubscriberService) { }

  ngOnInit(): void {

  }

  saveSubscriber(): void {

    const dataSuscriber = {
      initialDate: this.subscriber.initialDate,
      medicalConditions: this.subscriber.medicalConditions,
      paymentFreq: this.subscriber.paymentFreq,
      subscriptionPayment: any,
      measurements: any,
      plans: any,
      guidedTrainings: any,
      fitUser: any
    };
    const dataUser = {
      login: this.user.login,
      firstName: this.user.firstName,
      lastName: this.user.lastName,
      email: this.user.email,
      imageUrl: this.user.imageUrl,
      activated: true,
      langKey: 'en',
      createdDate: formatDate(new Date(), 'yyyy-MM-dd', 'en'),
      lastModifiedBy: 'system',
      lastModifiedDate: formatDate(new Date(), 'yyyy-MM-dd', 'en'),
      authorities: any
    };
    const dataFitUser = {
      legalId: this.fitUser.legalId,
      bday: this.fitUser.bday,
      phone: this.fitUser.phone,
      emergencyPhone: this.fitUser.emergencyPhone,
      user: dataUser,
      subscriber: dataSuscriber,
      schedules: any,
      role: any
    };
    console.log(dataFitUser);
    console.log(dataUser);
    console.log(dataSuscriber);
    // this.SubscriberService.get(this.idTipoActivo).subscribe(
    //     tipoActivoResponse => {
    //       console.log(tipoActivoResponse);
   //      data.tipoActivo = tipoActivoResponse;
   //        this.subscriberService.create(data)
   //            .subscribe(
   //                response => {
   //                  console.log(response);
   //
   //                },
   //                error => {
   //                  console.log(error);
   //                });
        // },
        // error => {
        //   console.log(error);
        // });
  }

}

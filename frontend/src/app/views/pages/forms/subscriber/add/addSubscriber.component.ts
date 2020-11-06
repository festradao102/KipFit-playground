import { Component, OnInit } from '@angular/core';

import {any} from "codelyzer/util/function";

import {formatDate} from "@angular/common";
import {SubscriberService} from "../../../../../services/subscriber.service";



@Component({
  selector: 'app-addSubscriber',
  templateUrl: './addSubscriber.component.html',
  styleUrls: ['./addSubscriber.component.scss']
})
export class AddSubscriberComponent implements OnInit {
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
  // constructor() { }
  constructor(private subscriberService: SubscriberService) { }

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


          this.subscriberService.create(dataSuscriber)
              .subscribe(
                  response => {
                    console.log(response);

                  },
                  error => {
                    console.log(error);
                  });

  }

}

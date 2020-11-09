import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {SubscriberService} from "../../../../services/subscriber.service";
import {UserService} from "../../../../services/user.service";
import {FitUserService} from "../../../../services/fit-user.service";
import {DataTable} from 'simple-datatables';
import {any} from "codelyzer/util/function";
import {formatDate} from "@angular/common";

@Component({
  selector: 'app-subscriber-table',
  templateUrl: './subscriber-table.component.html',
  styleUrls: ['./subscriber-table.component.scss']
})
export class SubscriberTableComponent implements OnInit {

  subscriberTable = DataTable;

  constructor(private router: Router,
              private subscriberService: SubscriberService, private userService: UserService, private fitUserService: FitUserService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.subscriberTable = new DataTable('#subscriberDataTable');

    this.fitUserService.getAll().subscribe(
        data => {

          const dataTableRows = [];
          for (const fitUser of data) {
              if(fitUser.subscriber!=null){
                let estado = fitUser.user.activated = (true) ? "Activo" : "Inactivo";
                dataTableRows.push([
                  fitUser.legalId,
                  fitUser.user.firstName+" "+fitUser.user.lastName,
                  fitUser.user.email,
                  fitUser.phone,
                  formatDate(fitUser.subscriber.initialDate, 'yyyy-MM-dd', 'en'),
                  estado,
                  `<a href="/subscribers/${fitUser.id}">Ver Detalles</a>`
                ]);
              }

          }
          console.log(dataTableRows);

          this.subscriberTable.rows().add(dataTableRows);
        }
    )

  }




}

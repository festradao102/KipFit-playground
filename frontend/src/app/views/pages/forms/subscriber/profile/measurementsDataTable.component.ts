import {Component, OnInit} from '@angular/core';

import {DataTable} from 'simple-datatables';
import {ActivatedRoute, Router} from '@angular/router';

import {SubscriberService} from '../../../../../services/subscriber.service';

@Component({
  selector: 'app-measurements-data-table-component',
  templateUrl: './measurementsDataTable.component.html',
  styleUrls: ['./measurementsDataTable.component.scss']
})

export class MeasurementsDataTableComponent implements OnInit {
  measurements: any;
  measurementsDataTable: any;

  constructor(private router: Router,
              private subscriberService:SubscriberService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.measurementsDataTable = new DataTable('#measurementsDataTable');
    this.retrieveMeasurementsSubById(this.route.snapshot.paramMap.get('id'));
  }

  retrieveMeasurementsSubById(id): void {
    this.subscriberService.get(id)
      .subscribe(
        data => {
          console.log(data);
          const dataTableRows = [];
          for (const singleMeasurement of data.measurements) {
            dataTableRows.push([
              singleMeasurement.weight.toString(),
              singleMeasurement.dateCreated,
              `<a href="/measurements/${singleMeasurement.id}">Ver Detalles</a>`
            ]);
          }
          console.log(dataTableRows);
          this.measurementsDataTable.rows().add(dataTableRows);
        },
        error => {
          console.log(error);
        });
  }
}

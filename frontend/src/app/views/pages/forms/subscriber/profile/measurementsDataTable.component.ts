import {Component, OnInit} from '@angular/core';

import {ActivatedRoute, Router} from '@angular/router';

import {DataTable} from 'simple-datatables';
import {FitUserService} from '../../../../../services/fit-user.service';

@Component({
  selector: 'app-measurements-data-table-component',
  templateUrl: './measurementsDataTable.component.html',
  styleUrls: ['./measurementsDataTable.component.scss']
})

export class MeasurementsDataTableComponent implements OnInit {
  measurements: any;
  measurementsDataTable: any;

  constructor(private router: Router,
              private fitUserService: FitUserService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.measurementsDataTable = new DataTable('#measurementsDataTable');
    this.retrieveMeasurementsSubById(this.route.snapshot.paramMap.get('id'));
  }

  retrieveMeasurementsSubById(id): void {
    this.fitUserService.get(id)
      .subscribe(
        data => {
          console.log(data);
          const dataTableRows = [];
          for (const singleMeasurement of data.subscriber.measurements) {
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

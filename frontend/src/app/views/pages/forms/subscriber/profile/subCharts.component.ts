import { Component, OnInit } from '@angular/core';

import { ChartOptions, ChartType, ChartDataSets, RadialChartOptions } from 'chart.js';
import { Label, Color, SingleDataSet } from 'ng2-charts';
import {ActivatedRoute} from "@angular/router";
import {SubscriberService} from "../../../../../services/subscriber.service";
import {formatDate} from "@angular/common";

@Component({
  selector: 'app-sub-charts-component',
  templateUrl: 'subCharts.component.html',
  styleUrls: ['subCharts.component.scss']
})
export class SubChartsComponent implements OnInit {

  private fat_dateXLabels = [];
  private fat_dateYLabels = [];
  private metabolic_dateXLabels = [];
  private metabolic_dateYLabels = [];

  constructor(private route: ActivatedRoute, protected subscriberService: SubscriberService) {
    this.getFatPercentage(this.route.snapshot.paramMap.get('id'));
    this.getMetabolic(this.route.snapshot.paramMap.get('id'));
  }

  ngOnInit() {
  }

  getFatPercentage(id){
    this.subscriberService.get(id).subscribe(res => {
      console.log(res);
      for (const singleMeasure of res.measurements){
        this.fat_dateXLabels.push(formatDate(singleMeasure.dateCreated, 'dd-MM-yyyy', 'en'));
        this.fat_dateYLabels.push(singleMeasure.fatPercentage);
      }
      console.log(this.fat_dateYLabels);
      this.loadFatGraphs(this.fat_dateYLabels);
    });
  }

  getMetabolic(id){
    this.subscriberService.get(id).subscribe(res => {
      console.log(res);
      for (const singleMeasure of res.measurements){
        this.metabolic_dateXLabels.push(formatDate(singleMeasure.dateCreated, 'dd-MM-yyyy', 'en'));
        this.metabolic_dateYLabels.push(singleMeasure.metabolicage);
      }
      console.log(this.metabolic_dateYLabels);
      this.loadMetaGraphs(this.metabolic_dateYLabels);
    });
  }

  loadFatGraphs(graphData){
    this.fat_barChartData = [];
    this.fat_barChartData.push({ data: graphData, label: 'Grasa %', fill:false });
  }

  loadMetaGraphs(graphData){
    this.metabolic_barChartData = [];
    this.metabolic_barChartData.push({ data: graphData, label: 'Edad metabólica',fill: false });
  }

  /**
   * Fat percentage Bar chart
   *
   */


  public fat_barChartOptions: ChartOptions = {
    responsive: true,
  };
  public fat_barChartLabels: Label[] = this.fat_dateXLabels;
  public fat_barChartType: ChartType = 'line';
  public fat_barChartColors: Color[] = [
    { backgroundColor: ["#b1cfec","#7ee5e5","#66d1d1","#f77eb9","#4d8af0"] }
  ]
  public fat_barChartLegend = false;
  public fat_barChartPlugins = [];
  public fat_barChartData: ChartDataSets[] = [
    { data: [], label: ''}
  ];

  /**
   * Metabolic Bar chart
   */

  public metabolic_barChartOptions: ChartOptions = {
    responsive: true,
  };
  public metabolic_barChartLabels: Label[] = this.metabolic_dateXLabels;
  public metabolic_barChartType: ChartType = 'line';
  public metabolic_barChartColors: Color[] = [
    { backgroundColor: ["#b1cfec","#7ee5e5","#66d1d1","#f77eb9","#4d8af0"] }
  ]
  public metabolic_barChartLegend = false;
  public metabolic_barChartPlugins = [];
  public metabolic_barChartData: ChartDataSets[] = [
    { data: [], label: ''}
  ];
  /**
   *
   */


/*

  loadMetabolicGraph(graphData){
    this.metabolic_barChartData = [];

    for(const index in graphData){
      this.metabolic_barChartData.push({ data: graphData[index], label: 'Edad metabólica',fill: false });
    }
  }


  this.getUpperMeasures(this.route.snapshot.paramMap.get('id'));
  this.getLowerMeasures(this.route.snapshot.paramMap.get('id'));


  getUpperMeasures(id){
    this.subscriberService.get(id).subscribe(res => {
      this.upperMeasuresModel = res;
      console.log(res);
      for (const singleMeasure of this.upperMeasuresModel.measurements){
        this.upperMeasuresSub.push([
          singleMeasure.neck,
          singleMeasure.rightArm,
          singleMeasure.leftArm,
          singleMeasure.thorax,
        ]);
      }
      console.log(this.upperMeasuresSub);
      this.loadUpperMeasuresGraph(this.upperMeasuresSub);
    });
  }

  getLowerMeasures(id){
    this.subscriberService.get(id).subscribe(res => {
      this.lowerMeasuresModel = res;
      console.log(res);
      for (const singleMeasure of this.lowerMeasuresModel.measurements){
        this.lowerMeasuresSub.push([
          singleMeasure.hip,
          singleMeasure.rightThigh,
          singleMeasure.leftThigh,
          singleMeasure.core,
        ]);
      }
      console.log(this.lowerMeasuresSub);
      this.loadLowerMeasuresGraph(this.lowerMeasuresSub);
    });
  }



  loadUpperMeasuresGraph(graphData){
    this.upperMeasures_barChartData = [];

    for(const index in graphData){
      this.upperMeasures_barChartData.push({ data: graphData[index], fill: false });
    }
  }

  loadLowerMeasuresGraph(graphData){
    this.lowerMeasures_barChartData = [];

    for(const index in graphData){
      this.lowerMeasures_barChartData.push({ data: graphData[index], fill: false });
    }
  }

  */
}



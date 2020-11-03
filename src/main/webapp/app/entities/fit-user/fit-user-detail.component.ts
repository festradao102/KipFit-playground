import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IFitUser } from 'app/shared/model/fit-user.model';

@Component({
  selector: 'jhi-fit-user-detail',
  templateUrl: './fit-user-detail.component.html',
})
export class FitUserDetailComponent implements OnInit {
  fitUser: IFitUser | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ fitUser }) => (this.fitUser = fitUser));
  }

  previousState(): void {
    window.history.back();
  }
}

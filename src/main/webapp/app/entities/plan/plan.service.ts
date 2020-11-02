import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IPlan } from 'app/shared/model/plan.model';

type EntityResponseType = HttpResponse<IPlan>;
type EntityArrayResponseType = HttpResponse<IPlan[]>;

@Injectable({ providedIn: 'root' })
export class PlanService {
  public resourceUrl = SERVER_API_URL + 'api/plans';

  constructor(protected http: HttpClient) {}

  create(plan: IPlan): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(plan);
    return this.http
      .post<IPlan>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(plan: IPlan): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(plan);
    return this.http
      .put<IPlan>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IPlan>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IPlan[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(plan: IPlan): IPlan {
    const copy: IPlan = Object.assign({}, plan, {
      dateCreated: plan.dateCreated && plan.dateCreated.isValid() ? plan.dateCreated.toJSON() : undefined,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.dateCreated = res.body.dateCreated ? moment(res.body.dateCreated) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((plan: IPlan) => {
        plan.dateCreated = plan.dateCreated ? moment(plan.dateCreated) : undefined;
      });
    }
    return res;
  }
}

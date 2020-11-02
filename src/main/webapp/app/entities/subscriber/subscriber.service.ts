import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ISubscriber } from 'app/shared/model/subscriber.model';

type EntityResponseType = HttpResponse<ISubscriber>;
type EntityArrayResponseType = HttpResponse<ISubscriber[]>;

@Injectable({ providedIn: 'root' })
export class SubscriberService {
  public resourceUrl = SERVER_API_URL + 'api/subscribers';

  constructor(protected http: HttpClient) {}

  create(subscriber: ISubscriber): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(subscriber);
    return this.http
      .post<ISubscriber>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(subscriber: ISubscriber): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(subscriber);
    return this.http
      .put<ISubscriber>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<ISubscriber>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<ISubscriber[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(subscriber: ISubscriber): ISubscriber {
    const copy: ISubscriber = Object.assign({}, subscriber, {
      initialDate: subscriber.initialDate && subscriber.initialDate.isValid() ? subscriber.initialDate.toJSON() : undefined,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.initialDate = res.body.initialDate ? moment(res.body.initialDate) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((subscriber: ISubscriber) => {
        subscriber.initialDate = subscriber.initialDate ? moment(subscriber.initialDate) : undefined;
      });
    }
    return res;
  }
}

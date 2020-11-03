import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ISubscriptionPayment } from 'app/shared/model/subscription-payment.model';

type EntityResponseType = HttpResponse<ISubscriptionPayment>;
type EntityArrayResponseType = HttpResponse<ISubscriptionPayment[]>;

@Injectable({ providedIn: 'root' })
export class SubscriptionPaymentService {
  public resourceUrl = SERVER_API_URL + 'api/subscription-payments';

  constructor(protected http: HttpClient) {}

  create(subscriptionPayment: ISubscriptionPayment): Observable<EntityResponseType> {
    return this.http.post<ISubscriptionPayment>(this.resourceUrl, subscriptionPayment, { observe: 'response' });
  }

  update(subscriptionPayment: ISubscriptionPayment): Observable<EntityResponseType> {
    return this.http.put<ISubscriptionPayment>(this.resourceUrl, subscriptionPayment, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ISubscriptionPayment>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ISubscriptionPayment[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}

import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { ISubscriber, Subscriber } from 'app/shared/model/subscriber.model';
import { SubscriberService } from './subscriber.service';
import { ISubscriptionPayment } from 'app/shared/model/subscription-payment.model';
import { SubscriptionPaymentService } from 'app/entities/subscription-payment/subscription-payment.service';
import { IGuidedTraining } from 'app/shared/model/guided-training.model';
import { GuidedTrainingService } from 'app/entities/guided-training/guided-training.service';

type SelectableEntity = ISubscriptionPayment | IGuidedTraining;

@Component({
  selector: 'jhi-subscriber-update',
  templateUrl: './subscriber-update.component.html',
})
export class SubscriberUpdateComponent implements OnInit {
  isSaving = false;
  subscriptionpayments: ISubscriptionPayment[] = [];
  guidedtrainings: IGuidedTraining[] = [];

  editForm = this.fb.group({
    id: [],
    initialDate: [],
    medicalConditions: [],
    paymentFreq: [],
    subscriptionPayment: [],
    guidedTrainings: [],
  });

  constructor(
    protected subscriberService: SubscriberService,
    protected subscriptionPaymentService: SubscriptionPaymentService,
    protected guidedTrainingService: GuidedTrainingService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ subscriber }) => {
      if (!subscriber.id) {
        const today = moment().startOf('day');
        subscriber.initialDate = today;
      }

      this.updateForm(subscriber);

      this.subscriptionPaymentService
        .query({ filter: 'subscriber-is-null' })
        .pipe(
          map((res: HttpResponse<ISubscriptionPayment[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: ISubscriptionPayment[]) => {
          if (!subscriber.subscriptionPayment || !subscriber.subscriptionPayment.id) {
            this.subscriptionpayments = resBody;
          } else {
            this.subscriptionPaymentService
              .find(subscriber.subscriptionPayment.id)
              .pipe(
                map((subRes: HttpResponse<ISubscriptionPayment>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: ISubscriptionPayment[]) => (this.subscriptionpayments = concatRes));
          }
        });

      this.guidedTrainingService.query().subscribe((res: HttpResponse<IGuidedTraining[]>) => (this.guidedtrainings = res.body || []));
    });
  }

  updateForm(subscriber: ISubscriber): void {
    this.editForm.patchValue({
      id: subscriber.id,
      initialDate: subscriber.initialDate ? subscriber.initialDate.format(DATE_TIME_FORMAT) : null,
      medicalConditions: subscriber.medicalConditions,
      paymentFreq: subscriber.paymentFreq,
      subscriptionPayment: subscriber.subscriptionPayment,
      guidedTrainings: subscriber.guidedTrainings,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const subscriber = this.createFromForm();
    if (subscriber.id !== undefined) {
      this.subscribeToSaveResponse(this.subscriberService.update(subscriber));
    } else {
      this.subscribeToSaveResponse(this.subscriberService.create(subscriber));
    }
  }

  private createFromForm(): ISubscriber {
    return {
      ...new Subscriber(),
      id: this.editForm.get(['id'])!.value,
      initialDate: this.editForm.get(['initialDate'])!.value
        ? moment(this.editForm.get(['initialDate'])!.value, DATE_TIME_FORMAT)
        : undefined,
      medicalConditions: this.editForm.get(['medicalConditions'])!.value,
      paymentFreq: this.editForm.get(['paymentFreq'])!.value,
      subscriptionPayment: this.editForm.get(['subscriptionPayment'])!.value,
      guidedTrainings: this.editForm.get(['guidedTrainings'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISubscriber>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: SelectableEntity): any {
    return item.id;
  }

  getSelected(selectedVals: IGuidedTraining[], option: IGuidedTraining): IGuidedTraining {
    if (selectedVals) {
      for (let i = 0; i < selectedVals.length; i++) {
        if (option.id === selectedVals[i].id) {
          return selectedVals[i];
        }
      }
    }
    return option;
  }
}

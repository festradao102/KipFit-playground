import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ISubscriptionPayment, SubscriptionPayment } from 'app/shared/model/subscription-payment.model';
import { SubscriptionPaymentService } from './subscription-payment.service';

@Component({
  selector: 'jhi-subscription-payment-update',
  templateUrl: './subscription-payment-update.component.html',
})
export class SubscriptionPaymentUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    amount: [],
  });

  constructor(
    protected subscriptionPaymentService: SubscriptionPaymentService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ subscriptionPayment }) => {
      this.updateForm(subscriptionPayment);
    });
  }

  updateForm(subscriptionPayment: ISubscriptionPayment): void {
    this.editForm.patchValue({
      id: subscriptionPayment.id,
      amount: subscriptionPayment.amount,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const subscriptionPayment = this.createFromForm();
    if (subscriptionPayment.id !== undefined) {
      this.subscribeToSaveResponse(this.subscriptionPaymentService.update(subscriptionPayment));
    } else {
      this.subscribeToSaveResponse(this.subscriptionPaymentService.create(subscriptionPayment));
    }
  }

  private createFromForm(): ISubscriptionPayment {
    return {
      ...new SubscriptionPayment(),
      id: this.editForm.get(['id'])!.value,
      amount: this.editForm.get(['amount'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISubscriptionPayment>>): void {
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
}

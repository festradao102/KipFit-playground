import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IFitUser, FitUser } from 'app/shared/model/fit-user.model';
import { FitUserService } from './fit-user.service';
import { IUser } from 'app/core/user/user.model';
import { UserService } from 'app/core/user/user.service';
import { ISubscriber } from 'app/shared/model/subscriber.model';
import { SubscriberService } from 'app/entities/subscriber/subscriber.service';
import { ISchedule } from 'app/shared/model/schedule.model';
import { ScheduleService } from 'app/entities/schedule/schedule.service';
import { IRole } from 'app/shared/model/role.model';
import { RoleService } from 'app/entities/role/role.service';

type SelectableEntity = IUser | ISubscriber | ISchedule | IRole;

@Component({
  selector: 'jhi-fit-user-update',
  templateUrl: './fit-user-update.component.html',
})
export class FitUserUpdateComponent implements OnInit {
  isSaving = false;
  users: IUser[] = [];
  subscribers: ISubscriber[] = [];
  schedules: ISchedule[] = [];
  roles: IRole[] = [];

  editForm = this.fb.group({
    id: [],
    legalId: [],
    bday: [],
    phone: [],
    emergencyPhone: [],
    user: [],
    subscriber: [],
    schedules: [],
    role: [],
  });

  constructor(
    protected fitUserService: FitUserService,
    protected userService: UserService,
    protected subscriberService: SubscriberService,
    protected scheduleService: ScheduleService,
    protected roleService: RoleService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ fitUser }) => {
      if (!fitUser.id) {
        const today = moment().startOf('day');
        fitUser.bday = today;
      }

      this.updateForm(fitUser);

      this.userService.query().subscribe((res: HttpResponse<IUser[]>) => (this.users = res.body || []));

      this.subscriberService
        .query({ filter: 'fituser-is-null' })
        .pipe(
          map((res: HttpResponse<ISubscriber[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: ISubscriber[]) => {
          if (!fitUser.subscriber || !fitUser.subscriber.id) {
            this.subscribers = resBody;
          } else {
            this.subscriberService
              .find(fitUser.subscriber.id)
              .pipe(
                map((subRes: HttpResponse<ISubscriber>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: ISubscriber[]) => (this.subscribers = concatRes));
          }
        });

      this.scheduleService.query().subscribe((res: HttpResponse<ISchedule[]>) => (this.schedules = res.body || []));

      this.roleService.query().subscribe((res: HttpResponse<IRole[]>) => (this.roles = res.body || []));
    });
  }

  updateForm(fitUser: IFitUser): void {
    this.editForm.patchValue({
      id: fitUser.id,
      legalId: fitUser.legalId,
      bday: fitUser.bday ? fitUser.bday.format(DATE_TIME_FORMAT) : null,
      phone: fitUser.phone,
      emergencyPhone: fitUser.emergencyPhone,
      user: fitUser.user,
      subscriber: fitUser.subscriber,
      schedules: fitUser.schedules,
      role: fitUser.role,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const fitUser = this.createFromForm();
    if (fitUser.id !== undefined) {
      this.subscribeToSaveResponse(this.fitUserService.update(fitUser));
    } else {
      this.subscribeToSaveResponse(this.fitUserService.create(fitUser));
    }
  }

  private createFromForm(): IFitUser {
    return {
      ...new FitUser(),
      id: this.editForm.get(['id'])!.value,
      legalId: this.editForm.get(['legalId'])!.value,
      bday: this.editForm.get(['bday'])!.value ? moment(this.editForm.get(['bday'])!.value, DATE_TIME_FORMAT) : undefined,
      phone: this.editForm.get(['phone'])!.value,
      emergencyPhone: this.editForm.get(['emergencyPhone'])!.value,
      user: this.editForm.get(['user'])!.value,
      subscriber: this.editForm.get(['subscriber'])!.value,
      schedules: this.editForm.get(['schedules'])!.value,
      role: this.editForm.get(['role'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IFitUser>>): void {
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

  getSelected(selectedVals: ISchedule[], option: ISchedule): ISchedule {
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

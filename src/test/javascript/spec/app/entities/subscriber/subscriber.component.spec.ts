import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { KipfitTestModule } from '../../../test.module';
import { SubscriberComponent } from 'app/entities/subscriber/subscriber.component';
import { SubscriberService } from 'app/entities/subscriber/subscriber.service';
import { Subscriber } from 'app/shared/model/subscriber.model';

describe('Component Tests', () => {
  describe('Subscriber Management Component', () => {
    let comp: SubscriberComponent;
    let fixture: ComponentFixture<SubscriberComponent>;
    let service: SubscriberService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [KipfitTestModule],
        declarations: [SubscriberComponent],
      })
        .overrideTemplate(SubscriberComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(SubscriberComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(SubscriberService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Subscriber(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.subscribers && comp.subscribers[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});

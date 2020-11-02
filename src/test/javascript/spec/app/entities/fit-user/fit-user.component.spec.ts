import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { KipfitTestModule } from '../../../test.module';
import { FitUserComponent } from 'app/entities/fit-user/fit-user.component';
import { FitUserService } from 'app/entities/fit-user/fit-user.service';
import { FitUser } from 'app/shared/model/fit-user.model';

describe('Component Tests', () => {
  describe('FitUser Management Component', () => {
    let comp: FitUserComponent;
    let fixture: ComponentFixture<FitUserComponent>;
    let service: FitUserService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [KipfitTestModule],
        declarations: [FitUserComponent],
      })
        .overrideTemplate(FitUserComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(FitUserComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(FitUserService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new FitUser(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.fitUsers && comp.fitUsers[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});

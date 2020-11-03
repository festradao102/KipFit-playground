import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { KipfitTestModule } from '../../../test.module';
import { SystemParameterComponent } from 'app/entities/system-parameter/system-parameter.component';
import { SystemParameterService } from 'app/entities/system-parameter/system-parameter.service';
import { SystemParameter } from 'app/shared/model/system-parameter.model';

describe('Component Tests', () => {
  describe('SystemParameter Management Component', () => {
    let comp: SystemParameterComponent;
    let fixture: ComponentFixture<SystemParameterComponent>;
    let service: SystemParameterService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [KipfitTestModule],
        declarations: [SystemParameterComponent],
      })
        .overrideTemplate(SystemParameterComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(SystemParameterComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(SystemParameterService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new SystemParameter(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.systemParameters && comp.systemParameters[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});

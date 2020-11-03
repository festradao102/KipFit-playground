import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { KipfitTestModule } from '../../../test.module';
import { ObjectiveTypeComponent } from 'app/entities/objective-type/objective-type.component';
import { ObjectiveTypeService } from 'app/entities/objective-type/objective-type.service';
import { ObjectiveType } from 'app/shared/model/objective-type.model';

describe('Component Tests', () => {
  describe('ObjectiveType Management Component', () => {
    let comp: ObjectiveTypeComponent;
    let fixture: ComponentFixture<ObjectiveTypeComponent>;
    let service: ObjectiveTypeService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [KipfitTestModule],
        declarations: [ObjectiveTypeComponent],
      })
        .overrideTemplate(ObjectiveTypeComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ObjectiveTypeComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ObjectiveTypeService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new ObjectiveType(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.objectiveTypes && comp.objectiveTypes[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { KipfitTestModule } from '../../../test.module';
import { SystemParameterDetailComponent } from 'app/entities/system-parameter/system-parameter-detail.component';
import { SystemParameter } from 'app/shared/model/system-parameter.model';

describe('Component Tests', () => {
  describe('SystemParameter Management Detail Component', () => {
    let comp: SystemParameterDetailComponent;
    let fixture: ComponentFixture<SystemParameterDetailComponent>;
    const route = ({ data: of({ systemParameter: new SystemParameter(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [KipfitTestModule],
        declarations: [SystemParameterDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(SystemParameterDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(SystemParameterDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load systemParameter on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.systemParameter).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});

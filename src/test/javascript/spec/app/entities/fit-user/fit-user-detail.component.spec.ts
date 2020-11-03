import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { KipfitTestModule } from '../../../test.module';
import { FitUserDetailComponent } from 'app/entities/fit-user/fit-user-detail.component';
import { FitUser } from 'app/shared/model/fit-user.model';

describe('Component Tests', () => {
  describe('FitUser Management Detail Component', () => {
    let comp: FitUserDetailComponent;
    let fixture: ComponentFixture<FitUserDetailComponent>;
    const route = ({ data: of({ fitUser: new FitUser(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [KipfitTestModule],
        declarations: [FitUserDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(FitUserDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(FitUserDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load fitUser on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.fitUser).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});

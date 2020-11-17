import { NgModule } from '@angular/core';
import { KipfitSharedLibsModule } from './shared-libs.module';
import { LoginModalComponent } from './login/login.component';
import { HasAnyAuthorityDirective } from './auth/has-any-authority.directive';

@NgModule({
  imports: [KipfitSharedLibsModule],
  declarations: [LoginModalComponent, HasAnyAuthorityDirective],
  entryComponents: [LoginModalComponent],
  exports: [
    KipfitSharedLibsModule,
    LoginModalComponent,
    HasAnyAuthorityDirective,
  ],
})
export class KipfitSharedModule {}

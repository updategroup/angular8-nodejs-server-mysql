import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonService } from 'src/app/service/common.service';
import { SpinnerComponent } from './spinner/spinner.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    SpinnerComponent
  ],
  exports: [
    SpinnerComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders{
    return {
      ngModule: SharedModule,
      providers: [
        CommonService
      ] 
    };
  }
 }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ToastrModule } from 'ngx-toastr';
import { PageNotfoundComponent } from './page-notfound/page-notfound.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    PageNotfoundComponent
  ],
  imports: [
    // SharedModule,
    CommonModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({      // Register NgxToast NPM module
      timeOut: 3000,
      positionClass: 'toast-top-right',
      preventDuplicates: true
    }),
  ],
  providers: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

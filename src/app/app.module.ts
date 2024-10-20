import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx'
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';

import { provideHttpClient } from '@angular/common/http';

import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), FormsModule, AppRoutingModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, provideAnimationsAsync(), NativeStorage, SQLite, provideHttpClient(),],
  bootstrap: [AppComponent],
})
export class AppModule {}

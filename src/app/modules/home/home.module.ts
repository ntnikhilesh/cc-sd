import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { SharedModule } from '../../shared/shared.module';
import { UploadComponent } from './components/upload/upload.component'
// import { Router, RouterModule } from '@angular/router';


@NgModule({
  declarations: [HomeComponent, UploadComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    // RouterModule.forChild(router),
    SharedModule
  ]
})
export class HomeModule { }

import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { HistoryComponent } from './history/history.component';
import { NavComponent } from './nav/nav.component';
import { LoaderModule } from '../modules/loader/loader.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [HistoryComponent, NavComponent],
  imports: [CommonModule, SharedRoutingModule, FormsModule, ReactiveFormsModule, LoaderModule],
  exports: [HistoryComponent, NavComponent, FormsModule, ReactiveFormsModule, LoaderModule],
  entryComponents: [],
})
export class SharedModule {}

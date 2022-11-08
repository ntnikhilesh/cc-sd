import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { HistoryComponent } from './history/history.component';
import { NavComponent } from './nav/nav.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [HistoryComponent, NavComponent],
  imports: [CommonModule, SharedRoutingModule, FormsModule, ReactiveFormsModule],
  exports: [HistoryComponent, NavComponent, FormsModule, ReactiveFormsModule],
  entryComponents: [],
})
export class SharedModule {}

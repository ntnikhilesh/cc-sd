import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { HistoryComponent } from './history/history.component';
import { NavComponent } from './nav/nav.component';

@NgModule({
  declarations: [HistoryComponent, NavComponent],
  imports: [CommonModule, SharedRoutingModule],
  exports: [HistoryComponent, NavComponent],
  entryComponents: [],
})
export class SharedModule {}

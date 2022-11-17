import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { HistoryComponent } from './history/history.component';
import { NavComponent } from './nav/nav.component';
import { LoaderModule } from '../modules/loader/loader.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatTableModule} from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
  declarations: [HistoryComponent, NavComponent],
  imports: [CommonModule, SharedRoutingModule, FormsModule, ReactiveFormsModule, LoaderModule, MatTableModule, MatPaginatorModule],
  exports: [HistoryComponent, NavComponent, FormsModule, ReactiveFormsModule, LoaderModule, MatTableModule, MatPaginatorModule],
  entryComponents: [],
})
export class SharedModule {}

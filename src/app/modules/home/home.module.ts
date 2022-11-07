import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { HomeRoutingModule } from "./home-routing.module";
import { HomeComponent } from "./pages/home/home.component";
import { SharedModule } from "../../shared/shared.module";
import { UploadComponent } from "./components/upload/upload.component";
import { UploadHistoryDetailsComponent } from "./pages/upload-history-details/upload-history-details.component";

@NgModule({
  declarations: [HomeComponent, UploadComponent, UploadHistoryDetailsComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
  ],
})
export class HomeModule {}

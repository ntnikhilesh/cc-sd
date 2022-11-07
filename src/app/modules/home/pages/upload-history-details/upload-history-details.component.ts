import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { HomeService } from "../../home.service";
@Component({
  selector: "app-upload-history-details",
  templateUrl: "./upload-history-details.component.html",
  styleUrls: ["./upload-history-details.component.scss"],
})
export class UploadHistoryDetailsComponent implements OnInit {
  historyDetails: any = {};
  constructor(
    private homeService: HomeService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      console.log(" subscribe param... ", this.historyDetails);
      this.historyDetails["historyId"] = params["id"];
      if (this.historyDetails["historyId"]) {
        this.getHistoryDetailById().then(
          (res) => {
            if (res) {
              console.log("getHistoryDetailById done....", this.historyDetails);
            }
          },
          (error) => {
            console.log("getHistoryDetailById error....", error);
          }
        );
      } else {
        alert("History ID is missing!");
        this.router.navigate([""]);
      }
    });
  }

  /* start getHistoryDetailById */
  getHistoryDetailById(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.homeService
        .getHistoryDetailById(this.historyDetails["historyId"])
        .subscribe(
          (getHistoryDetailByIdResp) => {
            console.log("getHistoryDetailByIdResp:", getHistoryDetailByIdResp);
            this.historyDetails["getHistoryDetailByIdResp"] =
              getHistoryDetailByIdResp;
            resolve(true);
          },
          (error) => {
            console.log("getHistoryDetailByIdResp error...", error);
            alert("Error while getting history details.");
            reject();
          }
        );
    });
  }
  /* end getAgreementById */

  onEditClick() {
    alert("Coming Soon!");
  }

  onBackClick() {
    this.router.navigate([""]);
  }
}

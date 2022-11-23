import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { MatSort } from "@angular/material/sort";
import { Router, ActivatedRoute } from "@angular/router";
import { HomeService } from "../../../home/home.service";
import { LoaderService } from "../../../loader/loader.service";
declare var $: any;

@Component({
  selector: "app-upload-history-details",
  templateUrl: "./upload-history-details.component.html",
  styleUrls: ["./upload-history-details.component.scss"],
})
export class UploadHistoryDetailsComponent implements OnInit {
  displayedColumns = [
    "position",
    "name_of_agreement",
    "file_name",
    "type_of_agreement",
    "status",
    "action",
  ];
  dataSource: MatTableDataSource<UserData>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  users: UserData[] = [];

  // start
  homeDetails: any = {};
  constructor(
    private homeService: HomeService,
    private router: Router,
    private loaderService: LoaderService,
    private activatedRoute: ActivatedRoute
  ) {}
  // }

  // start old
  historyDetails: any = {};

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      console.log(" subscribe param... ", this.historyDetails);
      this.historyDetails["historyId"] = params["id"];
      if (this.historyDetails["historyId"]) {
        this.loaderService.show();
        this.getHistoryDetailById().then(
          (res) => {
            if (res) {
              this.loaderService.hide();
              console.log("getHistoryDetailById done....", this.historyDetails);
            }
          },
          (error) => {
            this.loaderService.hide();
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
            for (
              let i = 0;
              i <
              this.historyDetails["getHistoryDetailByIdResp"]["agreements"][
                "rows"
              ].length;
              i++
            ) {
              this.users.push(
                this.createHistory(
                  i,
                  this.historyDetails["getHistoryDetailByIdResp"]["agreements"][
                    "rows"
                  ][i]
                )
              );
            }
            // Assign the data to the data source for the table to render
            this.dataSource = new MatTableDataSource(this.users);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
            console.log("final users", this.users);
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
  /* end getHistoryDetailById */

  onEditClick(selectedAgreement) {
    console.log(selectedAgreement, "onEditClick", this.historyDetails);
    this.historyDetails["selectedAgreement"] =
      this.historyDetails["getHistoryDetailByIdResp"]["agreements"]["rows"][
        selectedAgreement - 1
      ];
    this.historyDetails["getAgreementByIdResp"] = {};
    this.loaderService.show();
    this.getAgreementById().then(
      (res) => {
        if (res) {
          this.loaderService.hide();
          console.log("getAgreementById done....", this.historyDetails);
        }
      },
      (error) => {
        this.loaderService.hide();
        console.log("getAgreementById error....", error);
      }
    );
  }

  onBackClick() {
    this.router.navigate([""]);
  }

  handleSubmit() {
    console.log("handleSubmit...", this.historyDetails);
    this.loaderService.show();
    this.updateMetaDeta().then(
      (res) => {
        if (res) {
          this.loaderService.hide();
          console.log("updateMetaDeta done....", this.historyDetails);
        }
      },
      (error) => {
        this.loaderService.hide();
        console.log("updateMetaDeta error....", error);
      }
    );
  }

  /* start updateMetaDeta */
  updateMetaDeta(): Promise<any> {
    return new Promise((resolve, reject) => {
      let payload = {};
      const { dynamic_metadata, predefined_metadata_fields } =
        this.historyDetails["getAgreementByIdResp"];
      payload = { dynamic_metadata, predefined_metadata_fields };
      console.log("final updateMetaDeta payload: ", payload);
      this.homeService
        .updateMetaDeta(this.historyDetails["selectedAgreement"]["id"], payload)
        .subscribe(
          (updateMetaDetaResp) => {
            console.log("updateMetaDetaResp:", updateMetaDetaResp);
            this.historyDetails["updateMetaDetaResp"] = updateMetaDetaResp;
            alert("Update successful!");
            window.location.reload();
            resolve(true);
          },
          (error) => {
            console.log("updateMetaDetaResp error...", error);
            alert("Error while updating meta data.");
            reject();
          }
        );
    });
  }
  /* end updateMetaDeta */

  /* start getHistoryDetailById */
  getAgreementById(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.homeService
        .getAgreementById(this.historyDetails["selectedAgreement"]["id"])
        .subscribe(
          (getAgreementByIdResp) => {
            console.log("getAgreementByIdResp:", getAgreementByIdResp);
            this.historyDetails["getAgreementByIdResp"] = getAgreementByIdResp;

            resolve(true);
          },
          (error) => {
            console.log("getHistoryDetailByIdResp error...", error);
            alert("Error while getting agreement details.");
            reject();
          }
        );
    });
  }
  /* end getAgreementById */

  // start handleSaveSubmit
  handleSaveSubmit() {
    console.log("handleSaveSubmit", this.historyDetails);
    this.loaderService.show();
    this.saveHistoryById().then(
      (res) => {
        if (res) {
          this.loaderService.hide();
          console.log("saveHistoryById done....", this.historyDetails);
        }
      },
      (error) => {
        this.loaderService.hide();
        console.log("saveHistoryById error....", error);
      }
    );
  }

  // end handleSaveSubmit

  /* start saveHistoryById */
  saveHistoryById(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.homeService
        .saveHistoryById(this.historyDetails["historyId"])
        .subscribe(
          (saveHistoryByIdResp) => {
            console.log("saveHistoryByIdResp:", saveHistoryByIdResp);
            this.historyDetails["saveHistoryByIdResp"] = saveHistoryByIdResp;
            alert("Save successful!");
            window.location.reload();
            resolve(true);
          },
          (error) => {
            console.log("saveHistoryByIdResp error...", error);
            alert("Error while saveing history.");
            reject();
          }
        );
    });
  }
  /* end saveHistoryById */

  // start onDeleteClick
  onDeleteClick(selectedAgreement) {
    console.log("onDeleteClick", this.historyDetails);
    this.historyDetails["selectedAgreement"] =
      this.historyDetails["getHistoryDetailByIdResp"]["agreements"]["rows"][
        selectedAgreement - 1
      ];
    this.loaderService.show();
    this.deleteAgreementById().then(
      (res) => {
        if (res) {
          this.loaderService.hide();
          console.log("deleteAgreementById done....", this.historyDetails);
        }
      },
      (error) => {
        this.loaderService.show();
        console.log("deleteAgreementById error....", error);
      }
    );
  }
  // end onDeleteClick

  /* start deleteAgreementById */
  deleteAgreementById(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.homeService
        .deleteAgreementById(this.historyDetails["selectedAgreement"]["id"])
        .subscribe(
          (deleteAgreementByIdResp) => {
            console.log("deleteAgreementByIdResp:", deleteAgreementByIdResp);
            this.historyDetails["deleteAgreementByIdResp"] =
              deleteAgreementByIdResp;
            alert("Delete successful!");
            window.location.reload();
            resolve(true);
          },
          (error) => {
            console.log("deleteAgreementById error...", error);
            alert("Error while deleting agreement.");
            reject();
          }
        );
    });
  }
  /* end deleteAgreementById */

  // start onReplaceClick
  onReplaceClick(selectedAgreement) {
    console.log(selectedAgreement, "onReplaceClick", this.historyDetails);
    this.historyDetails["selectedAgreement"] =
      this.historyDetails["getHistoryDetailByIdResp"]["agreements"]["rows"][
        selectedAgreement - 1
      ];
  }
  // end onReplaceClick

  selectFile(event) {
    this.historyDetails.selectedFiles = [];
    this.historyDetails.fileNames = [];
    this.historyDetails.fileUrls = [];
    this.historyDetails.selectedFiles = event.target.files;
    for (let i = 0; i < this.historyDetails.selectedFiles.length; i++) {
      this.historyDetails.fileNames.push({
        file_name: this.historyDetails.selectedFiles[i].name.replace(
          /\s/g,
          "_"
        ),
      });
    }
    this.historyDetails.fileUrls = [];
    if (this.historyDetails.selectedFiles) {
      for (let file of this.historyDetails.selectedFiles) {
        let reader = new FileReader();
        reader.onload = (e: any) => {
          this.historyDetails.fileUrls.push(e.target.result);
        };
        reader.readAsDataURL(file);
      }
    }
  }

  // start handleReplace
  handleReplace() {
    $(".modal-backdrop").remove();
    $("#replaceFileModal").modal("toggle");
    const promiseList = [];
    let payload = {
      file_names: [],
    };
    this.historyDetails.fileNames.forEach((element) => {
      payload.file_names.push(element.file_name);
    });
    this.loaderService.show();
    this.homeService.getPresignedUrls(payload).subscribe(
      (getPresignedUrlsResp) => {
        this.historyDetails["getPresignedUrlsResp"] = getPresignedUrlsResp;
        for (
          let i = 0;
          i < this.historyDetails["getPresignedUrlsResp"].length;
          i++
        ) {
          let url =
            this.historyDetails["getPresignedUrlsResp"][i]["pre_signed_url"];
          let imgData = this.historyDetails.selectedFiles[i];
          promiseList.push(this.homeService.uploadData(url, imgData));
        }
        return Promise.all(promiseList)
          .then((response) => {
            console.log("uploadData resp::", response);
            this.historyDetails["uploadDataResp"] = response;
            this.uploadAgreements();
          })
          .catch(() => {
            this.loaderService.hide();

            alert("Error while processing your request. Please try later.");
            console.log("Error while uploadData...");
          });
      },
      (error) => {
        this.loaderService.hide();
        alert(
          error?.error?.message ||
            "Error while processing your request. Please try later."
        );
        console.log("getPresignedUrls error...", error);
      }
    );
  }
  // end handleReplace

  /* start uploadAgreements */
  uploadAgreements(): Promise<any> {
    console.log("uploadAgreements:", this.historyDetails);
    return new Promise((resolve, reject) => {
      let payload = {
        file_url: this.historyDetails["getPresignedUrlsResp"][0]["get_url"],
      };
      this.homeService
        .replaceAgreement(
          this.historyDetails["selectedAgreement"]["id"],
          payload
        )
        .subscribe(
          (replaceAgreementResp) => {
            this.historyDetails["replaceAgreementResp"] = replaceAgreementResp;
            alert("Replace Successful!");
            window.location.reload();
            this.loaderService.hide();
            resolve(true);
          },
          (error) => {
            this.loaderService.hide();
            console.log("uploadAgreementsResp error...", error);
            alert(
              error?.error?.message ||
                "Error while processing your request. Please try later."
            );
            reject();
          }
        );
    });
  }

  onIdClick(selectedAgreement) {
    this.homeDetails["selectedAgreement"] =
      this.homeDetails["getHistoryResp"]["rows"][
        selectedAgreement["position"] - 1
      ]["id"];
    console.log("onIdClick", this.homeDetails);
    this.router.navigate([
      `upload-history-details/${this.homeDetails["selectedAgreement"]}`,
    ]);
  }

  createHistory(index: number, element): UserData {
    console.log("createHistory:", this.historyDetails, index, element);
    return {
      position: index + 1,
      name_of_agreement: element.name_of_agreement,
      file_name: element.file_name,
      type_of_agreement: element.type_of_agreement,
      status: element.status,
      color: this.getStatusColor(element),
    };
  }

  // start getStatusColor
  getStatusColor(details) {
    let statusColor = "#000";
    if (details?.status === "pending") {
      statusColor = "#E11E38";
    }
    if (details?.status === "completed") {
      statusColor = "#5CE11E";
    }
    if (details?.status === "file_missing") {
      statusColor = "#ffc107";
    }

    return statusColor;
  }
  // end getStatusColor

  getFinalName(name) {
    if (name) {
      name = name.replace(".csv", "");
      return `( ${name} )`;
    } else {
      return "";
    }
  }
}
export interface UserData {
  position: number;
  name_of_agreement: string;
  file_name: string;
  type_of_agreement: string;
  status: string;
  color: string;
}

// todo need to call API on pagination

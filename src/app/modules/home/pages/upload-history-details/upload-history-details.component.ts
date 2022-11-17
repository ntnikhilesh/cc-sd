import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { HomeService } from "../../home.service";
declare var $: any;
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
  /* end getHistoryDetailById */

  onEditClick(selectedAgreement) {
    console.log("onEditClick", this.historyDetails);
    this.historyDetails["selectedAgreement"] = selectedAgreement;
    this.historyDetails["getAgreementByIdResp"] = {};
    this.getAgreementById().then(
      (res) => {
        if (res) {
          console.log("getAgreementById done....", this.historyDetails);
        }
      },
      (error) => {
        console.log("getAgreementById error....", error);
      }
    );
  }

  onBackClick() {
    this.router.navigate([""]);
  }

  handleSubmit() {
    console.log("handleSubmit...", this.historyDetails);
    this.updateMetaDeta().then(
      (res) => {
        if (res) {
          console.log("updateMetaDeta done....", this.historyDetails);
        }
      },
      (error) => {
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
    this.saveHistoryById().then(
      (res) => {
        if (res) {
          console.log("saveHistoryById done....", this.historyDetails);
        }
      },
      (error) => {
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
    this.historyDetails["selectedAgreement"] = selectedAgreement;
    this.deleteAgreementById().then(
      (res) => {
        if (res) {
          console.log("deleteAgreementById done....", this.historyDetails);
        }
      },
      (error) => {
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
    console.log("onReplaceClick", this.historyDetails);
    this.historyDetails["selectedAgreement"] = selectedAgreement;
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
    const promiseList = [];
    let payload = {
      file_names: [],
    };
    this.historyDetails.fileNames.forEach((element) => {
      payload.file_names.push(element.file_name);
    });
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
            $("#replaceFileModal").modal("toggle");
            alert("Error while processing your request. Please try later.");
            console.log("Error while uploadData...");
          });
      },
      (error) => {
        $("#replaceFileModal").modal("toggle");
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
            $("#replaceFileModal").modal("toggle");
            alert("Replace Successful!");
            window.location.reload();
            resolve(true);
          },
          (error) => {
            console.log("uploadAgreementsResp error...", error);
            $("#replaceFileModal").modal("toggle");
            alert(
              error?.error?.message ||
                "Error while processing your request. Please try later."
            );
            reject();
          }
        );
    });
  }
  /* end uploadAgreements */
}

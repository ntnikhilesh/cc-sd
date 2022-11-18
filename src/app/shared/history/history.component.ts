import { Component, OnInit, ViewChild, Inject, LOCALE_ID } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { MatSort } from "@angular/material/sort";
import { Router } from "@angular/router";
import { HomeService } from "../../modules/home/home.service";
import { LoaderService } from "../../modules/loader/loader.service";
import { formatDate } from "@angular/common";

@Component({
  selector: "app-history",
  templateUrl: "./history.component.html",
  styleUrls: ["./history.component.scss"],
})
export class HistoryComponent implements OnInit {
  displayedColumns = [
    "position",
    "csv_file_name",
    "createdAt",
    "uploaded_by",
    "status",
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
    @Inject(LOCALE_ID) private locale: string
  ) {}
  // }
  ngOnInit(): void {
    this.homeDetails["paginationDetails"] = {
      pageIndex: 0,
      length: 0,
      pageSize: 5,
      pageSizeOptions: [5, 10, 25, 50, 100],
    };
    this.homeDetails["filterDetails"] = {
      options: [
        {
          label: "Last 7 days",
          value: 7,
        },
        {
          label: "Last 1 month",
          value: 30,
        },
      ],
      selectedOption: 0,
    };

    this.applyFilter(true, 0);
  }

  /* start getHistory */
  getHistory(): Promise<any> {
    this.users = [];
    console.log("getHistory:", this.homeDetails);
    const { pageIndex, pageSize } = this.homeDetails["paginationDetails"];
    return new Promise((resolve, reject) => {
      this.homeService
        .getHistory(
          pageIndex + 1,
          pageSize,
          this.homeDetails["finalStartDate"],
          this.homeDetails["finalEndDate"]
        )
        .subscribe(
          (getHistoryResp) => {
            if (getHistoryResp["count"] === 0) {
              getHistoryResp = this.homeService.historyDetails;
            }
            console.log("getHistoryResp:", getHistoryResp);
            this.homeDetails["getHistoryResp"] = getHistoryResp;
            for (
              let i = 0;
              i < this.homeDetails["getHistoryResp"]["rows"].length;
              i++
            ) {
              this.users.push(
                this.createHistory(
                  i,
                  this.homeDetails["getHistoryResp"]["rows"][i]
                )
              );
            }
            // Assign the data to the data source for the table to render
            this.dataSource = new MatTableDataSource(this.users);

            this.homeDetails["paginationDetails"]["length"] =
              this.homeDetails["getHistoryResp"].count;
            console.log("final users", this.users, this.dataSource);
            resolve(true);
          },
          (error) => {
            console.log("getHistory error...", error);
            reject();
          }
        );
    });
  }
  /* end getHistory */

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
    console.log("createHistory:", this.homeDetails, index, element);
    return {
      position:
        this.homeDetails["paginationDetails"]["pageSize"] *
          this.homeDetails["paginationDetails"]["pageIndex"] +
        index +
        1,
      csv_file_name: element.csv_file_name,
      createdAt: element.createdAt,
      uploaded_by: element.uploaded_by,
      status: element.status,
      completed_agreements_count: element.completed_agreements_count,
      pending_agreements_count: element.pending_agreements_count,
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
    return statusColor;
  }
  // end getStatusColor

  onPaginateChange(data) {
    console.log("onPaginateChange::", data);
    this.homeDetails["paginationDetails"]["pageIndex"] = data?.pageIndex;
    this.homeDetails["paginationDetails"]["pageSize"] = data?.pageSize;

    this.loaderService.show();
    this.getHistory().then(
      (res) => {
        if (res) {
          this.loaderService.hide();
          console.log("getHistory done....", this.homeDetails);
        }
      },
      (error) => {
        this.loaderService.hide();
        console.log("getHistory error....", error);
      }
    );
  }

  // start applyFilter
  applyFilter(isFirstLoad, index) {
    this.homeDetails["selectedFilter"] =
      this.homeDetails["filterDetails"]["options"][index];
    console.log("applyFilter:", this.homeDetails);
    let startDate = new Date();
    let endDate = new Date();
    endDate.setDate(
      endDate.getDate() - this.homeDetails["selectedFilter"]["value"]
    );
    this.homeDetails["finalStartDate"] = formatDate(
      endDate,
      "yyyy-dd-MM",
      this.locale
    );
    this.homeDetails["finalEndDate"] = formatDate(
      startDate,
      "yyyy-dd-MM",
      this.locale
    );
    console.log("final date:", this.homeDetails);
    this.loaderService.show();
    this.getHistory().then(
      (res) => {
        if (res) {
          this.loaderService.hide();
          if (isFirstLoad) {
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          }
          console.log("getHistory done....", this.homeDetails);
        }
      },
      (error) => {
        this.loaderService.hide();
        console.log("getHistory error....", error);
      }
    );
  }
  // end applyFilter
}
export interface UserData {
  position: number;
  csv_file_name: string;
  createdAt: string;
  uploaded_by: string;
  status: string;
  completed_agreements_count: string;
  pending_agreements_count: string;
  color: string;
}

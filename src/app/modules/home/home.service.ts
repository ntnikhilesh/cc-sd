import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
const baseURL = "https://signdesk.herokuapp.com";

@Injectable({
  providedIn: "root",
})
export class HomeService {
  constructor(private httpclient: HttpClient) {}

  // start getHistory
  getHistory(page, size, start_date, end_date) {
    const apiUrl = `${baseURL}/history?page=${page}&size=${size}&start_date=${start_date}&end_date=${end_date}`;
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      Accept: "application/json",
    });
    return this.httpclient.get(apiUrl, { headers });
  }
  // end getHistory

  // start getAgreementById
  getAgreementById(id) {
    const apiUrl = `${baseURL}/agreements/${id}`;
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      Accept: "application/json",
    });
    return this.httpclient.get(apiUrl, { headers });
  }
  // end getAgreementById

  // start deleteAgreementById
  deleteAgreementById(id) {
    const apiUrl = `${baseURL}/agreements/${id}`;
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      Accept: "application/json",
    });
    return this.httpclient.delete(apiUrl, { headers });
  }
  // end deleteAgreementById

  // start saveHistoryById
  saveHistoryById(id) {
    const apiUrl = `${baseURL}/history/${id}/save`;
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      Accept: "application/json",
    });
    return this.httpclient.put(apiUrl, {}, { headers });
  }
  // end saveHistoryById

  // start getHistoryDetailById
  getHistoryDetailById(id) {
    const apiUrl = `${baseURL}/agreements?history_id=${id}`;
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      Accept: "application/json",
    });
    return this.httpclient.get(apiUrl, { headers });
  }
  // end getHistoryDetailById

  // start getPresignedUrls
  getPresignedUrls(payload) {
    const apiUrl = `${baseURL}/agreements/presigned-urls`;
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      Accept: "application/json",
    });
    return this.httpclient.post(apiUrl, payload, { headers });
  }
  // end getPresignedUrls

  // start updateMetaDeta
  updateMetaDeta(id, payload) {
    const apiUrl = `${baseURL}/agreements/${id}`;
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      Accept: "application/json",
    });
    return this.httpclient.put(apiUrl, payload, { headers });
  }
  // end updateMetaDeta

  // start uploadData
  uploadData(url, imgData) {
    console.log("uploadData::", url, imgData);
    return this.httpclient.put(url, imgData).toPromise();
  }
  // end uploadData

  // start uploadAgreements
  uploadAgreements(payload) {
    const apiUrl = `${baseURL}/agreements/upload-csv`;
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      Accept: "application/json",
    });
    return this.httpclient.post(apiUrl, payload, { headers });
  }
  // end uploadAgreements

  // start replaceAgreement
  replaceAgreement(id, payload) {
    const apiUrl = `${baseURL}/agreements/${id}/file`;
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      Accept: "application/json",
    });
    return this.httpclient.put(apiUrl, payload, { headers });
  }
  // end replaceAgreement

  // todo need to remove hardcode resp

  historyDetails = {
    count: 6,
    rows: [
      {
        _id: "63777902fe00d8290c03251f",
        csv_file_name: "agreements15001csv.csv",
        csv_file_url:
          "https://lambdainputbucket.s3.amazonaws.com/files/organisation_10/1668774144168_agreements15001csv.csv",
        total_number_of_files: 2,
        status: "pending",
        uploaded_by: 100,
        number_of_agreements: 2,
        number_of_files_uploaded: 2,
        agreements: ["63777902fe00d8290c03251d", "63777902fe00d8290c03251e"],
        createdAt: "2022-11-18T12:22:26.545Z",
        id: "63777902fe00d8290c03251f",
        completed_agreements_count: 1,
        pending_agreements_count: 1,
      },
      {
        _id: "637778effe00d8290c03251a",
        csv_file_name: "agreements15001csv.csv",
        csv_file_url:
          "https://lambdainputbucket.s3.amazonaws.com/files/organisation_10/1668774125018_agreements15001csv.csv",
        total_number_of_files: 2,
        status: "pending",
        uploaded_by: 100,
        number_of_agreements: 2,
        number_of_files_uploaded: 2,
        agreements: ["637778effe00d8290c032518", "637778effe00d8290c032519"],
        createdAt: "2022-11-18T12:22:07.476Z",
        id: "637778effe00d8290c03251a",
        completed_agreements_count: 1,
        pending_agreements_count: 1,
      },
      {
        _id: "637778ddfe00d8290c032515",
        csv_file_name: "agreements15001csv.csv",
        csv_file_url:
          "https://lambdainputbucket.s3.amazonaws.com/files/organisation_10/1668774106651_agreements15001csv.csv",
        total_number_of_files: 2,
        status: "pending",
        uploaded_by: 100,
        number_of_agreements: 2,
        number_of_files_uploaded: 1,
        agreements: ["637778dcfe00d8290c032513", "637778dcfe00d8290c032514"],
        createdAt: "2022-11-18T12:21:49.048Z",
        id: "637778ddfe00d8290c032515",
        completed_agreements_count: 1,
        pending_agreements_count: 1,
      },
      {
        _id: "637778c5fe00d8290c032510",
        csv_file_name: "agreements15001csv.csv",
        csv_file_url:
          "https://lambdainputbucket.s3.amazonaws.com/files/organisation_10/1668774083114_agreements15001csv.csv",
        total_number_of_files: 2,
        status: "pending",
        uploaded_by: 100,
        number_of_agreements: 2,
        number_of_files_uploaded: 1,
        agreements: ["637778c5fe00d8290c03250e", "637778c5fe00d8290c03250f"],
        createdAt: "2022-11-18T12:21:25.498Z",
        id: "637778c5fe00d8290c032510",
        completed_agreements_count: 1,
        pending_agreements_count: 1,
      },
      {
        _id: "637778b1fe00d8290c03250b",
        csv_file_name: "agreements15001csv.csv",
        csv_file_url:
          "https://lambdainputbucket.s3.amazonaws.com/files/organisation_10/1668774063307_agreements15001csv.csv",
        total_number_of_files: 2,
        status: "pending",
        uploaded_by: 100,
        number_of_agreements: 2,
        number_of_files_uploaded: 1,
        agreements: ["637778b1fe00d8290c032509", "637778b1fe00d8290c03250a"],
        createdAt: "2022-11-18T12:21:05.677Z",
        id: "637778b1fe00d8290c03250b",
        completed_agreements_count: 1,
        pending_agreements_count: 1,
      },
    ],
  };
}

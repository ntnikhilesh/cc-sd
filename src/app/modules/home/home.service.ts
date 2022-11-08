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
  getHistory() {
    const apiUrl = `${baseURL}/history?page=1&size=100`;
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
}

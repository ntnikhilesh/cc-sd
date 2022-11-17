import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HomeService } from '../../home.service';
import { LoaderService } from '../../../loader/loader.service'
declare var $: any;
@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss'],
})
export class UploadComponent implements OnInit {
  uploadDetails: any = {};
  constructor(private homeService: HomeService, private router: Router, private loaderService: LoaderService) {}

  ngOnInit(): void {}

  selectFile(event) {
    this.uploadDetails.selectedFiles = [];
    this.uploadDetails.fileNames = [];
    this.uploadDetails.fileUrls = [];
    this.uploadDetails.selectedFiles = event.target.files;
    for (let i = 0; i < this.uploadDetails.selectedFiles.length; i++) {
      this.uploadDetails.fileNames.push({
        file_name: this.uploadDetails.selectedFiles[i].name.replace(/\s/g, '_'),
      });
    }
    this.uploadDetails.fileUrls = [];
    if (this.uploadDetails.selectedFiles) {
      for (let file of this.uploadDetails.selectedFiles) {
        let reader = new FileReader();
        reader.onload = (e: any) => {
          this.uploadDetails.fileUrls.push(e.target.result);
        };
        reader.readAsDataURL(file);
      }
    }
  }

  handleUpload() {
    $('.modal-backdrop').remove();
    $('#bulkUploadModal').modal('toggle');
    const promiseList = [];
    let payload = {
      file_names: [],
    };
    this.uploadDetails.fileNames.forEach((element) => {
      payload.file_names.push(element.file_name);
    });
    this.loaderService.show();
    this.homeService.getPresignedUrls(payload).subscribe(
      (getPresignedUrlsResp) => {
        this.uploadDetails['getPresignedUrlsResp'] = getPresignedUrlsResp;
        for (
          let i = 0;
          i < this.uploadDetails['getPresignedUrlsResp'].length;
          i++
        ) {
          let url =
            this.uploadDetails['getPresignedUrlsResp'][i]['pre_signed_url'];
          let imgData = this.uploadDetails.selectedFiles[i];
          promiseList.push(this.homeService.uploadData(url, imgData));
        }
        return Promise.all(promiseList)
          .then((response) => {
            console.log('uploadData resp::', response);
            this.uploadDetails['uploadDataResp'] = response;
            this.uploadAgreements();
          })
          .catch(() => {
            this.loaderService.hide();
            alert('Error while processing your request. Please try later.');
            console.log('Error while uploadData...');
          });
      },
      (error) => {
        this.loaderService.hide();
        alert(
          error?.error?.message ||
            'Error while processing your request. Please try later.'
        );
        console.log('getPresignedUrls error...', error);
      }
    );
  }

  /* start uploadAgreements */
  uploadAgreements(): Promise<any> {
    return new Promise((resolve, reject) => {
      let payload = this.getFinalAgreementPayload();
      this.homeService.uploadAgreements(payload).subscribe(
        (uploadAgreementsResp) => {
          this.uploadDetails['uploadAgreementsResp'] = uploadAgreementsResp;
          alert('Upload Successful!')
          this.router.navigate([`upload-history-details/${uploadAgreementsResp['history']['id']}`])
          this.loaderService.hide();
          resolve(true);
        },
        (error) => {
          this.loaderService.hide();
          console.log('uploadAgreementsResp error...', error);
          alert(
            error?.error?.message ||
              'Error while processing your request. Please try later.'
          );
          reject();
        }
      );
    });
  }
  /* end uploadAgreements */

  getFinalAgreementPayload() {
    let payload = {
      pdf_file_urls: [],
      csv_file_url: '',
    };
    this.uploadDetails.getPresignedUrlsResp.forEach((element) => {
      if (element.content_type === 'application/pdf') {
        payload.pdf_file_urls.push(element.get_url);
      }
      if (element.content_type === 'text/csv') {
        payload.csv_file_url = element.get_url;
      }
    });
    return payload;
  }
}

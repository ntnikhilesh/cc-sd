// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-history',
//   templateUrl: './history.component.html',
//   styleUrls: ['./history.component.scss']
// })
// export class HistoryComponent implements OnInit {

//   constructor() { }

//   ngOnInit(): void {
//   }

// }


import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HomeService } from '../../modules/home/home.service';
@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {
  homeDetails: any = {};
  constructor(private homeService: HomeService, private router: Router) {}

  ngOnInit(): void {
    this.getHistory().then(
      (res) => {
        if (res) {
          console.log('getHistory done....', this.homeDetails);
        }
      },
      (error) => {
        console.log('getHistory error....', error);
      }
    );
  }

  /* start getHistory */
  getHistory(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.homeService.getHistory().subscribe(
        (getHistoryResp) => {
          console.log('getHistoryResp:', getHistoryResp);
          this.homeDetails['getHistoryResp'] = getHistoryResp;
          resolve(true);
        },
        (error) => {
          console.log('getHistory error...', error);
          reject();
        }
      );
    });
  }
  /* end getHistory */

  onIdClick(selectedAgreement){
    this.homeDetails['selectedAgreement'] = selectedAgreement;
    console.log('onIdClick', this.homeDetails);
    this.router.navigate([`upload-history-details/${selectedAgreement}`])
  }
}

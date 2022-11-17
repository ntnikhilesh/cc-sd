import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, pipe } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LoaderService } from './loader.service';
@Injectable({
  providedIn: 'root'
})
export class LoaderInterceptorService implements HttpInterceptor {
  loaderCount = 0;
  constructor(private loaderService: LoaderService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    console.log("LoaderInterceptorService req",req)
    if(this.isWhiteListURL(req)){
      // don't show loader
    }else{
      this.showLoader();
    }

    return next.handle(req).pipe(tap((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        console.log("HttpResponse event:",event);
        if(this.isWhiteListURL(req)){
          // don't hide loader
        }else{
          this.onEnd();
        }
      }
    },
      (err: any) => {
        if(this.isWhiteListURL(req)){
          // don't hide loader
        }else{
          this.loaderCount = 1;
          this.onEnd();
        }

      }));
  }

  // start is isWhiteListURL
  private isWhiteListURL(req){
    let status = false;
    if(req.url.indexOf("/flashMessage") > -1 || req.url.indexOf("catalogues?isGoogleMapped=false&q") > -1 || req.url.indexOf("search?requestId") > -1 || req.url.indexOf("maps.googleapis.com/maps/api/place/autocomplete") > -1 || req.url.indexOf("hotels/v1/search/params") > -1){
      status = true;
    }
    console.log("whiteListURL:",status);
    return status;
  }
  // end isWhiteListURL

  private onEnd(): void {
    this.hideLoader();
  }

  private showLoader(): void {
    this.loaderCount++;
    console.log("show loader",this.loaderCount);

    this.loaderService.show();
  }

  private hideLoader(): void {
    this.loaderCount--;
    console.log("hide loader",this.loaderCount);
    if(this.loaderCount === 0){
      this.loaderService.hide();
    }
  }


}
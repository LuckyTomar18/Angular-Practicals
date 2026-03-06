import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class HttpServiceService {

  constructor(private httpClient: HttpClient, private router: Router) { }

  post(endpoint: any, formData: any, callback: any) {
    this.httpClient.post(endpoint, formData, { withCredentials: true }).subscribe((response) => {
      callback(response);
    }, (error) => {
      console.error('Error in http post:', error);
      if (error.status == 401) {
        localStorage.clear();
        this.router.navigateByUrl('/login?message=your session has been expired, please login again');
      }
    });
  }

  get(endpoint: any, callback: any) {
    this.httpClient.get(endpoint, { withCredentials: true }).subscribe((response) => {
      callback(response);
    }, (error) => {
      console.error('Error in http get:', error);
      if (error.status == 401) {
        localStorage.clear();
        this.router.navigateByUrl('/login?message=your session has been expired, please login again');
      }
    });
  }
}
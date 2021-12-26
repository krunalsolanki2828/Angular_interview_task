import { Injectable } from '@angular/core';
import {  HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

import { Title } from '@angular/platform-browser';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {

  startClearDateValue = new Subject<any>();

  endClearDateValue = new Subject<any>();

  constructor(private titleService: Title, private toastr: ToastrService) {}

  setTitle(title: string = 'Home', main: string = '| Task ') {
    this.titleService.setTitle(`${title} ${main}`);
  }

  _getHeaders() {
    var token = this.getToken();
    return new HttpHeaders({
      'X-Authentication-token': token ? token : 'unAuth',
    });
  }

  getToken() {
    return localStorage.getItem('X-Authentication-token');
  }

  showAlert(type: string, title: string, message: string) {
    if (type == 'success') {
      this.toastr.success(message, title);
    } else if (type == 'error') {
      this.toastr.error(message, title);
    }
  }
}

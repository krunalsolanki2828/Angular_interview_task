import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import * as moment from 'moment';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  @Output() newListEvent: any = new EventEmitter<{ key: string; value: any }>();
  startDateTime: any;
  endDateTime: any;
  lists: Array<any> = [];

  constructor(private dataService: DataService) {}

  ngOnInit(): void {}

  createList(list: any) {
    if (list.value.description == '') {
      this.dataService.showAlert('error', 'Error', 'Please enter Description');
      return;
    }
    if (list.value.project == '') {
      this.dataService.showAlert('error', 'Error', 'Please Select Project');
      return;
    }

    if (this.startDateTime == undefined) {
      this.dataService.showAlert(
        'error',
        'Error',
        'Please Select Date and Time'
      );
      return;
    }



    var now = moment(this.startDateTime);
    var end = moment(this.endDateTime);
    var duration = moment.duration(end.diff(now));
    var hours = duration.asHours();

    const isYesterDay = moment(this.startDateTime).isSame(moment().subtract(1,'day'),'days')

    const daysCount:any = hours > 24 ? (hours / 24) : 0;
    const hoursCount:any = hours > 24 ? hours - (24 * parseInt(daysCount)) : hours;

    const dayDuration:any =  daysCount > 0 ? `${parseInt(daysCount)} ${parseInt(daysCount) > 1 ? 'Days' : 'Day'}`: ``;
    const hourDuration:any =  parseInt(hoursCount) > 0 ? `${parseInt(hoursCount)} ${parseInt(hoursCount) > 1 ? 'Hours' : 'Hour'}`: ``;

    var params = {
      ...list.value,
      _id: Math.random().toString(16).slice(2),
      startDateTime: this.startDateTime,
      endDateTime: this.endDateTime,
      days : `${dayDuration} ${hourDuration} `,
      isYesterDay
    };

   
    this.lists = JSON.parse(localStorage.getItem('list') || '[]');
    
    this.lists.push(params);
    localStorage.setItem('list', JSON.stringify(this.lists));
    this.newListEvent.next({ key: 'list', value: this.lists });
    this.dataService.startClearDateValue.next(this.startDateTime);
    this.dataService.endClearDateValue.next(this.endDateTime);
    this.dataService.showAlert('success', 'success', 'List successfully added');

    list.reset();
  }

  datePicker(date: any) {
    this.startDateTime = date;
  }

  endDatePicker(date: any) {
    this.endDateTime = date;
  }
}

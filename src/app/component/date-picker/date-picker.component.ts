import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.css'],
})
export class DatePickerComponent implements OnInit {
  todayDate:any
  @Output() newStartDateEvent = new EventEmitter<any>();
  @Output() newEndDateEvent = new EventEmitter<any>();
  @ViewChild("value") dateInput!: ElementRef;
  @ViewChild("value2") dateInput2!: ElementRef;


  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.startClearDateValue.subscribe((message) => {
      if(message){
        this.dateInput.nativeElement.value = "";
        

      }
      console.log(message,'message');
    });
    this.dataService.endClearDateValue.subscribe((message) => {
      if(message){
        this.dateInput2.nativeElement.value = "";
        

      }
      console.log(message,'message');
    });
  }

  getTimePicker(date: any) {
    this.todayDate = date

    console.log(date)
    this.newStartDateEvent.emit(date);
  }


  getEndTimePicker(date:any){
    if(new Date(this.todayDate) < new Date(date)) {
      this.newEndDateEvent.emit(date);

    }else{
      this.dataService.showAlert('error','error','Please Select Future Date')
      this.dateInput2.nativeElement.value = "";
    }

  }
}

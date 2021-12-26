import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  lists: Array<any> = [];
  activeTab: any = false;
  updateDropdownList:any = false

  getList: any;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.lists = JSON.parse(localStorage.getItem('list') || '[]');
  }

  loadList(data: any) {
    this.lists = data.value;
  }

  onDelete(list: any) {
    const oldRecord = localStorage.getItem('list');
    if (oldRecord !== null) {
      const userList = JSON.parse(oldRecord);
      userList.splice(
        userList.findIndex((a: any) => list._id == a._id),
        1
      );
      console.log(userList, 'sefdsfdsfsdfdsfsf');
      localStorage.setItem('list', JSON.stringify(userList));
      this.lists = userList;
      this.dataService.showAlert(
        'success',
        'Suceess',
        'List successfully deleted'
      );
    }
  }

  updateDescription(updateList: any, description: any) {
    this.lists.map((list:any)=>{
      if(list._id==updateList._id){
        list.description = description,
        list.project = this.updateDropdownList?this.updateDropdownList:list.project
      }
    }) 
    localStorage.setItem('list', JSON.stringify(this.lists));
    this.activeTab = false;

    console.log(description);
  }

  dropdownList(list:any){
    this.updateDropdownList = list
    console.log(list)
  

  }
}

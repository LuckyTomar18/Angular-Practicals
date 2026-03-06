import { Component, OnInit } from '@angular/core';
import { HttpServiceService } from '../http-service.service';
import { Router } from '@angular/router'; 
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  form: any = {
    list: [],
    searchParam: {},
    pageNo: 0,
    deleteParams: [],
    roleList:[]
  }

  constructor(private httpService: HttpServiceService, private router: Router) { }

  ngOnInit(): void {
    this.search();
      this.preload();

  }
  preload() {
    let self = this;
    this.httpService.get('http://localhost:8080/user/preload', function (res: any) {
      self.form.roleList = res.result.roleList;
    })
  }
  previous() {
    this.form.pageNo--
    this.search();
  }
  next() {
    this.form.pageNo++
    this.search();
  }
  onCheckboxChange(userId: any) {
    this.form.deleteParams.id = userId;
    console.log('ids ====== ', this.form.deleteParams.id);
  }
  delete() {
    console.log('delete user id  ====== ', this.form.deleteParams.id)
    var self = this
    this.httpService.get('http://localhost:8080/user/delete/' + this.form.deleteParams.id, function (response: any) {
      if (response.success && response.result.message) {
        self.form.message = response.result.message;
      }
      self.search();
    }


    )
  }
  search() {
    let self = this;
    this.httpService.post('http://localhost:8080/user/search/' + this.form.pageNo, this.form.searchParam, function (response: any) {
      console.log('response ====== ', response)

      if (response.success) {
        self.form.list = response.result.data;
        console.log('user list ====== ', self.form.list)
      }
    })

  }
  edit(path: any) { 
    console.log('path ====== ', path) 
    this.router.navigateByUrl(path);
  }
}

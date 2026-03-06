import { Component, OnInit } from '@angular/core';
import { HttpServiceService } from '../http-service.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.css']
})
export class RoleListComponent {

  form: any = {
    list: [],
    searchParam: {},
    pageNo: 0
  }

  constructor(private httpService: HttpServiceService, private router: Router) { }

  ngOnInit(): void {
    this.search();

  }
  previous() {
    this.form.pageNo--
    this.search();
  }

  next() {
    this.form.pageNo++
    this.search();
  }
  search() {
    let self = this;
    this.httpService.post('http://localhost:8080/role/search/' + this.form.pageNo, this.form.searchParam, function (response: any) {
      console.log('response ====== ', response)

      if (response.success) {
        self.form.list = response.result.data;
        console.log('role list ====== ', self.form.list)
      }
    })
  }

  edit(path: string) {
    console.log('path ====== ', path)
    this.router.navigateByUrl(path);
  }

}

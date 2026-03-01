import { Component, OnInit } from '@angular/core';
import { HttpServiceService } from '../http-service.service'; 
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  form: any = {
    list: [],
    searchParam: {},
    pageNo: 0
  }

  constructor(private httpService: HttpServiceService) { }

  ngOnInit(): void {
   this.search();

  }
  search() {
    let self = this;
     this.httpService.post('http://localhost:8080/user/search/' + this.form.pageNo, this.form.searchParam, function (response: any) {
      console.log('response ====== ', response)

      if(response.success) {
        self.form.list = response.result.data;
         console.log('user list ====== ', self.form.list)
      }
    })

}
}

import { Component , OnInit} from '@angular/core';
import { HttpServiceService } from '../http-service.service';
@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.css']
})
export class RoleListComponent {

  form : any = {
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
     this.httpService.post('http://localhost:8080/role/search/' + this.form.pageNo, this.form.searchParam, function (response: any) {
      console.log('response ====== ', response)

      if(response.success) {
        self.form.list = response.result.data;
         console.log('role list ====== ', self.form.list)
      }
    })    
}
}

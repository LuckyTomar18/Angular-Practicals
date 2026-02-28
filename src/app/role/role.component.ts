import { Component } from '@angular/core';
import { HttpServiceService } from '../http-service.service'; 
@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']
})
export class RoleComponent {

  constructor(private httpService: HttpServiceService) { }

  endpoint = 'http://localhost:8080/role/save';

  form: any = {
    data: {},
    message: '',
    inputerror: {}
    
  }

 save() {
    let self = this;
    console.log('form data== ', this.form.data);
    this.httpService.post(this.endpoint, this.form.data, function (response: any) {
      console.log('response ====== ', response)

      if (!response.success && response.result.inputerror) {
        self.form.inputerror = response.result.inputerror;
      }

      if (!response.success && response.result.message) {
        self.form.message = response.result.message;
      }

      if (response.success) {
        self.form.message = response.result.message;
      }
    })
  }

}

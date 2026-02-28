import { Component } from '@angular/core';
import { HttpServiceService } from '../http-service.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {

  endpoint = 'http://localhost:8080/user/save';

  constructor(private httpService: HttpServiceService) { }

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
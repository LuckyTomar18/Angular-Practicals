import { Component , OnInit} from '@angular/core';
import { HttpServiceService } from '../http-service.service'; 
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']
})
export class RoleComponent {

  constructor(private httpService: HttpServiceService , private route: ActivatedRoute) {
this.route.params.subscribe((pathVariable: any) => {
  this.form.data.id = pathVariable['id'];
})
   }

  endpoint = 'http://localhost:8080/role/save';

  form: any = {
    data: {},
    message: '',
    inputerror: {}
    
  }
  ngOnInit(): void {
    if (this.form.data.id && this.form.data.id > 0) {
      this.display();
    }
}

  display() {
    var self = this;
    this.httpService.get('http://localhost:8080/role/get/' + this.form.data.id, function (res: any) {
      self.form.data = res.result.data;
    })
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

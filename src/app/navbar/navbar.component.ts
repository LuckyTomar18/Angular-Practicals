import { Component } from '@angular/core';
import{ Router } from '@angular/router';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
constructor(private router: Router) { }

form:any = {  
data: {}
}
 isLogin() {

    let check = localStorage.getItem('firstName');

    if (check != null && check != undefined && check != '' && check != 'null') {
      this.form.data.firstName = check;
      this.form.data.roleName = localStorage.getItem('roleName');
      return true;
    } else {
      return false;
    }
  }

  logout() {
    localStorage.clear();
    this.router.navigateByUrl('/login')
  }

}
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { RoleComponent } from './role/role.component';
import { UserListComponent } from './user/user-list.component';
import { RoleListComponent } from './role/role-list.component';

const routes: Routes = [
  {
    path : '',
pathMatch : 'full',
redirectTo : 'welcome'
},
{
  path : 'welcome',
  component : WelcomeComponent

},
{
  path : 'signup',
  component : SignupComponent

},
{
  path : 'login',
  component : LoginComponent

},
{
  path : 'user',
  component : UserComponent

},
{
  path : 'role',
  component : RoleComponent

},
{
  path : 'userList',
  component : UserListComponent
}, 
{
path: 'roleList',
component: RoleListComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

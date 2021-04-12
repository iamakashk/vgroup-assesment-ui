import { UserInputListComponent } from './user-input-list/user-input-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserFormComponent } from './user-form/user-form.component';
import { LoginComponent } from './login/login.component';
import { AuthGaurdService } from './services/auth-gaurd.service';
import { LogoutComponent } from './logout/logout.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGaurdService],
  },
  {
    path: 'user-inputs',
    component: UserInputListComponent,
    canActivate: [AuthGaurdService],
  },
  {
    path: 'form',
    component: UserFormComponent,
    canActivate: [AuthGaurdService],
  },
  {
    path: '',
    component: LoginComponent,
  },
  { path: 'login', component: LoginComponent },
  {
    path: 'logout',
    component: LogoutComponent,
    canActivate: [AuthGaurdService],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

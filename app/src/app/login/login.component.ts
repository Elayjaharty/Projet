import { Component, Inject } from '@angular/core';
import { AuthentificationService, log } from '../_service/authentification.service';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  login: log = {
    email: '',
    mpd: '',
    dir: null
  }
  
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialogRef: MatDialogRef <LoginComponent>,private auth: AuthentificationService, private router: Router) {}


  OnLogin() {
    if (this.data.direction == 'DGA') {
      this.login.dir = 1;
    } else {
      if (this.data.direction == 'DGE') {
        this.login.dir = 2;
      } else {
        if (this.data.direction == 'DGPA') {
          this.login.dir = 3;
        }
      }
    }
    console.log(this.login.dir);
    
    this.auth.login(this.login).subscribe(
      (data) => {
        console.log(data);
        this.dialogRef.close('vous êtes bien connecté.');
        localStorage.setItem('direction', this.data.direction);
        this.router.navigateByUrl(this.data.direction);
      },
      err => {
        console.log(err.status);
        console.log(err.error);
        console.error(err);
      }
    )
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthGuard } from '../auth.guard';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private authGuard: AuthGuard, // Add the AuthGuard as a dependency
    private toastr: ToastrService
    ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      adminEmail: ['', Validators.required],
      adminPassword: ['', Validators.required]
    });
  }

  onSubmit() {
    console.log(this.form.value);
    this.http.post('http://localhost:9000/kitchen/login', this.form.value).subscribe(
      (response) => {
        console.log(response);
        this.toastr.success('Login Successful');
        this.authGuard.isLoggedIn = true; // Update the isLoggedIn property in the AuthGuard
        this.goToDashboard();
        this.form.reset();
      }
      ,
      (error) => {
        console.log(error);
        this.toastr.error('Login Failed');
        this.form.reset();
      }
    );
  }

  goToDashboard() {
    this.router.navigate(['/kitchen/dashboard']);
  }
  goToHome(){
    this.router.navigate([''])
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthGuard } from '../customer/customer.auth';
@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private auth:AuthGuard
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      id: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]]
    });
  }

  get idControl():any {
    return this.form.get('id');
  }

  goToCustomer() {
    if (this.form.valid) {
      this.auth.isDetailSubmit=true
      this.toastr.success('Welcome to the restaurant');
      this.router.navigate([`customer/detail`], { queryParams: { id: this.idControl.value } });
    } else {
      this.form.markAllAsTouched();
    }
  }

  goToKitchen() {
    this.router.navigate(['kitchen/login']);
  }
}

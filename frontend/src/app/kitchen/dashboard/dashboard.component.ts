import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthGuard } from '../auth.guard';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  allCustomers!: any;
  constructor(
    private http: HttpClient,
    private router: Router,
    private authGuard: AuthGuard
    ) {}

  ngOnInit() {

    // Get all customers
    this.http
      .get('http://localhost:9000/kitchen/home')
      .subscribe((response) => {
        this.allCustomers = response;
      });


  }

  onOrder(tableID:any){
    const id:number = tableID
    console.log(id)
    this.router.navigate(['/kitchen/order'], { queryParams: { id: id } });
  }
  goToEditMenu(){
    this.router.navigate(['/kitchen/menu']);
  }
  logout()
  {
    this.authGuard.isLoggedIn=false
    this.router.navigate(['/kitchen/login'])
  }
}

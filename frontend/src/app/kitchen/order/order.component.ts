import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute , Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
})
export class OrderComponent {
  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router,
    private toastr: ToastrService
  ) {}
  id!: number;
  previewData!: any;
  selectedStatus: string = 'Pending';

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.id = +params['id'];
    });
    this.http
      .get(`http://localhost:9000/customer/preview/tableNo=${this.id}`)
      .subscribe(
        (response) => {
          this.previewData = response;
          console.log('response data', this.previewData);
        },
        (error) => {
          console.log(error);
        }
        );
      }

      updateStatus() {
        // Method to update the orderStatus when the dropdown selection changes
        this.previewData.orderStatus = this.selectedStatus;
        console.log(this.previewData.orderStatus)
        console.log(this.previewData.tableID)
        this.http
          .post(`http://localhost:9000/kitchen/orderstatus/${this.previewData.tableID}`, this.previewData)
          .subscribe(
            (response) => {
              this.toastr.success('Order status updated successfully');
              console.log('response data', response);
            },
            (error) => {
              console.log("Error")
              console.log(error);
            }
          );
      }
      goToBack(){
        this.router.navigate(['/kitchen/dashboard'])
      }
      completeOrder(tableID:any){
        console.log(tableID)
        this.http
        .delete(`http://localhost:9000/customer/delete/tableNo=${this.id}`)
        .subscribe(
          (response) => {
            this.toastr.success('Order Completed Successfully and table is free now');
            console.log('response data', response);
            this.router.navigate([`/kitchen/dashboard/`]);
        },
        (error) => {
          console.log(error);
        }
      );

  }
}

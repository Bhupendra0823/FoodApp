import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
interface PreviewData {
  _id: {
    $oid: string;
  };
  tableID: number;
  name: string;
  email: string;
  mobile: number;
  desireOrder: OrderItem[];
  createdAt: {
    $date: string;
  };
  updatedAt: {
    $date: string;
  };
  __v: number;
}

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.css'],
})
export class PreviewComponent {
  id!: number;
  totalItem!: number;
  totalAmount!: number;

  previewData!: PreviewData;

  roundOff!: number;
  grandTotal!: number;
  grandTotalAfterRoundOff!: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.id = +params['id'];
    });
    this.http
      .get(`http://localhost:9000/customer/preview/tableNo=${this.id}`)
      .subscribe(
        (response) => {
          this.previewData = response as PreviewData;
          console.log('response data', this.previewData);
          this.totalQuantity();
        },
        (error) => {
          console.log(error);
        }
      );
  }
  goToEditMenu() {
    this.toastr.info('Re-Order Your Food');
    this.router.navigate(['/customer/menu'], {
      queryParams: { id: this.id },
    });
  }
  deleteCancel() {
    this.http
      .delete(`http://localhost:9000/customer/delete/tableNo=${this.id}`)
      .subscribe(
        (response) => {
          console.log('response data', response);
          this.toastr.warning('Order Cancelled');
          this.router.navigate(['']);
        },
        (error) => {
          console.log(error);
        }
      );
    this.router.navigate([`/customer/welcome/${this.id}`]);
  }
  confirmOrder() {
    this.toastr.success('Order Saved Successfully');
    this.http.post(`http://localhost:9000/customer/sendMail/${this.id}`,{
      food:this.previewData.desireOrder
    })
    .subscribe(
      (response)=>{
        console.log(response)
      },
      (error)=>{
        console.log(error)
      }
    )
    this.router.navigate([`/customer/thank-you/`], {
      queryParams: { id: this.id },
    });

  }
  totalQuantity() {
    let total = 0;
    let totalAmount = 0;
    for (let i = 0; i < this.previewData.desireOrder.length; i++) {
      total += this.previewData.desireOrder[i].quantity;
      totalAmount +=
        this.previewData.desireOrder[i].quantity *
        this.previewData.desireOrder[i].price;
    }
    this.totalItem = total;
    this.totalAmount = totalAmount;
    this.grandTotal = totalAmount + totalAmount * 0.025 * 2;
    this.grandTotalAfterRoundOff = Math.round(this.grandTotal);
    this.roundOff = this.grandTotalAfterRoundOff - this.grandTotal;
  }
}

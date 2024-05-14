import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { interval, Subscription } from 'rxjs';
import { takeWhile } from 'rxjs/operators';
//rxjs is a library that is the implementation of observable type as we can see the changes in the stream
@Component({
  selector: 'app-thank-you',
  templateUrl: './thank-you.component.html',
  styleUrls: ['./thank-you.component.css'],
})
export class ThankYouComponent implements OnDestroy {
  id!: number;
  previewData!: any;
  customerName!: string;
  orderStatus: string = 'Pending';
  private alive: boolean = true;
  private refreshSubscription: Subscription = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.id = +params['id'];
    });
    this.loadData();
    // Call the refreshData method every 2 seconds
    this.refreshSubscription = interval(2000)
      .pipe(takeWhile(() => this.alive))
      .subscribe(() => this.loadData());
  }

  loadData() {
    this.http
      .get(`http://localhost:9000/customer/preview/tableNo=${this.id}`)
      .subscribe(
        (response) => {
          this.previewData = response;
          console.log('response data', this.previewData);
          this.customerName = this.previewData.name;
          this.orderStatus = this.previewData.orderStatus;
        },
        (error) => {
          console.log(error);
        }
      );
  }

  ngOnDestroy() {
    this.alive = false;
    if (this.refreshSubscription) {
      this.refreshSubscription.unsubscribe();
    }
  }
}

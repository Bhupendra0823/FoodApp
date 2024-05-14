import { Component, OnInit, } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
interface MenuItem {
  id: number;
  name: string;
  category: string;
  price: number;
  available: boolean;
  quantity: number;
}
interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

interface Category {
  name: string;
  items: MenuItem[];
}

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  id!: number;
  categories: Category[] = [];
  orderSummary: OrderItem[] = [];

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
      .get<MenuItem[]>(`http://localhost:9000/customer/menu/tableNo=${this.id}`)
      .subscribe(
        (response) => {
          this.categories = this.classifyItemsByCategory(response);
        },
        (error) => {
          console.log(error);
        }
      );
  }

  classifyItemsByCategory(items: MenuItem[]): Category[] {
    const categories: Category[] = [];

    items.forEach((item) => {
      const categoryIndex = categories.findIndex(
        (category) => category.name === item.category
      );

      if (categoryIndex > -1) {
        categories[categoryIndex].items.push(item);
      } else {
        const newCategory: Category = {
          name: item.category,
          items: [item],
        };
        categories.push(newCategory);
      }
    });

    return categories;
  }

  increaseQuantity(item: MenuItem) {
    if (item.available) {
      if (!item.quantity) {
        item.quantity = 0; // Initialize quantity to 0 if undefined or null
      }
      item.quantity++;
    }
  }

  decreaseQuantity(item: MenuItem) {
    if (item.available && item.quantity > 0) {
      item.quantity--;
    }
  }

  isItemDisabled(item: MenuItem) {
    return !item.available;
  }

  selectItemWithQuantMoreThanOne(): MenuItem[] {
    const selectedItems: MenuItem[] = [];

    this.categories.forEach((category) => {
      category.items.forEach((item) => {
        if (item.quantity > 0) {
          selectedItems.push(item);
        }
      });
    });
    return selectedItems;
  }

  orderArray: OrderItem[] = [];
  saveOrderToDB(savedOrder: OrderItem[]) {
    console.log('Order Array in save to DB: ', savedOrder);
    console.log('save order to db');
    this.http
      .post(
        `http://localhost:9000/customer/menu/tableNo=${this.id}`,
        savedOrder
      )
      .subscribe(
        (response) => {
          console.log(response);
          this.toastr.success('Order Bill Generated Successfully');
          this.goToPreview();
        },
        (error) => {
          console.log(error);
        }
      );
  }


  submitOrder() {
    var selectedItems: MenuItem[] = [];

    selectedItems = this.selectItemWithQuantMoreThanOne();

    const itemsWithQuantityGreaterThanOne = selectedItems.filter(
      (item) => item.quantity > 0
    );
    console.log(itemsWithQuantityGreaterThanOne);
    const orderArray: OrderItem[] = [];
    itemsWithQuantityGreaterThanOne.forEach((item) => {
      orderArray.push({
        name: item.name,
        quantity: item.quantity,
        price: item.price,
      });
    });
    console.log('Order created', orderArray);
    if (orderArray.length > 0) {
      this.saveOrderToDB(orderArray);
    } else {
      this.toastr.error('Choose Any Item First');
    }
  }
  goToPreview() {
    this.router.navigate(['/customer/preview'], {
      queryParams: { id: this.id },
    });
  }
  selectedItem() {
    var selectedItems: MenuItem[] = [];

    selectedItems = this.selectItemWithQuantMoreThanOne();

    const itemsWithQuantityGreaterThanOne = selectedItems.filter(
      (item) => item.quantity > 0
    );
    console.log(itemsWithQuantityGreaterThanOne);
    this.orderSummary = [];
    itemsWithQuantityGreaterThanOne.forEach((item) => {
      this.orderSummary.push({
        name: item.name,
        quantity: item.quantity,
        price: item.price,
      });
    });
    console.log('Order Summary', this.orderSummary);

  }
}

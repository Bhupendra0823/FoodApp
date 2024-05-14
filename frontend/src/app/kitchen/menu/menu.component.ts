import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  form!: FormGroup;
  allMenu!: any;
  selectedItem: any; // New property to hold the selected menu item
  updateOrAddNew: string = 'Add Item';

  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private route: Router,
    private toastr: ToastrService,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      category: ['', Validators.required],
      available: ['', Validators.required],
    });

    this.fetchMenu();
  }
  openModal(content: any) {
    const modalRef = this.modalService.open(content, {
      backdrop: 'static',
      keyboard: false,
    });
  }
  addItem() {
    this.updateOrAddNew = 'Add Item';
    this.resetForm();
  }
  fetchMenu() {
    this.http.get('http://localhost:9000/kitchen/getmenu').subscribe(
      (response) => {
        this.allMenu = response;
        console.log(this.allMenu);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  updateMenu(menu: any) {
    this.toastr.info('Update the menu item.');
    this.updateOrAddNew = 'Update Item';
    // Set the selected menu item and populate the form
    this.selectedItem = menu;
    this.form.patchValue({
      name: menu.name,
      price: menu.price,
      category: menu.category,
      available: menu.available,
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  deleteFoodItem(foodID: any) {
    this.http
      .delete(`http://localhost:9000/kitchen/delete/${foodID}`)
      .subscribe(
        (response) => {
          console.log('Item Deleted');
          this.toastr.warning('Menu item deleted successfully.');
          console.log(response);
          this.fetchMenu();
        },
        (error) => {
          console.log(error);
        }
      );
  }

  onSubmit() {
    // Perform API request to update the selected menu item
    if (this.selectedItem) {
      const updateEndpoint = `http://localhost:9000/kitchen/update/${this.selectedItem._id}`;
      const updatePayload = {
        name: this.form.value.name,
        price: this.form.value.price,
        category: this.form.value.category,
        available: this.form.value.available,
      };

      this.http.patch(updateEndpoint, updatePayload).subscribe(
        (response) => {
          console.log('Menu item updated successfully.');
          this.toastr.success('Menu item updated successfully.');
          this.fetchMenu(); // Fetch the updated menu items
          this.resetForm(); // Reset the form
        },
        (error) => {

          console.log('Error updating menu item:', error);
        }
      );
    }
    else{
      if (this.form.invalid) {
        this.toastr.error('Error in adding menu item.');
        return;
      }
      this.http.post("http://localhost:9000/kitchen/addmenu/",{
          name :this.form.value.name,
          price:this.form.value.price,
          category:this.form.value.category,
          available:this.form.value.available
      })
      .subscribe(
        (response)=>{
          console.log(response)

          console.log("Item Added Successfully")
          this.toastr.success('Menu item added successfully.');
          this.fetchMenu(); // Fetch the updated menu items
          this.resetForm();
        },
        (error)=>{
          console.log(error)
        }
      )
    }
  }
  goToDashboard() {
    this.route.navigate(['/kitchen/dashboard']);
  }
  resetForm() {
    this.updateOrAddNew = 'Add Item';
    this.form.reset();
    this.selectedItem = null;
  }
}

import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from 'src/app/models/product';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent implements OnInit {

  productId: number;
  productFormGroup?: FormGroup;
  submitted: boolean = false;
  constructor(private productService: ProductsService, private fb: FormBuilder, private activatedRoute: ActivatedRoute) {
    this.productId = this.activatedRoute.snapshot.params.id;
  }

  ngOnInit(): void {
    this.productService.getProduct(this.productId).subscribe(
      product => {

        this.productFormGroup = this.fb.group({
          id: [product.id],
          name: [product.name, Validators.required],
          price: [product.price, Validators.required],
          quantity: [product.quantity, Validators.required],
          selected: [product.selected, Validators.required],
          available: [product.available, Validators.required],
        });
      }
    );
  }

  onUpdate() {
    this.submitted = true;


    this.productService.updateProduct(this.productFormGroup?.value).subscribe(
      data => {
        alert("success!");
      }
    )
  }
}

import { Component, OnInit } from '@angular/core';
import { Observable ,of } from 'rxjs';
import { catchError , map,startWith } from 'rxjs/operators';
import {Product} from 'src/app/models/product';
import { ProductsService } from 'src/app/services/products.service';
import { AppDataState } from 'src/app/state/product.state';
import { DataStateEnum } from 'src/app/state/product.state';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})

export class ProductsComponent implements OnInit {
  products$?:Observable<AppDataState<Product[]>>;
  readonly DataStateEnum = DataStateEnum;
  constructor(private productService: ProductsService, private router:Router) { }

  ngOnInit(): void {
  }

  onGetAllProducts(){
    this.products$ = this.productService.getAllProducts().pipe(
      map(data=>({dataState : DataStateEnum.LOADED, data: data})),
      startWith({dataState: DataStateEnum.LOADING}),
      catchError(err =>of({dataState:DataStateEnum.ERROR, errorMessage:err.message}))
    
    )
  }

  onGetSelectedProducts(){
    this.products$ = this.productService.getSelectedProducts().pipe(
      map(data=>({dataState : DataStateEnum.LOADED, data: data})),
      startWith({dataState: DataStateEnum.LOADING}),
      catchError(err =>of({dataState:DataStateEnum.ERROR, errorMessage:err.message})),
    
    )
  }
  onGetAvailableProducts(){
    this.products$ = this.productService.getAvailableProducts().pipe(
      map(data=>({dataState : DataStateEnum.LOADED, data: data})),
      startWith({dataState: DataStateEnum.LOADING}),
      catchError(err =>of({dataState:DataStateEnum.ERROR, errorMessage:err.message})),
    
    )
  }

  onSearch(dataForm: any){
    this.products$ = this.productService.searchProducts(dataForm.keyword).pipe(
      map(data=>({dataState : DataStateEnum.LOADED, data: data})),
      startWith({dataState: DataStateEnum.LOADING}),
      catchError(err =>of({dataState:DataStateEnum.ERROR, errorMessage:err.message})),
    
    )}
  
  

onSelect(p:Product){
this.productService.select(p)
.subscribe(data=>{
  p.selected =data.selected;
});

}

onDelete(p:Product){
  this.productService.delete(p)
  .subscribe(data=>{
    this.onGetAllProducts;
  });
  
  }

  onNewProduct(){
    this.router.navigateByUrl("/newProduct");
  }

  onEdit(p:Product){
    this.router.navigateByUrl("/editProduct/"+p.id);
  }
}
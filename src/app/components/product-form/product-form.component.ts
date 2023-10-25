import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { IProduct } from 'src/app/interfaces/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent {
  productForm = this.formBuilder.group({
    name: [''],
    image: [''],
    price: [0],
    description: [''],
    quantity: [0]
  })
  product!: IProduct;
  mode: "create" | "update" = "create";
  constructor(private router: ActivatedRoute, private formBuilder: FormBuilder, private productService: ProductService){
    
  }
  async ngOnInit(){
    const { id } = this.router.snapshot.params;
    if(id){
      this.product = await lastValueFrom(this.productService.getProductsById(+id))
      this.productForm.patchValue(this.product);
      this.mode = "update";
    }    
  }
  async onSubmit(){
    try {
      if(this.mode === "create"){
        await lastValueFrom(this.productService.addProduct(this.productForm.value as IProduct))
        alert("Bạn đã thêm thành công")
      }else{
        await lastValueFrom(this.productService.updateProduct({...this.product, ...this.productForm.value} as IProduct))
        alert("Cập nhật thành công")
      }
    } catch (error: any) {
      console.log(error.message);
      
    }
  }
}

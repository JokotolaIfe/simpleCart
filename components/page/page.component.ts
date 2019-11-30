import { Component, OnInit } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit {
someone: any;
carts: any;
totalQuantity: any;
productItem: any;
total: 0;

  constructor(
    public afa: AngularFireAuth,
    public afs: AngularFirestore,
    ) { }

  ngOnInit() {
    this.afa.authState.subscribe(ref => {
      this.someone =ref;
      console.log(this.someone)
      this.getAllCarts().valueChanges().subscribe(ref=>{
        this.carts = ref;
        console.log(this.carts)
      })

      // this.ps.getCustomer(this.someone.uid).valueChanges().subscribe((ref)=>{
      //     console.log(ref)
      //     this.person = ref;
      //     })

      this.getAllCarts().valueChanges().subscribe((ref)=>{
        this.carts = ref
        this.totalQuantity = 0;

        this.carts.forEach((item: any) => {
          this.productItem = item

        // Get the total qty of a product added 
          this.totalQuantity += Number(this.productItem.quantity);

         // Get the total price of all products in carts i.e Product price x quantity
          this.total += Number(this.productItem.price)
          console.log(this.total)
         

              })
      
          })

      });
  }

  getAllCarts(){
    return this.afs.collection('carts')
  }


  removeItem(id){
   this.afs.collection('carts').doc(id).delete()
  }


  checkout(){
    
  }
}

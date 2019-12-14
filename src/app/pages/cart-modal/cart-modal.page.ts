import { Product, CartService } from './../../services/cart.service';
import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';

@Component({
    selector: 'app-cart-modal',
    templateUrl: './cart-modal.page.html',
    styleUrls: ['./cart-modal.page.scss'],
})
export class CartModalPage implements OnInit {
    cart: Product[] = [];

    constructor(
        private cartService: CartService,
        private modalCtrl: ModalController,
        private alertCtrl: AlertController
    ) { }

    ngOnInit() {
        this.cart = this.cartService.getCart();
    }

    decreaseCartItem(product)
    {
        this.cartService.decreaseProduct(product);
    }

    increaseCartItem(product)
    {
        this.cartService.addProduct(product);
    }

    removeCartItem(product)
    {
        this.cartService.removeProduct(product);
    }

    getTotal()
    {
        return this.cart.reduce((i, j) => i + j.price * j.price, 0);
    }

    close()
    {
        this.modalCtrl.dismiss();
    }

    async checkout()
    {
        // perform Paypal or Stripe checkout process

        let alert = await this.alertCtrl.create({
            header: 'Thanks for your order!',
            message: 'We will deliver your food as soon as possible',
            buttons: ['OK']
        });
        alert.present().then(() => {
            this.modalCtrl.dismiss();
        });
    }

}

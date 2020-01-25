import { Component, OnInit } from '@angular/core';
import { Item } from '../../entities/item.entity';
import { ProductService } from '../../services/product.service';
import { CardService } from '../../services/card.service';
import { Order } from 'src/app/entities/order.entity';
import { State } from 'src/app/entities/state.entity';

@Component({
	templateUrl: 'index.component.html',
	styleUrls: ['./cart.component.css']

})


export class CartComponent implements OnInit {

	private items: Item[] = [];
	private total: number = 0;
	private _userName: string;
	private _userEmail: string;
	private _userPhone: string;

	get userName(): string {
		return this._userName;
	}
	set userName(value: string) {
		this._userName = value;
	}
	get userEmail(): string {
		return this._userEmail;
	}
	set userEmail(value: string) {
		this._userEmail = value;
	}
	get userPhone(): string {
		return this._userPhone;
	}
	set userPhone(value: string) {
		this._userPhone = value;
	}
	constructor(
		private productService: ProductService,
		private cardService: CardService
	) {
	}

	ngOnInit() {
		this.loadCart();
	}
	changeAmount(id, factor) {
		if (id) {

			let cart: any = JSON.parse(localStorage.getItem('cart'));
			let index: number = -1;
			for (var i = 0; i < cart.length; i++) {
				let item: Item = JSON.parse(cart[i]);
				if (item.product._id == id) {
					index = i;
					break;
				}
			}
			{
				let item: Item = JSON.parse(cart[index]);
				item.amount += factor;
				if (item.amount < 1) {
					this.remove(id);
					return;
				}
				cart[index] = JSON.stringify(item);
				localStorage.setItem("cart", JSON.stringify(cart));
			}
			this.loadCart();
		}
	}

	loadCart(): void {
		this.total = 0;
		this.items = [];
		let cart = JSON.parse(localStorage.getItem('cart'));
		for (var i = 0; i < cart.length; i++) {
			let item = JSON.parse(cart[i]);
			this.items.push({
				product: item.product,
				amount: item.amount
			});
			this.total += item.product.price * item.amount;
		}
	}

	remove(id: string): void {
		let cart: any = JSON.parse(localStorage.getItem('cart'));
		let index: number = -1;
		for (var i = 0; i < cart.length; i++) {
			let item: Item = JSON.parse(cart[i]);
			if (item.product._id == id) {
				cart.splice(i, 1);
				break;
			}
		}
		localStorage.setItem("cart", JSON.stringify(cart));
		this.loadCart();
	}
	commitOrder() {
		let order = new Order();
		order.userEmail = this.userEmail;
		order.userName = this.userName;
		order.userPhone = this.userPhone;
		order.state = new State();
		order.state.name = 'uncommitted';
		order.products = this.items;
		let msg = this.validateForm();
		if (msg == "")
			{
				this.cardService.addOrder(order).subscribe();
				alert("Zamówiono");
			}
			else
			alert(msg);
		console.log("test");
	}

	validateForm(): string {
		let index = 0;
		let msg = "";
		if (this.userName == "" || this.userName == undefined) {
			index = index + 1;
			msg += index + ". User name field is empty\n";
		}
		if (!this.validateEmail(this.userEmail)) {
			index = index + 1;
			msg += index + ". Email is not correct\n";
		}
		var phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{3})$/;
		if (this.userPhone == undefined)
			this.userPhone = "";
		if (!this.userPhone.match(phoneno)) {
			index = index + 1;
			msg += index + ". Phone number is not correct\n";
		}
		if (!(this.items.length > 0)) {
			index = index + 1;
			msg += index + ". You haven't selected anything to buy\n";
		}
		return msg;
	}

	validateEmail(email) {
		var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(email);
	}
}

import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { Order } from 'src/app/entities/order.entity';
import { CategoryService } from '../../services/category.service';
import { StateService } from '../../services/state.service';
import { Category } from 'src/app/entities/category.entity';
import { State } from 'src/app/entities/state.entity';

@Component({
	templateUrl: 'index.component.html',
	styleUrls: ['./cart.component.css']
})


export class CartComponent implements OnInit {

	private orders: Order[] = [];
	private filteredOrders: Order[] = [];
	private total: number = 0;
	private categories: Category[];
	private states: State[];
	selectedState: State;

	constructor(
		private orderService: OrderService,
		private categoryService: CategoryService,
		private stateService: StateService

	) {
	}

	onConfirm(order: any) {
		
		this.orderService.updateOrder(order).subscribe(
			error => {
				if(error != undefined){
					order.loadedState = order.state;
					return console.log(error)
				}
			});
		order.isValid = false;
	}

	onChangeObj(order: any) {
			
				let date = new Date();
				order.date = date.toString().substr(4,11);
		order.isValid = true;
	}
	onChangeState() {
		this.filteredOrders = this.orders.filter(p => p.state.name == this.selectedState.name);
		
	}
	ngOnInit() {
		this.stateService.findAll().subscribe(
			cat => {
				this.states = cat;
			}
		);

		this.orderService.findAll().subscribe(
			ord => {
				this.orders = ord;

				this.orders.forEach(p => {
					let total = 0;

					p.products.forEach(q => total += q.product.price * q.amount);
					p.loadedState = p.state;
					p.total = total;
				});
			}
		);
	}

}

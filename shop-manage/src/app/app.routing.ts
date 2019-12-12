
import { Routes, RouterModule } from '@angular/router';

import { CartComponent } from './components/cart/cart.component';
import { ProductComponent } from './components/product/product.component';
import { ModifyProductComponent } from './components/modifyProduct/modifyProduct.component';

const routes: Routes = [
	{ path: '', component: ProductComponent },
	{ path: 'products', component: ProductComponent },
	{ path: 'cart', component: CartComponent },
	{ path: 'modify/:id', component: ModifyProductComponent },
	{ path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(routes);
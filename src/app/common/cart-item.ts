import { Product } from "./product";

export class CartItem {

    id: number = 0;
    name: string = "";
    imageUrl: string = "";
    unitPrice: number = 0;
    quantity: number = 0;

    constructor(private theProduct: Product) {
        this.id = theProduct.id;
        this.name = theProduct.name;
        this.imageUrl = theProduct.imageUrl;
        this.unitPrice = theProduct.unitPrice;
        this.quantity = 1;
    }
}

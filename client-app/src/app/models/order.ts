export interface Order {
    id: string;
    shippingAddress: string;
    orderDate: Date;
    orderStatus: string;
    totalAmount: number;
    customerId: string;
}
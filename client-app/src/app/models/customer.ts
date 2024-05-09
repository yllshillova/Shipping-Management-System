import { ShippingAddress } from "./shippingAddress"

export interface Customer {
    id: string;
    name: string;
    email: string;
    phone: string;
    shippingAddress: ShippingAddress;
}
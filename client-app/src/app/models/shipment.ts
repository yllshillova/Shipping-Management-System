export interface Shipment {
    id: string;
    carrier: string;
    trackingNumber: string;
    shipmentStatus: string;
    orderId: string;
}
/* eslint-disable react-refresh/only-export-components */
import withAdminAuth from "../../app/HOC/withAdminManagerAuth";
import OrderForm from "./OrderForm";

function OrderInsert() {
    return (
        <OrderForm />
    );
}

export default withAdminAuth(OrderInsert);
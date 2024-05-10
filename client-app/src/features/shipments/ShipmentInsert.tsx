/* eslint-disable react-refresh/only-export-components */
import withAdminAuth from "../../app/HOC/withAdminManagerAuth";
import ShipmentForm from "./ShipmentForm";

function ShipmentInsert() {
    return (
        <ShipmentForm />
    );
}

export default withAdminAuth(ShipmentInsert);
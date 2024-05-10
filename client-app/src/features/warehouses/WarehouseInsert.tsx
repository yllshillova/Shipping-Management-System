/* eslint-disable react-refresh/only-export-components */
import withAdminAuth from "../../app/HOC/withAdminManagerAuth";
import WarehouseForm from "./WarehouseForm";

function WarehouseInsert() {
    return (
        <WarehouseForm />
    );
}

export default withAdminAuth(WarehouseInsert);
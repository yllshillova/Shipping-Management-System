/* eslint-disable react-refresh/only-export-components */
import withAdminAuth from "../../app/HOC/withAdminManagerAuth";
import CustomerForm from "./CustomerForm";

function CustomerInsert() {
    return (
        <CustomerForm />
    );
}

export default withAdminAuth(CustomerInsert);
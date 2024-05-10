/* eslint-disable react-refresh/only-export-components */
import withAdminAuth from "../../app/HOC/withAdminManagerAuth";
import ProductForm from "./ProductForm";

function ProductInsert() {
    return (
        <ProductForm />
    );
}

export default withAdminAuth(ProductInsert);
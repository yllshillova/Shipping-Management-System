/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react-hooks/rules-of-hooks */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MainLoader from "../../app/common/MainLoader";
import { TableCell, TableRow, ActionButton, OrdersTable, TableNav, TableHeader, AddButton, Table, TableHeaderCell, TableHead } from "../../app/common/styledComponents/table";
import { faEdit } from "@fortawesome/free-solid-svg-icons/faEdit";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons/faTrashAlt";
import { faAdd } from "@fortawesome/free-solid-svg-icons/faAdd";
import {  faInfo } from "@fortawesome/free-solid-svg-icons";
import { useLocation, useNavigate } from "react-router-dom";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import toastNotify from "../../app/helpers/toastNotify";
import useErrorHandler from "../../app/helpers/useErrorHandler";
import Header from "../../app/layout/Header";
import SidePanel from "../../app/layout/SidePanel";
import { useDeleteProductMutation, useGetProductsQuery } from "../../app/APIs/productApi";
import { Product } from "../../app/models/product";
import withAuth from "../../app/HOC/withAuth";
function ProductList() {
    const { data, isLoading, error } = useGetProductsQuery(null);
    const [deleteProduct] = useDeleteProductMutation();
    const navigate = useNavigate();
    const location = useLocation();
    let content;



    const handleProductDelete = async (id: string) => {
        const result = await deleteProduct(id);

        if ('data' in result) {
            toastNotify("Product Deleted Successfully", "success");
        }
        else if ('error' in result) {
            const error = result.error as FetchBaseQueryError;
            const { status } = error;

            if (status) {
                useErrorHandler(error, navigate, location.pathname);
            }
        }

    };




    if (isLoading) {
        content = <MainLoader />;
    } else if (error) {
        content = <div>{(error.data as FetchBaseQueryError)}</div>;
    }
    else {
        content = data.map((product: Product) => {
            return (
                <tbody key={product.id}>
                    <TableRow>
                        <TableCell>{product.name}</TableCell>
                        <TableCell>{product.description} </TableCell>
                        <TableCell>{product.price} </TableCell>
                        <TableCell>{product.stockLevel} </TableCell>
                        <ActionButton style={{ backgroundColor: "teal" }} onClick={() => navigate("/product/" + product.id)} >
                            <FontAwesomeIcon icon={faInfo} />
                        </ActionButton>
                        <ActionButton style={{ backgroundColor: "orange" }} onClick={() => navigate("/product/update/" + product.id)} >
                            <FontAwesomeIcon icon={faEdit} />
                        </ActionButton>
                        {/*TODO: add handler for delete*/}
                        <ActionButton style={{ backgroundColor: "red" }} onClick={() => handleProductDelete(product.id) }>
                            <FontAwesomeIcon icon={faTrashAlt} />
                        </ActionButton>
                    </TableRow>
                </tbody>
            );
        });
    }

    return (
        <>
            <Header />
            <SidePanel />
            <OrdersTable>
                <TableNav>
                    <TableHeader>Products List</TableHeader>
                    <AddButton onClick={() => navigate("/product/insert")}  >
                        <FontAwesomeIcon icon={faAdd} />
                    </AddButton>
                </TableNav>
                <Table>
                    <thead>
                        <TableHead>
                            <TableHeaderCell>Name</TableHeaderCell>
                            <TableHeaderCell>Description</TableHeaderCell>
                            <TableHeaderCell>Price</TableHeaderCell>
                            <TableHeaderCell>Stock Level</TableHeaderCell>
                            <TableHeaderCell>Actions</TableHeaderCell>
                        </TableHead>
                    </thead>
                    {content}
                </Table>
            </OrdersTable>
        </>
    );
}

export default withAuth(ProductList);
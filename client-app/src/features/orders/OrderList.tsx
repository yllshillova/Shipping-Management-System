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
import { useDeleteOrderMutation, useGetOrdersQuery } from "../../app/APIs/orderApi";
import { Order } from "../../app/models/order";
import { useGetCustomersQuery } from "../../app/APIs/customerApi";
import { Customer } from "../../app/models/customer";
import MiniLoader from "../../app/common/MiniLoader";
function OrderList() {
    const { data, isLoading, error } = useGetOrdersQuery(null);
    const { data: customers, isLoading: isCustomersLoading } = useGetCustomersQuery(null);
    const [deleteOrder] = useDeleteOrderMutation();
    const navigate = useNavigate();
    const location = useLocation();
    let content;

    const customerMap = new Map<string, string>();
    customers?.forEach((customer: Customer) => {
        customerMap.set(customer.id, customer.name);
    });

    const getCustomerName = (customerId: string) => {
        return customerMap.get(customerId) || "Customer not found!";
    };




    const handleOrderDelete = async (id: string) => {
        const result = await deleteOrder(id);

        if ('data' in result) {
            toastNotify("Order Deleted Successfully", "success");
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
        content = data.map((order: Order) => {
            return (
                <tbody key={order.id}>
                    <TableRow>
                        <TableCell>{new Date(order.orderDate).toLocaleDateString()}</TableCell>
                        <TableCell>{order.shippingAddress} </TableCell>
                        <TableCell>{isCustomersLoading ? (
                            <MiniLoader />
                        ) : getCustomerName(order.customerId)} </TableCell>
                        <TableCell>{order.orderStatus} </TableCell>
                        <TableCell>{order.totalAmount} </TableCell>
                        <ActionButton style={{ backgroundColor: "teal" }} onClick={() => navigate("/order/" + order.id)} >
                            <FontAwesomeIcon icon={faInfo} />
                        </ActionButton>
                        <ActionButton style={{ backgroundColor: "orange" }} onClick={() => navigate("/order/update/" + order.id)} >
                            <FontAwesomeIcon icon={faEdit} />
                        </ActionButton>
                        {/*TODO: add handler for delete*/}
                        <ActionButton style={{ backgroundColor: "red" }} onClick={() => handleOrderDelete(order.id) }>
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
                    <TableHeader>Orders List</TableHeader>
                    <AddButton onClick={() => navigate("/order/insert")}  >
                        <FontAwesomeIcon icon={faAdd} />
                    </AddButton>
                </TableNav>
                <Table>
                    <thead>
                        <TableHead>
                            <TableHeaderCell>Order Date</TableHeaderCell>
                            <TableHeaderCell>Shipping Address</TableHeaderCell>
                            <TableHeaderCell>Customer</TableHeaderCell>
                            <TableHeaderCell>Order Status</TableHeaderCell>
                            <TableHeaderCell>Total Amount</TableHeaderCell>
                        </TableHead>
                    </thead>
                    {content}
                </Table>
            </OrdersTable>
        </>
    );
}

export default OrderList;
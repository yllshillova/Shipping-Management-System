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
import { useDeleteCustomerMutation, useGetCustomersQuery } from "../../app/APIs/customerApi";
import { Customer } from "../../app/models/customer";
import Header from "../../app/layout/Header";
import SidePanel from "../../app/layout/SidePanel";
function CustomerList() {
    const { data, isLoading, error } = useGetCustomersQuery(null);
    const [deleteCustomer] = useDeleteCustomerMutation();
    const navigate = useNavigate();
    const location = useLocation();
    let content;



    const handleCustomerDelete = async (id: string) => {
        const result = await deleteCustomer(id);

        if ('data' in result) {
            toastNotify("Customer Deleted Successfully", "success");
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
        content = data.map((customer: Customer) => {
            return (
                <tbody key={customer.id}>
                    <TableRow>
                        <TableCell>{customer.name}</TableCell>
                        <TableCell>{customer.email} </TableCell>
                        <TableCell>{customer.phone} </TableCell>
                        <ActionButton style={{ backgroundColor: "teal" }} onClick={() => navigate("/customer/" + customer.id)} >
                            <FontAwesomeIcon icon={faInfo} />
                        </ActionButton>
                        <ActionButton style={{ backgroundColor: "orange" }} onClick={() => navigate("/customer/update/" + customer.id)} >
                            <FontAwesomeIcon icon={faEdit} />
                        </ActionButton>
                        {/*TODO: add handler for delete*/}
                        <ActionButton style={{ backgroundColor: "red" }} onClick={() => handleCustomerDelete(customer.id) }>
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
                    <TableHeader>Customers List</TableHeader>
                    <AddButton onClick={() => navigate("/customer/insert")}  >
                        <FontAwesomeIcon icon={faAdd} />
                    </AddButton>
                </TableNav>
                <Table>
                    <thead>
                        <TableHead>
                            <TableHeaderCell>Name</TableHeaderCell>
                            <TableHeaderCell>Email</TableHeaderCell>
                            <TableHeaderCell>Phone</TableHeaderCell>
                        </TableHead>
                    </thead>
                    {content}
                </Table>
            </OrdersTable>
        </>
    );
}

export default CustomerList;
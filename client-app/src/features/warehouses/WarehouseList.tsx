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
import { useDeleteWarehouseMutation, useGetWarehousesQuery } from "../../app/APIs/warehouseApi";
import { Warehouse } from "../../app/models/warehouse";
import withAuth from "../../app/HOC/withAdminManagerAuth";
function WarehouseList() {
    const { data, isLoading, error } = useGetWarehousesQuery(null);
    const [deleteWarehouse] = useDeleteWarehouseMutation();
    const navigate = useNavigate();
    const location = useLocation();
    let content;



    const handleWarehouseDelete = async (id: string) => {
        const result = await deleteWarehouse(id);

        if ('data' in result) {
            toastNotify("Warehouse Deleted Successfully", "success");
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
        content = data.map((warehouse: Warehouse) => {
            return (
                <tbody key={warehouse.id}>
                    <TableRow>
                        <TableCell>{warehouse.name}</TableCell>
                        <TableCell>{warehouse.location} </TableCell>
                        <TableCell>{new Date(warehouse.createdAt).toLocaleDateString()} </TableCell>
                        <TableCell>{new Date(warehouse.updatedAt).toLocaleDateString()} </TableCell>
                        <ActionButton style={{ backgroundColor: "teal" }} onClick={() => navigate("/warehouse/" + warehouse.id)} >
                            <FontAwesomeIcon icon={faInfo} />
                        </ActionButton>
                        <ActionButton style={{ backgroundColor: "orange" }} onClick={() => navigate("/warehouse/update/" + warehouse.id)} >
                            <FontAwesomeIcon icon={faEdit} />
                        </ActionButton>
                        {/*TODO: add handler for delete*/}
                        <ActionButton style={{ backgroundColor: "red" }} onClick={() => handleWarehouseDelete(warehouse.id) }>
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
                    <TableHeader>Warehouses List</TableHeader>
                    <AddButton onClick={() => navigate("/warehouse/insert")}  >
                        <FontAwesomeIcon icon={faAdd} />
                    </AddButton>
                </TableNav>
                <Table>
                    <thead>
                        <TableHead>
                            <TableHeaderCell>Name</TableHeaderCell>
                            <TableHeaderCell>Location</TableHeaderCell>
                            <TableHeaderCell>Created At</TableHeaderCell>
                            <TableHeaderCell>Updated At</TableHeaderCell>
                            <TableHeaderCell>Actions</TableHeaderCell>
                        </TableHead>
                    </thead>
                    {content}
                </Table>
            </OrdersTable>
        </>
    );
}

export default withAuth(WarehouseList);
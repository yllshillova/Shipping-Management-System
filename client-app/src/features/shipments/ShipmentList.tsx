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
import { useDeleteShipmentMutation, useGetShipmentsQuery } from "../../app/APIs/shipmentApi";
import { Shipment } from "../../app/models/shipment";
import withAuth from "../../app/HOC/withAuth";
function ShipmentList() {
    const { data, isLoading, error } = useGetShipmentsQuery(null);
    const [deleteShipment] = useDeleteShipmentMutation();
    const navigate = useNavigate();
    const location = useLocation();
    let content;


    const handleShipmentDelete = async (id: string) => {
        const result = await deleteShipment(id);

        if ('data' in result) {
            toastNotify("Shipment Deleted Successfully", "success");
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
        content = data.map((shipment: Shipment) => {
            return (
                <tbody key={shipment.id}>
                    <TableRow>
                        <TableCell>{shipment.trackingNumber}</TableCell>
                        <TableCell>{shipment.carrier} </TableCell>
                        <TableCell>{shipment.shipmentStatus} </TableCell>
                        <TableCell>{shipment.orderId} </TableCell>
                        <ActionButton style={{ backgroundColor: "teal" }} onClick={() => navigate("/shipment/" + shipment.id)} >
                            <FontAwesomeIcon icon={faInfo} />
                        </ActionButton>
                        <ActionButton style={{ backgroundColor: "orange" }} onClick={() => navigate("/shipment/update/" + shipment.id)} >
                            <FontAwesomeIcon icon={faEdit} />
                        </ActionButton>
                        {/*TODO: add handler for delete*/}
                        <ActionButton style={{ backgroundColor: "red" }} onClick={() => handleShipmentDelete(shipment.id) }>
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
                    <TableHeader>Shipments List</TableHeader>
                    <AddButton onClick={() => navigate("/shipment/insert")}  >
                        <FontAwesomeIcon icon={faAdd} />
                    </AddButton>
                </TableNav>
                <Table>
                    <thead>
                        <TableHead>
                            <TableHeaderCell>Tracking Number</TableHeaderCell>
                            <TableHeaderCell>Carrier</TableHeaderCell>
                            <TableHeaderCell>Status</TableHeaderCell>
                            <TableHeaderCell>Order ID</TableHeaderCell>
                            <TableHeaderCell>Actions</TableHeaderCell>
                        </TableHead>
                    </thead>
                    {content}
                </Table>
            </OrdersTable>
        </>
    );
}

export default withAuth(ShipmentList);
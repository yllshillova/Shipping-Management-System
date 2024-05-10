/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react-hooks/rules-of-hooks */
import { useLocation, useNavigate, useParams } from "react-router-dom";
import MainLoader from "../../app/common/MainLoader";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import useErrorHandler from "../../app/helpers/useErrorHandler";
import { Attribute, Label, LeftContainer, MainContainer, SectionTitle, Value, WrapperContainer } from "../../app/common/styledComponents/details";
import Header from "../../app/layout/Header";
import SidePanel from "../../app/layout/SidePanel";
import { useGetOrderByIdQuery } from "../../app/APIs/orderApi";
import { useGetCustomerByIdQuery } from "../../app/APIs/customerApi";
import MiniLoader from "../../app/common/MiniLoader";
import { formatDate, formatDateTimeLocal } from "../../app/utility/formatDate";
import withAuth from "../../app/HOC/withAuth";

function isValidGuid(guid: string): boolean {
    const guidRegex = /^[A-Fa-f0-9]{8}-[A-Fa-f0-9]{4}-[A-Fa-f0-9]{4}-[A-Fa-f0-9]{4}-[A-Fa-f0-9]{12}$/;
    return guidRegex.test(guid);
}

function OrderDetails() {
    const { id } = useParams();
    const { data, isLoading, error, isError } = useGetOrderByIdQuery(id);
    const { data: customerData, isLoading: customerLoader, error: customerError }
        = useGetCustomerByIdQuery(data?.customerId || "");
    const navigate = useNavigate();
    const location = useLocation();

    if (!isValidGuid(id as string)) {
        navigate('/not-found');
        return;
    }
    const fbError = error as FetchBaseQueryError;

    if (isError) {
        useErrorHandler(fbError, navigate, location.pathname);
    }

    if (isLoading) return <MainLoader />;

    if (data && data.customerId) {
        const order = data;
        return (
            <>
                <Header />
                <SidePanel />
                <MainContainer>
                    <WrapperContainer>
                        <LeftContainer>
                            <SectionTitle>Details of the order</SectionTitle>
                            <Attribute>
                                <Label>Order Date</Label>
                                <Value>{formatDateTimeLocal(order.orderDate)}</Value>
                            </Attribute>
                            <Attribute>
                                <Label>Shipping Address</Label>
                                <Value>{order.shippingAddress}</Value>
                            </Attribute>
                            <Attribute>
                                <Label>Customer</Label>
                                <Value> {customerLoader ? (
                                    <MiniLoader />
                                ) : customerData ? (
                                        customerData.name
                                    ) : customerError ? (
                                    customerError.data
                                ) : (
                                    "Customer not found!"
                                )}</Value>
                            </Attribute>
                            <Attribute>
                                <Label>Order Status</Label>
                                <Value>{order.orderStatus}</Value>
                            </Attribute>
                            <Attribute>
                                <Label>Total Amount</Label>
                                <Value>{order.totalAmount}</Value>
                            </Attribute>
                            <Attribute>
                                <Label>Created At</Label>
                                <Value>{formatDate(order.createdAt)}</Value>
                            </Attribute><Attribute>
                                <Label>Updated At</Label>
                                <Value>{formatDate(order.updatedAt)}</Value>
                            </Attribute>
                        </LeftContainer>
                    </WrapperContainer>
                </MainContainer>
            </>
        );
    }
    return null;
}

export default withAuth(OrderDetails);


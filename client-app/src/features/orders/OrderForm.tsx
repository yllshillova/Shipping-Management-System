/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toastNotify from "../../app/helpers/toastNotify";
import MainLoader from "../../app/common/MainLoader";
import useErrorHandler from '../../app/helpers/useErrorHandler';
import Header from '../../app/layout/Header';
import SidePanel from '../../app/layout/SidePanel';
import { BackToButton, ButtonsContainer, Container, Form, FormContainer, FormGroup, Input, Label, OuterContainer, Select, SubmitButton, Title } from '../../app/common/styledComponents/upsert';
import inputHelper from '../../app/helpers/inputHelper';
import { Order } from '../../app/models/order';
import { useCreateOrderMutation, useUpdateOrderMutation } from '../../app/APIs/orderApi';
import { validDate } from '../../app/utility/validDate';
import { useGetCustomersQuery } from '../../app/APIs/customerApi';
import { Customer } from '../../app/models/customer';


interface OrderFormProps {
    id?: string;
    data?: Order;
}

const orderData: Order = {
    id: "",
    orderDate: new Date(),
    shippingAddress: "",
    customerId: "",
    orderStatus: "",
    totalAmount: 0
};

function OrderForm({ id, data }: OrderFormProps) {
    const [orderInputs, setOrderInputs] = useState<Order>(data || orderData);
    const [createOrder] = useCreateOrderMutation();
    const [updateOrder] = useUpdateOrderMutation();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [errorMessages, setErrorMessages] = useState<string[]>([]);

    const { data: customersData, isLoading: customersLoading, error: customersError } = useGetCustomersQuery(null);

    const handleOrderInput = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
        const tempData = inputHelper(e, orderInputs);
        setOrderInputs(tempData);
    };


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        setLoading(true);
        setErrorMessages([]);

        const formData = new FormData();

        formData.append("OrderDate", new Date(orderInputs.orderDate!).toLocaleString());
        formData.append("ShippingAddress", orderInputs.shippingAddress);
        formData.append("CustomerId", orderInputs.customerId);
        formData.append("OrderStatus", orderInputs.orderStatus);
        formData.append("TotalAmount", orderInputs.totalAmount.toString());
        const currentLocation = window.location.pathname;

        if (id) {
            formData.append("Id", id);
            const response = await updateOrder({ data: formData, id });

            if (response.error) {
                useErrorHandler(response.error, navigate, currentLocation, setErrorMessages);
            } else {
                toastNotify("Order updated successfully", "success");
                navigate('/orders');
            }
        } else {
            const response = await createOrder(formData);

            if (response.error) {
                // Use error handler
                useErrorHandler(response.error, navigate, currentLocation, setErrorMessages);
            } else {
                toastNotify("Order created successfully", "success");
                navigate('/orders');
            }
        }

        setLoading(false);
    };


    return (
        <>
            <Header />
            <SidePanel />
            <OuterContainer>
                <Container>
                    <FormContainer >
                        {loading && <MainLoader />}
                        <Title>
                            {id ? "Edit Order" : "Add Order"}
                        </Title>

                        {/* Display error messages */}
                        {errorMessages.length > 0 && (
                            <div style={{ color: 'red' }}>
                                <ul>
                                    {errorMessages.map((error, index) => (
                                        <li key={index}>{error}</li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        <Form
                            method="post"
                            encType="multipart/form-data"
                            onSubmit={handleSubmit}
                        >
                            <FormGroup>
                                <Label>Order Date</Label>
                                <Input
                                    type="date"
                                    name="orderDate"
                                    value={validDate(orderInputs.orderDate)}
                                    onChange={handleOrderInput}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label>Shipping Address</Label>
                                <Input
                                    type="text"
                                    name="shippingAddress"
                                    value={orderInputs.shippingAddress}
                                    onChange={handleOrderInput}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Select
                                    name="customerId"
                                    value={orderInputs.customerId}
                                    onChange={handleOrderInput}
                                    disabled={customersLoading}
                                >
                                    <option value="">Select Customer</option>
                                    {customersData && customersData.map((customer: Customer) => (
                                        <option key={customer.id} value={customer.id}>
                                            {customer.name}
                                        </option>
                                    ))}
                                </Select>
                                {customersError && <div style={{ color: 'red' }}>Error loading customers</div>}
                            </FormGroup>
                            <FormGroup>
                                <Label>Order Status</Label>
                                <Input
                                    type="text"
                                    name="status"
                                    value={orderInputs.orderStatus}
                                    onChange={handleOrderInput}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label>Total Amount</Label>
                                <Input
                                    type="number"
                                    name="totalAmount"
                                    value={orderInputs.totalAmount}
                                    onChange={handleOrderInput}
                                />
                            </FormGroup>
                            <ButtonsContainer>
                                <SubmitButton type="submit">
                                    Submit
                                </SubmitButton>
                                <BackToButton onClick={() => navigate("/Orders")}>
                                    Back to Orders
                                </BackToButton>
                            </ButtonsContainer>
                        </Form>
                    </FormContainer>
                </Container>
            </OuterContainer>
        </>
    );
}

export default OrderForm;

/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import inputHelper from "../../app/helpers/inputHelper";
import toastNotify from "../../app/helpers/toastNotify";
import MainLoader from "../../app/common/MainLoader";
import useErrorHandler from '../../app/helpers/useErrorHandler';
import { Customer } from '../../app/models/customer';
import { ShippingAddress } from '../../app/models/shippingAddress';
import { useCreateCustomerMutation, useUpdateCustomerMutation } from '../../app/APIs/customerApi';
import Header from '../../app/layout/Header';
import SidePanel from '../../app/layout/SidePanel';
import { BackToButton, ButtonsContainer, Container, Form, FormContainer, FormGroup, Input, Label, OuterContainer, SubmitButton, Title } from '../../app/common/styledComponents/upsert';


interface CustomerFormProps {
    id?: string;
    data?: Customer;
}

const customerData: Customer = {
    id: "",
    name: "",
    email: "",
    phone: "",
    shippingAddress: {} as ShippingAddress
};

function CustomerForm({ id, data }: CustomerFormProps) {
    const [customerInputs, setCustomerInputs] = useState<Customer>(data || customerData);
    const [createCustomer] = useCreateCustomerMutation();
    const [updateCustomer] = useUpdateCustomerMutation();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [errorMessages, setErrorMessages] = useState<string[]>([]);

    const handleCustomerInput = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
        const tempData = inputHelper(e, customerInputs);
        const { name, value } = e.target;

        // Split the input name to handle nested properties
        const nameParts = name.split('.');

        if (nameParts.length > 1) {
            const [nestedProperty, property] = nameParts;

            // Update nested property
            setCustomerInputs({
                ...customerInputs,
                [nestedProperty]: {
                    ...customerInputs[nestedProperty],
                    [property]: value,
                },
            });
        } else {
            setCustomerInputs(tempData);
        }
        console.log("Entry data :",tempData);
    };



    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        setLoading(true);
        setErrorMessages([]);

        const formData = new FormData();

        formData.append("Name", customerInputs.name);
        formData.append("Email", customerInputs.email);
        formData.append("Phone", customerInputs.phone);
        formData.append("ShippingAddress_FullName", customerInputs.shippingAddress.fullName);
        formData.append("ShippingAddress_Address1", customerInputs.shippingAddress.address1);
        formData.append("ShippingAddress_Address2", customerInputs.shippingAddress.address2);
        formData.append("ShippingAddress_City", customerInputs.shippingAddress.city);
        formData.append("ShippingAddress_State", customerInputs.shippingAddress.state);
        formData.append("ShippingAddress_Zip", customerInputs.shippingAddress.zip);
        formData.append("ShippingAddress_Country", customerInputs.shippingAddress.country);
        console.log("Request data:", formData);
        const currentLocation = window.location.pathname;

        if (id) {
            formData.append("Id", id);
            const response = await updateCustomer({ data: formData, id });

            if (response.error) {
                useErrorHandler(response.error, navigate, currentLocation, setErrorMessages);
            } else {
                toastNotify("Customer updated successfully", "success");
                navigate('/customers');
            }
        } else {
            const response = await createCustomer(formData);

            if (response.error) {
                // Use error handler
                useErrorHandler(response.error, navigate, currentLocation, setErrorMessages);
            } else {
                toastNotify("Customer created successfully", "success");
                navigate('/customers');
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
                            {id ? "Edit Customer" : "Add Customer"}
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
                                <Label>Name</Label>
                                <Input
                                    type="text"
                                    name="name"
                                    value={customerInputs.name}
                                    onChange={handleCustomerInput}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label>Email</Label>
                                <Input
                                    type="text"
                                    name="email"
                                    value={customerInputs.email}
                                    onChange={handleCustomerInput}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label>Phone</Label>
                                <Input
                                    type="text"
                                    name="phone"
                                    value={customerInputs.phone}
                                    onChange={handleCustomerInput}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label>Full Name</Label>
                                <Input
                                    type="text"
                                    name="shippingAddress.fullName"
                                    value={customerInputs.shippingAddress.fullName}
                                    onChange={handleCustomerInput}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label>Address Line 1</Label>
                                <Input
                                    type="text"
                                    name="shippingAddress.address1"
                                    value={customerInputs.shippingAddress.address1}
                                    onChange={handleCustomerInput}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label>Address Line 2</Label>
                                <Input
                                    type="text"
                                    name="shippingAddress.address2"
                                    value={customerInputs.shippingAddress.address2}
                                    onChange={handleCustomerInput}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label>City</Label>
                                <Input
                                    type="text"
                                    name="shippingAddress.city"
                                    value={customerInputs.shippingAddress.city}
                                    onChange={handleCustomerInput}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label>State</Label>
                                <Input
                                    type="text"
                                    name="shippingAddress.state"
                                    value={customerInputs.shippingAddress.state}
                                    onChange={handleCustomerInput}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label>ZIP</Label>
                                <Input
                                    type="text"
                                    name="shippingAddress.zip"
                                    value={customerInputs.shippingAddress.zip}
                                    onChange={handleCustomerInput}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label>Country</Label>
                                <Input
                                    type="text"
                                    name="shippingAddress.country"
                                    value={customerInputs.shippingAddress.country}
                                    onChange={handleCustomerInput}
                                />
                            </FormGroup>
                            <ButtonsContainer>
                                <SubmitButton type="submit">
                                    Submit
                                </SubmitButton>
                                <BackToButton onClick={() => navigate("/customers")}>
                                    Back to Customers
                                </BackToButton>
                            </ButtonsContainer>
                        </Form>
                    </FormContainer>
                </Container>
            </OuterContainer>
        </>
    );
}

export default CustomerForm;

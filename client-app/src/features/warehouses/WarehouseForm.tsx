/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import inputHelper from "../../app/helpers/inputHelper";
import toastNotify from "../../app/helpers/toastNotify";
import MainLoader from "../../app/common/MainLoader";
import Header from '../../app/layout/Header';
import SidePanel from '../../app/layout/SidePanel';
import { BackToButton, ButtonsContainer, Container, Form, FormContainer, FormGroup, Input, Label, OuterContainer, SubmitButton, Title } from '../../app/common/styledComponents/upsert';
import { Warehouse } from '../../app/models/warehouse';
import { useCreateWarehouseMutation, useUpdateWarehouseMutation } from '../../app/APIs/warehouseApi';
import useErrorHandler from '../../app/helpers/useErrorHandler';


interface WarehouseFormProps {
    id?: string;
    data?: Warehouse;
}

const warehouseData: Warehouse = {
    id: "",
    name: "",
    location: "",
    createdAt: new Date(),
    updatedAt: new Date()
};

function WarehouseForm({ id, data }: WarehouseFormProps) {
    const [warehouseInputs, setWarehouseInputs] = useState<Warehouse>(data || warehouseData);
    const [createWarehouse] = useCreateWarehouseMutation();
    const [updateWarehouse] = useUpdateWarehouseMutation();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [errorMessages, setErrorMessages] = useState<string[]>([]);

    const handleWarehouseInput = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
        const tempData = inputHelper(e, warehouseInputs);
            setWarehouseInputs(tempData);
    };



    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        setLoading(true);
        setErrorMessages([]);

        const formData = new FormData();

        formData.append("Name", warehouseInputs.name);
        formData.append("Location", warehouseInputs.location);
        const currentLocation = window.location.pathname;

        if (id) {
            formData.append("Id", id);
            const response = await updateWarehouse({ data: formData, id });

            if (response.error) {
                useErrorHandler(response.error, navigate, currentLocation, setErrorMessages);
            } else {
                toastNotify("Warehouse updated successfully", "success");
                navigate('/warehouses');
            }
        } else {
            const response = await createWarehouse(formData);

            if (response.error) {
                // Use error handler
                useErrorHandler(response.error, navigate, currentLocation, setErrorMessages);
            } else {
                toastNotify("Warehouse created successfully", "success");
                navigate('/warehouses');
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
                            {id ? "Edit Warehouse" : "Add Warehouse"}
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
                                    value={warehouseInputs.name}
                                    onChange={handleWarehouseInput}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label>Location</Label>
                                <Input
                                    type="text"
                                    name="location"
                                    value={warehouseInputs.location}
                                    onChange={handleWarehouseInput}
                                />
                            </FormGroup>
                            <ButtonsContainer>
                                <SubmitButton type="submit">
                                    Submit
                                </SubmitButton>
                                <BackToButton onClick={() => navigate("/warehouses")}>
                                    Back to Warehouses
                                </BackToButton>
                            </ButtonsContainer>
                        </Form>
                    </FormContainer>
                </Container>
            </OuterContainer>
        </>
    );
}

export default WarehouseForm;

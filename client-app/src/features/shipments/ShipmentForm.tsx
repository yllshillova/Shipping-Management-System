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
import { Shipment } from '../../app/models/shipment';
import { useCreateShipmentMutation, useUpdateShipmentMutation } from '../../app/APIs/shipmentApi';
import { SD_ShipmentStatus } from '../../app/utility/SD';


interface ShipmentFormProps {
    id?: string;
    data?: Shipment;
}

const shipmentData: Shipment = {
    id: "",
    trackingNumber: "",
    carrier: "",
    shipmentStatus: "",
    orderId: ""
};

const shipmentStatuses = [SD_ShipmentStatus.Cancelled,
                            SD_ShipmentStatus.Delivered,
                            SD_ShipmentStatus.InTransit,
                            SD_ShipmentStatus.Pending,
                            SD_ShipmentStatus.Shipped];

function ShipmentForm({ id, data }: ShipmentFormProps) {
    const [shipmentInputs, setShipmentInputs] = useState<Shipment>(data || shipmentData);
    const [createShipment] = useCreateShipmentMutation();
    const [updateShipment] = useUpdateShipmentMutation();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [errorMessages, setErrorMessages] = useState<string[]>([]);

    const handleShipmentInput = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
        const tempData = inputHelper(e, shipmentInputs);
        setShipmentInputs(tempData);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        setLoading(true);
        setErrorMessages([]);

        const formData = new FormData();

        formData.append("TrackingNumber", shipmentInputs.trackingNumber);
        formData.append("Carrier", shipmentInputs.carrier);
        formData.append("ShipmentStatus", shipmentInputs.shipmentStatus);
        formData.append("OrderId", shipmentInputs.orderId);

        const currentLocation = window.location.pathname;

        if (id) {
            formData.append("Id", id);
            const response = await updateShipment({ data: formData, id });

            if (response.error) {
                useErrorHandler(response.error, navigate, currentLocation, setErrorMessages);
            } else {
                toastNotify("Shipment updated successfully", "success");
                navigate('/shipments');
            }
        } else {
            const response = await createShipment(formData);

            if (response.error) {
                // Use error handler
                useErrorHandler(response.error, navigate, currentLocation, setErrorMessages);
            } else {
                toastNotify("Shipment created successfully", "success");
                navigate('/shipments');
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
                            {id ? "Edit Shipment" : "Add Shipment"}
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
                                <Label>Tracking Number</Label>
                                <Input
                                    type="text"
                                    name="trackingNumber"
                                    value={shipmentInputs.trackingNumber}
                                    onChange={handleShipmentInput}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label>Carrier</Label>
                                <Input
                                    type="text"
                                    name="carrier"
                                    value={shipmentInputs.carrier}
                                    onChange={handleShipmentInput}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Select
                                    name="shipmentStatus"
                                    value={shipmentInputs.shipmentStatus}
                                    onChange={handleShipmentInput}
                                >
                                    <option value="">Select Status</option>
                                    {shipmentStatuses.map((shipmentStatus) => (
                                        <option key={shipmentStatus} value={shipmentStatus}>
                                            {shipmentStatus}
                                        </option>
                                    ))}
                                </Select>
                            </FormGroup>
                            <FormGroup>
                                <Label>OrderId</Label>
                                <Input
                                    type="string"
                                    name="orderId"
                                    value={shipmentInputs.orderId}
                                    onChange={handleShipmentInput}
                                />
                            </FormGroup>
                            <ButtonsContainer>
                                <SubmitButton type="submit">
                                    Submit
                                </SubmitButton>
                                <BackToButton onClick={() => navigate("/shipments")}>
                                    Back to Shipments
                                </BackToButton>
                            </ButtonsContainer>
                        </Form>
                    </FormContainer>
                </Container>
            </OuterContainer>
        </>
    );
}

export default ShipmentForm;

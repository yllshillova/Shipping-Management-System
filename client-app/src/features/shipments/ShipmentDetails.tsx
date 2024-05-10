/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react-hooks/rules-of-hooks */
import { useLocation, useNavigate, useParams } from "react-router-dom";
import MainLoader from "../../app/common/MainLoader";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import useErrorHandler from "../../app/helpers/useErrorHandler";
import { Attribute, Label, LeftContainer, MainContainer, SectionTitle, Value, WrapperContainer } from "../../app/common/styledComponents/details";
import Header from "../../app/layout/Header";
import SidePanel from "../../app/layout/SidePanel";
import { useGetShipmentByIdQuery } from "../../app/APIs/shipmentApi";
import withAuth from "../../app/HOC/withAuth";
function isValidGuid(guid: string): boolean {
    const guidRegex = /^[A-Fa-f0-9]{8}-[A-Fa-f0-9]{4}-[A-Fa-f0-9]{4}-[A-Fa-f0-9]{4}-[A-Fa-f0-9]{12}$/;
    return guidRegex.test(guid);
}

function ShipmentDetails() {
    const { id } = useParams();
    const { data, isLoading, error, isError } = useGetShipmentByIdQuery(id);
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

    if (data) {
        const shipment = data;
        return (
            <>
                <Header />
                <SidePanel />
                <MainContainer>
                    <WrapperContainer>
                        <LeftContainer>
                            <SectionTitle>Details of the shipment</SectionTitle>
                            <Attribute>
                                <Label>Tracking Number</Label>
                                <Value>{shipment.trackingNumber}</Value>
                            </Attribute>
                            <Attribute>
                                <Label>Carrier</Label>
                                <Value>{shipment.carrier}</Value>
                            </Attribute>
                            <Attribute>
                                <Label>Status</Label>
                                <Value>{shipment.shipmentStatus}</Value>
                            </Attribute>
                            <Attribute>
                                <Label>Order ID</Label>
                                <Value>{shipment.orderId}</Value>
                            </Attribute>
                            <Attribute>
                                <Label>Created At</Label>
                                <Value>{shipment.createdAt}</Value>
                            </Attribute><Attribute>
                                <Label>Updated At</Label>
                                <Value>{shipment.updatedAt}</Value>
                            </Attribute>
                        </LeftContainer>
                    </WrapperContainer>

                </MainContainer>
            </>
        );
    }
    return null;
}

export default withAuth(ShipmentDetails);


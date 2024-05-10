/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react-hooks/rules-of-hooks */
import { useLocation, useNavigate, useParams } from "react-router-dom";
import MainLoader from "../../app/common/MainLoader";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import useErrorHandler from "../../app/helpers/useErrorHandler";
import { Attribute, Label, LeftContainer, MainContainer, SectionTitle, Value, WrapperContainer } from "../../app/common/styledComponents/details";
import Header from "../../app/layout/Header";
import SidePanel from "../../app/layout/SidePanel";
import { useGetWarehouseByIdQuery } from "../../app/APIs/warehouseApi";
import withAuth from "../../app/HOC/withAuth";

function isValidGuid(guid: string): boolean {
    const guidRegex = /^[A-Fa-f0-9]{8}-[A-Fa-f0-9]{4}-[A-Fa-f0-9]{4}-[A-Fa-f0-9]{4}-[A-Fa-f0-9]{12}$/;
    return guidRegex.test(guid);
}

function WarehouseDetails() {
    const { id } = useParams();
    const { data, isLoading, error, isError } = useGetWarehouseByIdQuery(id);
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
        const warehouse = data;
        return (
            <>
                <Header />
                <SidePanel />
                <MainContainer>
                    <WrapperContainer>
                        <LeftContainer>
                            <SectionTitle>Details of : {warehouse.name}</SectionTitle>
                            <Attribute>
                                <Label>Name</Label>
                                <Value>{warehouse.name}</Value>
                            </Attribute>
                            <Attribute>
                                <Label>Location</Label>
                                <Value>{warehouse.location}</Value>
                            </Attribute>
                            <Attribute>
                                <Label>Created At</Label>
                                <Value>{warehouse.createdAt}</Value>
                            </Attribute><Attribute>
                                <Label>Updated At</Label>
                                <Value>{warehouse.updatedAt}</Value>
                            </Attribute>
                        </LeftContainer>
                    </WrapperContainer>

                    {/*<AdditionalInfoContainer>*/}
                    {/*    <SectionTitle>Additional Information</SectionTitle>*/}
                    {/*    <LabelsRow>*/}
                    {/*        <Label>Created At</Label>*/}
                    {/*        <Label></Label>*/}
                    {/*        <Label></Label>*/}
                    {/*        <Label>Updated At</Label>*/}
                    {/*    </LabelsRow>*/}
                    {/*    <ValuesRow>*/}
                    {/*        <Value>{formatDate(doctor.createdAt)}</Value>*/}
                    {/*        <Value></Value>*/}
                    {/*        <Value></Value>*/}
                    {/*        <Value></Value>*/}
                    {/*        <Value></Value>*/}
                    {/*        <Value>{formatDate(doctor.updatedAt)}</Value>*/}
                    {/*    </ValuesRow>*/}
                    {/*</AdditionalInfoContainer>*/}
                </MainContainer>
            </>
        );
    }
    return null;
}

export default withAuth(WarehouseDetails);


/* eslint-disable react-hooks/rules-of-hooks */
import { useLocation, useNavigate, useParams } from "react-router-dom";
import MainLoader from "../../app/common/MainLoader";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import useErrorHandler from "../../app/helpers/useErrorHandler";
import { Attribute, Label, LeftContainer, MainContainer, SectionTitle, Value, WrapperContainer } from "../../app/common/styledComponents/details";
import { useGetCustomerByIdQuery } from "../../app/APIs/customerApi";
import Header from "../../app/layout/Header";
import SidePanel from "../../app/layout/SidePanel";

function isValidGuid(guid: string): boolean {
    const guidRegex = /^[A-Fa-f0-9]{8}-[A-Fa-f0-9]{4}-[A-Fa-f0-9]{4}-[A-Fa-f0-9]{4}-[A-Fa-f0-9]{12}$/;
    return guidRegex.test(guid);
}

function CustomerDetails() {
    const { id } = useParams();
    const { data, isLoading, error, isError } = useGetCustomerByIdQuery(id);
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
        const department = data;
        return (
            <>
                <Header />
                <SidePanel />
                <MainContainer>
                    <WrapperContainer>
                        <LeftContainer>
                            <SectionTitle>Details of : {department.name}</SectionTitle>
                            <Attribute>
                                <Label>Name</Label>
                                <Value>{department.name}</Value>
                            </Attribute>
                            <Attribute>
                                <Label>Email</Label>
                                <Value>{department.email}</Value>
                            </Attribute>
                            <Attribute>
                                <Label>Phone</Label>
                                <Value>{department.phone}</Value>
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

export default CustomerDetails;


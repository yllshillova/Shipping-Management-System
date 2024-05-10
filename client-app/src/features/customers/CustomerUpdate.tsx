/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react-hooks/rules-of-hooks */
import { useNavigate, useParams } from 'react-router-dom';
import MainLoader from '../../app/common/MainLoader';
import useErrorHandler from '../../app/helpers/useErrorHandler';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { useGetCustomerByIdQuery } from '../../app/APIs/customerApi';
import CustomerForm from './CustomerForm';
import withAdminAuth from '../../app/HOC/withAdminManagerAuth';

function CustomerUpdate() {
    const { id } = useParams<{ id: string }>();
    const { data, error, isLoading, isError  } = useGetCustomerByIdQuery(id);
    const navigate = useNavigate();
    const fbError = error as FetchBaseQueryError;

    if (isError) {
        useErrorHandler(fbError, navigate, location.pathname);
    }

    if (isLoading) return <MainLoader />;

    if (data) {
        return <CustomerForm id={id} data={data} />;
    }

    return <div>No customer data available.</div>;
}

export default withAdminAuth(CustomerUpdate);
/* eslint-disable react-hooks/rules-of-hooks */
import { useNavigate, useParams } from 'react-router-dom';
import MainLoader from '../../app/common/MainLoader';
import useErrorHandler from '../../app/helpers/useErrorHandler';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import ProductForm from './ProductForm';
import { useGetProductByIdQuery } from '../../app/APIs/productApi';

function ProductUpdate() {
    const { id } = useParams<{ id: string }>();
    const { data, error, isLoading, isError  } = useGetProductByIdQuery(id);
    const navigate = useNavigate();
    const fbError = error as FetchBaseQueryError;

    if (isError) {
        useErrorHandler(fbError, navigate, location.pathname);
    }

    if (isLoading) return <MainLoader />;

    if (data) {
        return <ProductForm id={id} data={data} />;
    }

    return <div>No Product data available.</div>;
}

export default ProductUpdate;
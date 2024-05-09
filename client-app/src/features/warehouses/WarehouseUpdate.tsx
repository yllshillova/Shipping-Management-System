/* eslint-disable react-hooks/rules-of-hooks */
import { useNavigate, useParams } from 'react-router-dom';
import MainLoader from '../../app/common/MainLoader';
import useErrorHandler from '../../app/helpers/useErrorHandler';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import WarehouseForm from './WarehouseForm';
import { useGetWarehouseByIdQuery } from '../../app/APIs/warehouseApi';

function WarehouseUpdate() {
    const { id } = useParams<{ id: string }>();
    const { data, error, isLoading, isError  } = useGetWarehouseByIdQuery(id);
    const navigate = useNavigate();
    const fbError = error as FetchBaseQueryError;

    if (isError) {
        useErrorHandler(fbError, navigate, location.pathname);
    }

    if (isLoading) return <MainLoader />;

    if (data) {
        return <WarehouseForm id={id} data={data} />;
    }

    return <div>No Warehouse data available.</div>;
}

export default WarehouseUpdate;
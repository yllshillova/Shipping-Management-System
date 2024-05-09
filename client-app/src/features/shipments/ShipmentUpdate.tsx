/* eslint-disable react-hooks/rules-of-hooks */
import { useNavigate, useParams } from 'react-router-dom';
import MainLoader from '../../app/common/MainLoader';
import useErrorHandler from '../../app/helpers/useErrorHandler';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import ShipmentForm from './ShipmentForm';
import { useGetShipmentByIdQuery } from '../../app/APIs/shipmentApi';

function ShipmentUpdate() {
    const { id } = useParams<{ id: string }>();
    const { data, error, isLoading, isError  } = useGetShipmentByIdQuery(id);
    const navigate = useNavigate();
    const fbError = error as FetchBaseQueryError;

    if (isError) {
        useErrorHandler(fbError, navigate, location.pathname);
    }

    if (isLoading) return <MainLoader />;

    if (data) {
        return <ShipmentForm id={id} data={data} />;
    }

    return <div>No Shipment data available.</div>;
}

export default ShipmentUpdate;
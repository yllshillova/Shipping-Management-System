import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faReceipt, faShapes,  faTruck, faUser, faWarehouse} from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

function SidePanel() {
    const navigate = useNavigate();

    const handleCustomerList = () => {
        navigate('/customers');
    }
    const handleWarehouseList = () => {
        navigate('/warehouses');
    }
    const handleProductList = () => {
        navigate('/products');
    }
    const handleOrderList = () => {
        navigate('/orders');
    }
     const handleShipmentList = () => {
        navigate('/shipments');
    }
   
    const sideBarComponents = [
        { icon: faUser, label: 'Customers', onClick: handleCustomerList },
        { icon: faWarehouse, label: 'Warehouses', onClick: handleWarehouseList },
        { icon: faShapes, label: 'Products', onClick: handleProductList },
        { icon: faReceipt, label: 'Orders', onClick: handleOrderList },
        { icon: faTruck, label: 'Shipments', onClick: handleShipmentList },
    ];

    return (
        <SidePanelContainer >
            {sideBarComponents.map((item, index) => (
                <SidebarItem key={index} onClick={item.onClick}>

                    <IconWrapper>
                        <FontAwesomeIcon icon={item.icon} size="lg" />
                    </IconWrapper>
                    <Label>{item.label}</Label>
                </SidebarItem>
            ))}
        </SidePanelContainer>
    );
}

const SidePanelContainer = styled.div`
    position: fixed;
    top: 48px;
    left: 0;
    bottom: 0;
    min-width: 200px;
    background-color: #002147;
    display: flex;
    flex-direction: column;
    padding: 20px 0;
    box-shadow: 2px 0 10px rgba(0, 0, 0, 0.2);
    z-index: 100;
    height: 100vh;

    @media screen and (max-width: 768px) {
        width: 60%;
    }

    @media screen and (max-width: 480px) {
        width: 40%;
    }

    @media screen and (max-width: 360px) {
        width: 80%;
    }
`;

const SidebarItem = styled.div`
    display: flex;
    align-items: center;
    color: #E8E8E8;
    font-size: 13.5px;
    cursor: pointer;
    padding: 12px;
    margin: 5px 10%;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #4C516D;
        border-radius: 8px;
    }
`;

const IconWrapper = styled.div`
    display: flex;
    justify-content: center;
    margin-right: 10px;
    color: #E8E8E8;
    flex: 1;
`;

const Label = styled.div`
    font-weight: bold;
    flex: 3;
    align-self: flex-start;
`;


//const DropdownContainer = styled.div`
//  position: absolute;
//  top: 100%;
//  left: 100%;
//  background-color: #15283c;
//  border-radius: 5px;
//  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
//  margin-top: 5px;
//`;

//const DropdownItem = styled.div`
//  padding: 10px;
//  color: white;
//  cursor: pointer;
//  transition: background-color 0.3s ease;

//  &:hover {
//    background-color: white;
//    color: #0C2340;
//  }
//`;
export default SidePanel;
import { Navigate, Route, Routes } from "react-router-dom"
import CustomerList from "../../features/customers/CustomerList"
import CustomerDetails from "../../features/customers/CustomerDetails"
import CustomerInsert from "../../features/customers/CustomerInsert"
import CustomerUpdate from "../../features/customers/CustomerUpdate"
import WarehouseList from "../../features/warehouses/WarehouseList"
import WarehouseDetails from "../../features/warehouses/WarehouseDetails"
import WarehouseInsert from "../../features/warehouses/WarehouseInsert"
import WarehouseUpdate from "../../features/warehouses/WarehouseUpdate"
import NotFound from "../../features/errors/NotFound"
import ProductList from "../../features/products/ProductList"
import ProductDetails from "../../features/products/ProductDetails"
import ProductInsert from "../../features/products/ProductInsert"
import ProductUpdate from "../../features/products/ProductUpdate"
import OrderList from "../../features/orders/OrderList"
import OrderDetails from "../../features/orders/OrderDetails"
import OrderInsert from "../../features/orders/OrderInsert"
import ShipmentList from "../../features/shipments/ShipmentList"
import ShipmentDetails from "../../features/shipments/ShipmentDetails"
import ShipmentInsert from "../../features/shipments/ShipmentInsert"
import ShipmentUpdate from "../../features/shipments/ShipmentUpdate"
import Login from "../../features/account/Login"
import Register from "../../features/account/Register"
import { useEffect } from "react"
import User from "../models/user"
import { jwtDecode } from "jwt-decode"
import { useDispatch } from "react-redux"
import { setLoggedInUser, setToken } from "../storage/redux/userAuthSlice"
import AccessDenied from "../../features/errors/AccessDenied"

function App() {
    const dispatch = useDispatch();
    useEffect(() => {
        const localToken = localStorage.getItem("token");
        if (localToken) {
            const { unique_name, nameid, email, role, jwtToken }: User = jwtDecode(localToken);
            dispatch(setLoggedInUser({ unique_name, nameid, email, role, jwtToken }));
            dispatch(setToken(localToken));
        }
    }, [])

    return (
        <div>
            <div>
                <Routes>
                    <Route path="/" element={<WarehouseList />}></Route>
                    <Route path="/customers" element={<CustomerList />}></Route>
                    <Route path="/customer/:id" element={<CustomerDetails />}></Route>
                    <Route path="/customer/insert" element={<CustomerInsert />}></Route>
                    <Route path="/customer/update/:id" element={<CustomerUpdate />}></Route>
                    <Route path="/warehouses" element={<WarehouseList />}></Route>
                    <Route path="/warehouse/:id" element={<WarehouseDetails />}></Route>
                    <Route path="/warehouse/insert" element={<WarehouseInsert />}></Route>
                    <Route path="/warehouse/update/:id" element={<WarehouseUpdate />}></Route>
                    <Route path="/products" element={<ProductList />}></Route>
                    <Route path="/product/:id" element={<ProductDetails />}></Route>
                    <Route path="/product/insert" element={<ProductInsert />}></Route>
                    <Route path="/product/update/:id" element={<ProductUpdate />}></Route>
                    <Route path="/orders" element={<OrderList />}></Route>
                    <Route path="/order/:id" element={<OrderDetails />}></Route>
                    <Route path="/order/insert" element={<OrderInsert />}></Route>
                    <Route path="/shipments" element={<ShipmentList />}></Route>
                    <Route path="/shipment/:id" element={<ShipmentDetails />}></Route>
                    <Route path="/shipment/insert" element={<ShipmentInsert />}></Route>
                    <Route path="/shipment/update/:id" element={<ShipmentUpdate />}></Route>
                    <Route path="/login" element={<Login />}></Route>
                    <Route path="/register" element={<Register />}></Route>
                    <Route path="/accessDenied" element={<AccessDenied />}></Route>
                    {<Route path="/not-found" element={<NotFound />}></Route>}
                    {<Route path="*" element={<Navigate replace to="/not-found" />} />}
                </Routes>
            </div>
        </div>
    )
}

export default App

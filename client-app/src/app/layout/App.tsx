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

function App() {
  return (
      <div>
          <div>
              <Routes>
                  <Route path="/" element={<CustomerList />}></Route>
                  <Route path="/customers" element={<CustomerList />}></Route>
                  <Route path="/customer/:id" element={<CustomerDetails />}></Route>
                  <Route path="/customer/insert" element={<CustomerInsert />}></Route>
                  <Route path="/customer/update/:id" element={<CustomerUpdate />}></Route>
                  <Route path="/warehouses" element={<WarehouseList />}></Route>
                  <Route path="/warehouse/:id" element={<WarehouseDetails />}></Route>
                  <Route path="/warehouse/insert" element={<WarehouseInsert />}></Route>
                  <Route path="/warehouse/update/:id" element={<WarehouseUpdate />}></Route>
                  {<Route path="/not-found" element={<NotFound />}></Route>}
                  {<Route path="*" element={<Navigate replace to="/not-found" />} />}
              </Routes>
          </div>
      </div>
  )
}

export default App

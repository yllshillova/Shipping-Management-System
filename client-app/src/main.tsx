import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import store from './app/storage/redux/store.ts'
import App from './app/layout/App.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <BrowserRouter>
            <ToastContainer />
            <App />
        </BrowserRouter>
    </Provider>
)

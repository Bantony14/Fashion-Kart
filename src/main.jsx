import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, createRoutesFromElements , Route , RouterProvider } from 'react-router-dom'
import { Cart } from './components/Cart/Cart.jsx'
import HeroSection from './HeroSection/HeroSection.jsx'
import HeaderWithLayout from './components/HeaderWithLayout.jsx'
import { Provider } from 'react-redux'
import { store } from './App/store.js'
import Wishlist from './components/wishlist/Wishlist.jsx'
import {CheckoutPage} from './components/checkoutPage/CheckOutPage.jsx'
import BlanckLayout from './components/BlanckLayout.jsx'
import {PaymentProcessing} from './components/checkoutPage/PaymentProcessing.jsx'
import {PaymentSuccess} from './components/checkoutPage/PaymentSuccess.jsx'
import {LoginPage} from './components/loginPage/LoginPage.jsx'
import { SignUpPage } from './components/signUp/SignUpPage.jsx'
import { ListPage } from './components/ProductsList/ListPage.jsx'
import ListPageLayout from './ListPageLayout.jsx'
import { UseAllApi } from './components/Api/AllApi.jsx'
import {PDP} from './components/productDetailPage/PdpForClothes.jsx'
import { WomenProduct } from './components/categoriesProduct/Women/Women.jsx'
import { AccProduct } from './components/categoriesProduct/Accessories/Accessories.jsx'
import {AccountDashboard} from './components/profilePage/AccountDashboard.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
   <>
    <Route path = '/' element = {<App/>}>
      <Route path = '/' element = {<HeroSection/>}/>
      
    </Route>

    <Route path='/' element = {<HeaderWithLayout/>}>
    <Route path = '/cart' element = {<Cart/>}> </Route>
    </Route>

    <Route path='/' element = {<HeaderWithLayout/>}>
     <Route path = '/profilePage' element = {<AccountDashboard/>}> </Route>
    <Route path = '/wishlist' element = {<Wishlist/>}> </Route>
    </Route>

     <Route path='/' element = {<ListPageLayout/>}>
    <Route path = '/listpage' element = {<ListPage/>}> </Route>
    </Route>

    
     <Route path='/' element = {<ListPageLayout/>}>
    <Route path = 'category/women' element = {<WomenProduct/>}> </Route>
     <Route path = 'category/accessories' element = {<AccProduct/>}> </Route>
    </Route>

     <Route path='/' element = {<ListPageLayout/>}>
      <Route path = '/pdp' element = {<PDP/>}> </Route>
      <Route path = '/category/women/pdp' element = {<PDP/>}> </Route>
        <Route path = '/category/accessories/pdp' element = {<PDP/>}> </Route>

     <Route path = '/listpage/pdp' element = {<PDP/>}> </Route>
    </Route>

<Route path='/' element = {<BlanckLayout/>}>
<Route path = 'checkoutpage' element = {<CheckoutPage/>}></Route>
 <Route path="/payment-processing" element={<PaymentProcessing />} />
  <Route path="/payment-success" element={<PaymentSuccess />} />
</Route>

<Route path='/' element = {<BlanckLayout/>}>
<Route path = 'loginPage' element = {<LoginPage/>}></Route>
</Route>

<Route path='/' element = {<BlanckLayout/>}>
<Route path = 'signuppage' element = {<SignUpPage/>}></Route>
</Route>




   </>
   
    

  )
)

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
  <StrictMode>
  <RouterProvider router={router}/>
  </StrictMode>
  </Provider>,
)

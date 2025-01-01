import { Route, Routes } from "react-router-dom"
import AboutPage from '../pages/about';
// import { Blogs } from '../components/Blog/Blogs/Blogs';
// import { Category } from '../components/Category/Category';
import ContactPage from '../pages/contact';
import RegistrationPage from '../pages/registration';
// import LoginPage from '../pages/login';
// import CartPage from '../pages/faq';
import Home from "../pages";
// import { Shop } from "../components/Shop/Shop";
import BlogPage from "../pages/blog";
import CategoriesPage from "../pages/categories";
import ShopPage from "../pages/shop";
import FaqPage from "../pages/faq";
import CartPage from "../pages/cart";
import { ProductDetails } from "../components/Product/ProductDetails/ProductDetails";
import ProductPage from "../pages/product";


export const AllWebsiteRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/user-registration" element={<RegistrationPage/>} />
      {/* <Route path="/login" element={<LoginPage/>} /> */}
      <Route path="/about" element={<AboutPage/>} />
      {/* <Route path='/Blog' element={<Blogs/>} /> */}
      <Route path='/Blog' element={<BlogPage/>} />
      {/* <Route path='/Shop by Category' element={<Shop/>} /> */}
      <Route path='/faq' element={<FaqPage/>} />
      <Route path='/contact' element={<ContactPage/>} />
      <Route path='/categories' element={<CategoriesPage/>} />
      <Route path='/Shop by Category' element={<ShopPage/>} />
      <Route path='/product/:id' element={<ProductPage/>} />
      <Route path='/cart' element={<CartPage/>} />
    </Routes>
    )}
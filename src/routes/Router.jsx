import { Routes, Route } from 'react-router-dom'
import HomePage from '../pages/Home/HomePage'
import HomePageAdmin from '../pages/Home/HomePageAdmin/HomePageAdmin'
import HomePageSupport from '../pages/Home/HomePageSupport/HomePageSupport'
import ErrorPage from '../pages/Error/ErrorPage'
import SignUpPage from '../pages/SignUp/SignUpPage'
import LoginPage from '../pages/Login/LoginPage'
import RecPasswordEmailPage from '../pages/RecPasswordEmail/RecPassMailPage'
import RecoveryPasswordPage from '../pages/RecoveryPassword/RecoveryPasswordPage'
import PackageDetailsPage from '../pages/PackageDetails/PackageDetailsPage'
import SearchPackagesPage from '../pages/SearchPackages/SearchPackagesPage'
import AllReviewsPage from '../pages/Review/AllReviewsPage'
import BookingPage from '../pages/Booking/BookingPage'
import CheckoutPage from '../pages/Checkout/CheckoutPage'
import PaymentSuccess from '../pages/Payment/PaymentSuccess'
import PaymentFailure from '../pages/Payment/PaymentFailure'
import PaymentPending from '../pages/Payment/PaymentPending'
import ProfilePage from '../pages/Profile/ProfilePage'
import WishListPage from '../pages/WishList/WishListPage'
import HistoryPage from '../pages/History/HistoryPage'
import MainLayout from '../components/Layout'

export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="signup" element={<SignUpPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="recpassmail" element={<RecPasswordEmailPage />} />
        <Route path="recoverypassword" element={<RecoveryPasswordPage />} />
        <Route path="package-details/:id" element={<PackageDetailsPage />} />
        <Route path="search-packages" element={<SearchPackagesPage />} />
        <Route path="all-reviews" element={<AllReviewsPage />} />
        <Route path="booking" element={<BookingPage />} />
        <Route path="checkout" element={<CheckoutPage />} />
        <Route path="payment/success/:paymentId" element={<PaymentSuccess />} />
        <Route path="payment/pending/:paymentId" element={<PaymentPending />} />
        <Route path="payment/failure/:paymentId" element={<PaymentFailure />} />
        <Route path="payment/failure" element={<PaymentFailure />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="wishlist" element={<WishListPage />} />
        <Route path="history" element={<HistoryPage />} />
        <Route path="home-admin" element={<HomePageAdmin />} />
        <Route path="home-support" element={<HomePageSupport />} />
        <Route path="*" element={<ErrorPage />} />
      </Route>
    </Routes>
    
  );
};
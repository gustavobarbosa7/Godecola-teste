import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from '../pages/Home/HomePage'
import ErrorPage from '../pages/Error/ErrorPage'
import SignUpPage from '../pages/SignUp/SignUpPage'
import LoginPage from '../pages/Login/LoginPage'
import RecPasswordEmailPage from '../pages/RecPasswordEmail/RecPassMailPage'
import RecoveryPasswordPage from '../pages/RecoveryPassword/RecoveryPasswordPage'
import { Header } from '../components/Header/Header'
import { Footer } from '../components/Footer/Footer'
import PackageDetailsPage from '../pages/PackageDetails/PackageDetailsPage'
import SearchPackagesPage from '../pages/SearchPackages/SearchPackagesPage'
import AllReviewsPage from '../pages/Review/AllReviewsPage'
import BookingPage from '../pages/Booking/BookingPage'
import HomePageAdmin from '../pages/Home/HomePageAdmin/HomePageAdmin'

export const Router = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/recpassmail" element={<RecPasswordEmailPage/>} />
        <Route path="/recoverypassword" element={<RecoveryPasswordPage />} />
        <Route path="/package-details/:id" element={<PackageDetailsPage />} />
        <Route path="/search-packages" element={<SearchPackagesPage />} />
        <Route path="/all-reviews" element={<AllReviewsPage />} />
        <Route path="/booking" element={<BookingPage />} />
        <Route path="/home-admin" element={<HomePageAdmin />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}
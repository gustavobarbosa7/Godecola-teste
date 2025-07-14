import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from '../pages/Home/HomePage'
import ErrorPage from '../pages/Error/ErrorPage'
import SignUpPage from '../pages/SignUp/SignUpPage'
import LoginPage from '../pages/Login/LoginPage'
import RecoveryPasswordPage from '../pages/RecoveryPassword/RecoveryPasswordPage'
import { Header } from '../components/Header/Header'
import { Footer } from '../components/Footer/Footer'
import PackageDetailsPage from '../pages/PackageDetails/PackageDetailsPage'
import SearchPackagesPage from '../pages/SearchPackages/SearchPackagesPage'

export const Router = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/recoverypassword" element={<RecoveryPasswordPage />} />
        <Route path="/package-details" element={<PackageDetailsPage />} />
        <Route path="/search-packages" element={<SearchPackagesPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}
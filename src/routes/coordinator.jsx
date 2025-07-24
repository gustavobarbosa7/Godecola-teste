export const goToHome = navigate => {
  navigate('/')
}

export const goToError = navigate => {
  navigate('*')
}

export const goToLogin = navigate => {
  navigate('/login')
}

export const goToRecPassMail = navigate => {
  navigate('/recpassmail')
}

export const goToRecoveryPassword = navigate => {
  navigate('/recoverypassword')
}

export const goToSignUp = navigate => {
  navigate('/signup')
}

export const goToPackageDetails = (navigate, id) => {
  navigate(`/package-details/${id}`)
}

export const goToSearchPackages = navigate => {
  navigate('/search-packages')
}

export const goToReviews = (navigate, commentId, packageId) => {
  navigate(`/all-reviews?packageId=${packageId}&highlightId=${commentId}`);
};

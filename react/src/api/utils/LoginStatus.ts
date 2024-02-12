export const isLoggedIn = () => {
  const token = localStorage.getItem("token");
  const expiry = localStorage.getItem("expiry");
  if (expiry && token) {
    const now = new Date();
    const expiryDate = new Date(expiry);
    return now < expiryDate
  }
  return false;
}

import { Link } from "react-router-dom"

export default function ProfilePage() {
  return (
    <div>
      <h1>Profile</h1>
      <p>Here is the profile page</p>
      <p>
        <Link to="/">Go back to the homepage</Link>
      </p>
    </div>
  )
}
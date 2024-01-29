import { Link } from "react-router-dom"
import { getMentoring } from "@src/api/MentoringRoutes"

export default function MentoringPage() {

  getMentoring().then((res) => {
    console.log(res);
  });
  
  return (
    <div>
      <h1>Mentoring</h1>
      <p>Here is the mentoring page</p>
      <p>
        <Link to="/">Go back to the homepage</Link>
      </p>
    </div>
  )
}
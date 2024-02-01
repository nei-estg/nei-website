import { Link } from "react-router-dom"
import { getMentoring } from "@src/api/MentoringRoutes"
import { useEffect } from "react";

export default function MentoringPage() {

  useEffect(() => {
    getMentoring().then((res) => {
      console.log(res.data);
    }).catch();
  }, []);
  
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
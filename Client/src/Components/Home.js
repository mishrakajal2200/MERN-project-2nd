import "./Home.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/Signup");
  };
  return (
    <div className="container text-center">
      <h1>Welcome! To Our Dribble Website</h1>
      <h6> Click On The Button Below To View The Full Stack Project</h6>
      <button onClick={handleClick} className="btn btn-outline-primary">
        Click Here
      </button>
    </div>
  );
};

export default Home;

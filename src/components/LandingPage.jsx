import { Link, Outlet, useLocation} from "react-router-dom";
import GoogleLoginButton from "./GoogleLoginButton";

const LandingPage = () => {
  const location = useLocation();
  
  // console.log('Current path:', location.pathname);
  return (
    <div className="container mx-auto px-4 py-4">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-2 ">
        Welcome to Money Saver App
      </h1>
      <p className="text-lg text-gray-700 mb-4">
      <span className="font-bold text-teal-700">Money Saver App</span> is your personal savings guide! Set your <span className="font-bold text-sky-700">{" "}financial goals</span> and track your progress with our tailored weekly savings plans.
      </p>
      <p><span className="font-bold text-sky-700">Our standout feature </span>encourages little weekly savings to achieve your
  <span className="font-bold text-teal-700">{" "}dream goal</span>. Randomly generated buttons add up to your goal amount,
  making saving fun and manageable. Ready to get started?</p>
  <div className="flex flex-col items-center mt-4 mb-6 space-y-4">
          <GoogleLoginButton showLabelOnSmallScreen={true} />
          <div className="flex items-center space-x-2">
            <span className={`${location.pathname === '/landing/login' ? 'bg-teal-600 hover:bg-teal-700' : 'bg-sky-500 hover:bg-sky-700'} text-white font-bold py-2 px-4 rounded`}>
              <Link to="login">Log in</Link>
            </span>
            <span>or</span>
            <span className={`${location.pathname === '/landing/register' ? 'bg-teal-600 hover:bg-teal-700' : 'bg-sky-500 hover:bg-sky-700'} text-white font-bold py-2 px-4 rounded`}>
              <Link to="register">Register</Link>
            </span>
          </div>
        </div>

      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default LandingPage;

  // const [formType, setFormType] = useState(null);
  // const {id} = useParams()

  // useEffect(() => {
  //   if (id === 'login' || id === 'register') {
  //     setFormType(id)
  //   }
  
  // }, [id]) 
  // const handleOpenForm = (type) => {
  //   setFormType(type);
  // };

import { Link, Outlet, useLocation} from "react-router-dom";

const LandingPage = () => {
  const location = useLocation();
  
  console.log('Current path:', location.pathname);
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
        <div className="flex justify-center mt-2 mb-4">
      <p>
        {/* Ready to get started? */}
        {/* <span className="text-teal-600 mx-1 hover:text-teal-800"> */}
        <span className={`${location.pathname === '/landing/login' ? 'bg-teal-600 hover:bg-teal-700' : 'bg-sky-500 hover:bg-sky-700'}  text-white font-bold  py-2 px-2 rounded mr-2 mx-1`}>
          <Link to="login">Log in</Link>
        </span>or 
        <span className={`${location.pathname === '/landing/register' ? 'bg-teal-600 hover:bg-teal-700' : 'bg-sky-500 hover:bg-sky-700'}  text-white font-bold  py-2 px-2 rounded mr-4 mx-1`}>
          <Link to="register">Register</Link>
        </span>
      </p>
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

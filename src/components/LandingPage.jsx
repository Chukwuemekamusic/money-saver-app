import { Link, Outlet} from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 ">
        Welcome to Weekly Money Saver App
      </h1>
      <p className="text-lg text-gray-700 mb-8">
      Money Saver App is your personal savings guide! Set your financial goals and track your progress with our tailored weekly savings plans.
        {/* Our mission is to empower individuals like you to achieve your financial goals by making saving money a simple and rewarding experience. Whether you're saving for a dream vacation, a new car, or your future financial security, our app is here to support you every step of the way. */}
      </p>
      <p>Our standout feature encourages little weekly savings to achieve your
        dream goal. Randomly generated buttons add up to your goal amount,
        making saving fun and manageable.</p>
        <div className="flex justify-center mb-8">
      <p>
        Ready to get started?
        {/* <span className="text-teal-600 mx-1 hover:text-teal-800"> */}
        <span className="bg-blue-500 hover:bg-blue-700 text-white font-bold  py-2 px-2 rounded mr-4 mx-1">
          <Link to="login">Log in</Link>
        </span>or 
        <span className="bg-blue-500 hover:bg-blue-700 text-white font-bold mx-1 py-2 px-2 rounded mr-4">
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

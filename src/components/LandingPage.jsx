import { Outlet, useLocation} from "react-router-dom";
import { useAuthModal } from "../contexts/AuthModalContext";

const LandingPage = () => {
  const location = useLocation();
  const { openLoginModal, openRegisterModal } = useAuthModal();
  
  // console.log('Current path:', location.pathname);
  return (
    <div className="container mx-auto px-4 py-4">
      {/* Enhanced Hero Section */}
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Turn Your Savings 
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-sky-500"> Dreams </span>
          Into Reality
        </h1>
        <p className="text-xl text-gray-600 mb-6 max-w-2xl mx-auto">
          Set a goal, get fun weekly amounts, track your progress. 
          Our random savings approach makes reaching your financial goals 
          <span className="font-semibold text-teal-700"> enjoyable and achievable</span>.
        </p>
      </div>

      {/* How It Works Section */}
      <div className="mb-12">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
          How It Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {/* Step 1 */}
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-teal-500 to-sky-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
              1
            </div>
            <h3 className="text-xl font-semibold mb-2">Set Your Goal</h3>
            <p className="text-gray-600">
              Choose your savings target and timeline. Whether it's $500 for a vacation or $5000 for an emergency fund.
            </p>
          </div>
          
          {/* Step 2 */}
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-sky-500 to-teal-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
              2
            </div>
            <h3 className="text-xl font-semibold mb-2">Save Weekly</h3>
            <p className="text-gray-600">
              Get randomly generated weekly amounts that add up to your goal. Makes saving fun and unpredictable!
            </p>
          </div>
          
          {/* Step 3 */}
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-teal-500 to-sky-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
              3
            </div>
            <h3 className="text-xl font-semibold mb-2">Track Progress</h3>
            <p className="text-gray-600">
              Mark weeks as complete and watch your progress grow. Get reminders and celebrate milestones!
            </p>
          </div>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="text-center mb-8">
        <h3 className="text-xl font-semibold mb-6">Ready to start saving?</h3>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <button 
            onClick={openRegisterModal}
            className="bg-gradient-to-r from-teal-500 to-sky-500 hover:from-teal-600 hover:to-sky-600 text-white font-bold py-4 px-8 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl text-lg"
          >
            Get Started Free
          </button>
          <button 
            onClick={openLoginModal}
            className="border-2 border-sky-500 text-sky-500 hover:bg-sky-500 hover:text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200"
          >
            Log In
          </button>
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

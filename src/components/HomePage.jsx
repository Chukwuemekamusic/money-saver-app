import SavingPlanForm from "./SavingPlanForm";
import SavingPlanList from "../features/savings/SavingPlanList";
import { useSelector } from "react-redux";
import { selectAllSavings } from "../features/savings/savingsSlice";
import { SelectUserInfo } from "../features/auth/authSlice";
// import useCheckAuth from "../features/auth/utils/useCheckAuth";
// import { listSavingPlan } from "../features/savings/savingAction";
// import { useRef } from "react";

const Home = () => {
  const { isLoading, isSuccess, savings, error } =
    useSelector(selectAllSavings);
  const userInfo = useSelector(SelectUserInfo);
  console.log('user', userInfo);
  console.log('first_name', userInfo.first_name);
  console.log('first_name', userInfo);
  // const checkAuth = useCheckAuth();
  // const dispatch = useDispatch();
  // const inputRef = useRef(null)
  // // const focusOn = () => inputRef?.current?.focus()
  // // focusOn()
  // useEffect(() => {
  //   // checkAuth();
  //   dispatch(listSavingPlan());
  // }, []);

  // const date = new Date()
  //   const today = new Intl.DateTimeFormat('en-US', { dateStyle: 'full', timeStyle: 'long' }).format(date)
  return (
    <div className="text-center">
      {isLoading || !userInfo ? (
        <span>is loading...</span>
      ) : (
        <>
          <h2 className="text-3xl md:text-4xl mb-4">
            Hi{" "}
            <span className="font-bold text-teal-700 capitalize">
              {userInfo.first_name}
            </span>
            , Welcome to Your Savings Dashboard
          </h2>

          <SavingPlanForm />

          {/* {console.log("Savings", savings)} */}
          {error && <span>Error: {error.message}</span>}
          {savings && isSuccess && (
            <>
              <h3 className="text-xl font-semibold mb-2">Your Saved Plans:</h3>
              <SavingPlanList savings={savings} />
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Home;

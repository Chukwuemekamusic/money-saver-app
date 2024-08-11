import SavingPlanForm from "./SavingPlanForm";
import SavingPlanList from "../features/savings/SavingPlanList";
import { useSelector } from "react-redux";
import { selectAllSavings } from "../features/savings/savingsSlice";
import { SelectUserInfo } from "../features/auth/authSlice";

const Home = () => {
  const { isLoading, isSuccess, savings, error } = useSelector(selectAllSavings);

  const userInfo = useSelector(SelectUserInfo);
  // console.log("user", userInfo);
  // console.log("first_name", userInfo?.first_name);
  // console.log("first_name", userInfo);

  return (
    <div className="text-center">
      {isLoading || !userInfo ? (
        <span>is loading...</span>
      ) : (
        <>
          <h2 className="text-3xl md:text-4xl mb-4">
            Hi{" "}
            <span className="font-bold text-teal-700 capitalize">
              {userInfo?.first_name}
            </span>
            , Welcome to Your Savings Dashboard
          </h2>

          <SavingPlanForm />

          {/* {console.log("Savings", savings)} */}
          {error && <span>Error: {error.message}</span>}
          {savings && isSuccess && (
            <>
              <h3 className="text-xl font-semibold mb-2 mt-4 md:mt-8">Your Saved Plans:</h3>
              <SavingPlanList savings={savings} />
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Home;

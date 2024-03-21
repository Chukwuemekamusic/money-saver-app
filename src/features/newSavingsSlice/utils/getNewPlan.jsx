import store from "../../../app/store";

const getNewPlan = () => {
  return store.getState().savings.newlySavedPlan;
};

export default getNewPlan;

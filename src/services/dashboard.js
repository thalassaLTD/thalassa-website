import axios from "axios";
import { getDashboardDataURL } from "./index";
import { setDashboardData } from "../store/actions";
import redux from "../store";

export const loadDashboardData = async () => {
  try {
    const { data } = await axios.post(getDashboardDataURL);
    redux.store.dispatch(setDashboardData(data));
    return data;
  } catch (err) {}
};

import axios from "axios";
import { restaurantsIndex } from "../urls";

export const featchRestaurants = () => {
  return axios.get(restaurantsIndex)
  .then(res => {
    return res.data
  }).catch((e) => console.log(e));
}
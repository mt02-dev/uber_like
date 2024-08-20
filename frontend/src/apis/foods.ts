import axios from "axios";
import { foodsIndex } from "../urls";
import { Food } from "../types/foods/foods";

export const fetchFoods = (restaulant_id: string) => {
  return axios.get(foodsIndex(restaulant_id))
  .then(res => {
    return res.data;
    
  }).catch((e) => {
    console.log(e);
  })
   
}
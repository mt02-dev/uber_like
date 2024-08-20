import axios from "axios";
import { lineFoodsReplace,lineFoods } from "../urls";

export const postLineFoods = (params: any) => {
  return axios.post(lineFoods, {
    food_id: params.foodId,
    count: params.count
  })
  .then(res => res.data)
  .catch((e) => {
    throw e;
  });
}

export const replaceLineFoods = (params: any) => {
  return axios.put(lineFoodsReplace, {
    food_id: params.foodId,
    count: params.count
  })
}

export const getLineFoods = ()  => {
  return axios.get(lineFoods)
    .then((res) => res.data)
    .catch((e) => {
      throw e;
    })
}
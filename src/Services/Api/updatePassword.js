import axios from "axios";
import { baseURL } from "../../Config/server";

export default async function updatePassord({ ...data }) {
  const result = await axios.patch(`${baseURL}/password/${data.userId}`, { ...data });
  return result.data;
}
import { playerDummyData } from "../dummyData/playerDummyData";
import { SimulatedHttpRequestMs } from "../globalConstants";

export const getAllPlayers = async (user) => {
  await new Promise(resolve => setTimeout(resolve, SimulatedHttpRequestMs));
  return playerDummyData;
}
import { Cv } from "../model/cv";
export interface AddCvState {
  cv: Cv ; 
}
export const initialAddCvState: AddCvState = {
    cv: {
      id: 0,
      firstname: "",
      name: "",
      job: "",
      path: "",
      cin: "",
      age: 0,
    },
  };

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
enum GenderEnum {
  female = "female",
  male = "male",
}
enum GovtIDType {
  Adhar = "Adhar",
  PAN = "PAN",
}
export interface User {
  Name: string;
  Age: number;
  Sex: GenderEnum;
  Mobile: number;
  GovtIssuedIDType?: GovtIDType;
  GovtIssuedId?: number;
}

interface UserState {
  users: User[];
}

const initialState: UserState = {
  users: [],
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<User>) => {
      console.log(state,action);
      
      state.users.push(action.payload);
    },
  },
});

export const { addUser } = userSlice.actions;
export default userSlice.reducer;

import { createSlice,PayloadAction } from "@reduxjs/toolkit";


export interface  AddressInf{
    Address: string;
    State: string;
    City: string;
    Country: string;
    Pincode: number;
};

interface addresState {
    address : AddressInf[]
}
const initialState: addresState = {
    address: []
}

const addressSlice = createSlice({
    name: 'address',
    initialState: initialState,
    reducers: {
        addAddress: (state,action:PayloadAction<AddressInf>) =>{
            console.log(state,action);
            state.address.push(action.payload)
        }
    }

});

export const { addAddress } = addressSlice.actions;
export default addressSlice.reducer;
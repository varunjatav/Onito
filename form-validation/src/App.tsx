// import React from 'react';
import { Container } from "@mui/material";
import {useForm, SubmitHandler} from "react-hook-form";
import { object, string, number, InferType } from 'yup';

let userSchema = object({
  Name: string().required(),
  Age: number().required().positive().integer(),
  Sex: string(),
  Mobile: number(),
  GovtIssuedIDType: string(),
  GovtIssuedId: number(),
});
enum GenderEnum {
  female = "female",
  male = "male",
}
enum GovtIDType {
  Adhar = "Adhar",
  PAN = "PAN",
}
type IFormInput = {
  Name: string;
  Age: number;
  Sex: GenderEnum;
  Mobile: number;
  GovtIssuedIDType?: GovtIDType;
  GovtIssuedId?: number;
};
const user = await userSchema.validate(await fetchUser());
type User = InferType<typeof userSchema>;
// ... (imports)

function App() {

  const {register, handleSubmit} = useForm<IFormInput>();
  const onSubmit:SubmitHandler<IFormInput> = (data) => console.log(data);
  
  return (
    <>

    <Container maxWidth="md">
      <h2>Personal Details</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
        <div>
        <label htmlFor="Name">Name</label>
        <input {...register("Name")} placeholder="Enter Name" type="text"  />
        </div>
       <div>
       <label htmlFor="Age">Date of Birth or Age</label>
        <input {...register("Age")} placeholder="DD/MM/YYYY or Age in Years" type="text"  />
       </div>
        <div>
        <label htmlFor="Sex">Sex</label>
        <select {...register("Sex")} name="Sex">
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        </div>
       <div>
       <label htmlFor="Mobile">Mobile</label>
        <input placeholder="Enter Mobile" {...register("Mobile")} type="text" />
       </div>
       <div>
       <label htmlFor="Mobile">Government Issue ID </label>
        <select {...register("GovtIssuedIDType")} >
        <option>ID Type</option>
          <option value="Adhar">Adhar</option>
          <option value="PAN">PAN</option>
        </select>
          <input placeholder="Enter Govt ID" {...register("GovtIssuedId")} type="text"  />
       </div>
        
       
        </div>
        <input type="submit" />
      </form>
      </Container>
    </>
  );
}

export default App;

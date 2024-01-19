import { Container } from "@mui/material";
import { useForm, SubmitHandler } from "react-hook-form";
import { object, string, number } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import DataTable from "datatables.net-dt";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { User, addUser } from "../store/userSlice";
import { RootState, AppDispatch } from '../store/index';

let userSchema = object({
  Name: string().required("Name is required").min(3),
  Age: number().required("Age is required").positive().integer(),
  Sex: string().required("Gender is required"),
  Mobile: number()
    .required()
    .test("is-indian-mobile", "Invalid Indian mobile number", (value) => {
      if (!value) return false;

      const regex = /^[6-9]\d{9}$/;
      return regex.test(value.toString());
    }),
  GovtIssuedIDType: string().oneOf(["Adhar", "PAN"]),
  GovtIssuedId: number(),
});


const Personal = () => {
 const navigate = useNavigate();
 const dispatch:AppDispatch = useDispatch();
 const users = useSelector((store:RootState) => store.user.users);
 console.log("users", users);
 
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>({ resolver: yupResolver(userSchema) as any });
  
  const usersData: any[] = users.map(user => [
    user.Name,
    user.Age,
    user.Sex,
    user.Mobile,
    user.GovtIssuedIDType,
    user.GovtIssuedId,
  ]);
  const onSubmit: SubmitHandler<User> = (data) => {
    
    console.log(data);
 
    dispatch(addUser(data));
  };
  useEffect(() => {
    const initializeDataTable = () => {
      const table = new DataTable("#example", {
        data: usersData,
        columns: [
          { title: "Name" },
          { title: "Age" },
          { title: "Sex" },
          { title: "Mobile" },
          { title: "GovtIssuedIDType" },
          { title: "GovtIssuedId" },
        ],
      });

      // Optionally destroy the DataTable instance on component unmount
      return () => {
        table.destroy();
      };
    };

    // Check if users data is available before initializing DataTable
    if (users && users.length > 0) {
      const destroyDataTable = initializeDataTable();
      return destroyDataTable;
    }
  }, [users]);
  const handleNext = ():void => {
    // table.destroy();
    navigate('/address')
  }
  
  return (
    <>
      <Container maxWidth="md">
        <h2>Personal Details</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <div>
              <label htmlFor="Name">Name</label>
              <input
                {...register("Name")}
                placeholder="Enter Name"
                type="text"
              />
            </div>
            {errors.Name && <span>{errors.Name.message}</span>}
            <div>
              <label htmlFor="Age">Date of Birth or Age</label>
              <input
                {...register("Age")}
                placeholder="DD/MM/YYYY or Age in Years"
                type="text"
              />
            </div>
            {errors.Age && <span>Age is required</span>}
            <div>
              <label htmlFor="Sex">Sex</label>
              <select {...register("Sex")} name="Sex">
                <option value="">None</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
            {errors.Sex && <span>{errors.Sex.message}</span>}
            <div>
              <label htmlFor="Mobile">Mobile</label>
              <input
                placeholder="Enter Mobile"
                {...register("Mobile")}
                type="text"
              />
            </div>

            <div>
              <label htmlFor="Mobile">Government Issue ID </label>
              <select {...register("GovtIssuedIDType")}>
                <option value="">ID Type</option>
                <option value="Adhar">Adhar</option>
                <option value="PAN">PAN</option>
              </select>
              <input
                placeholder="Enter Govt ID"
                {...register("GovtIssuedId")}
                type="text"
              />
            </div>
            {errors.GovtIssuedId && <span>Govt Issued Id is required</span>}
          </div>

          <input type="submit" value="Submit" />
         
        </form>
      </Container>
      <table id="example" className="display" style={{ width: "100%" }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Mobile</th>
            <th>ID Type</th>
            <th>Issued Id</th>
          </tr>
        </thead>
        <tbody>
          {/* {users &&
            users.map((data:User,index) => (
              <tr key={index}>
                <td>{data.Name}</td>
                <td>{data.Age}</td>
                <td>{data.Sex}</td>
                <td>{data.Mobile}</td>
                <td>{data.GovtIssuedIDType}</td>
                <td>{data.GovtIssuedId}</td>
              </tr>
            ))} */}

          <tr>
            <td>Garrett Winters</td>
            <td>31</td>
            <td>Male</td>
            <td>9453909042</td>
            <td>Adhar</td>
            <td>6044 6321 6470</td>
          </tr>
        </tbody>
      </table>

       <button onClick={handleNext}>Next</button>
    </>
  );
};

export default Personal;

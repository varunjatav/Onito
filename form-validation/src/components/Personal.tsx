import { Container } from "@mui/material";
import { useForm, SubmitHandler } from "react-hook-form";
import { object, string, number } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
// import { useNavigate } from "react-router-dom";
import DataTable from "datatables.net-dt";
import { useState } from "react";

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
// let table = new DataTable("#example");
// console.log(table);

const Personal = () => {
  // const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({ resolver: yupResolver(userSchema) as any });
  // const submittedData: IFormInput[] = [];
  const [submittedData,setSubmittedData] = useState<any | []>([]);
  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    setSubmittedData(data)
    // submittedData.push(data);
    console.log(data);
    console.log(submittedData);

    // navigate("/stepTwo")
  };
  let table = new DataTable("#example",{
    // responsive: true
  });
  console.log(table);
  
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
          {submittedData &&
            submittedData.map((data:IFormInput) => (
              <tr>
                <td>{data.Name}</td>
                <td>{data.Age}</td>
                <td>{data.Sex}</td>
                <td>{data.Mobile}</td>
                <td>{data.GovtIssuedIDType}</td>
                <td>{data.GovtIssuedId}</td>
              </tr>
            ))}

          <tr>
            <td>Garrett Winters</td>
            <td>Accountant</td>
            <td>Tokyo</td>
            <td>63</td>
            <td>2011-07-25</td>
            <td>$170,750</td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default Personal;

import {
  Button,
  Container,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import { useForm, SubmitHandler } from "react-hook-form";
import { object, string, number } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import DataTable from "datatables.net-dt";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { User, addUser } from "../store/userSlice";
import { RootState, AppDispatch } from "../store/index";

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
  GovtIssuedId: number().when('GovtIssuedIDType', ([govtIssuedIDType]) => {
    return govtIssuedIDType == "Adhar" ? number().required().test('length','Min 12', value=>{
      const stringValue = value.toString();
      return stringValue.length === 12;
    }) : number().required().test('length','Min 10', value=>{
      const stringValue = value.toString();
      return stringValue.length === 10;
    });
  })
});
const Personal = () => {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const users = useSelector((store: RootState) => store.user.users);
  const dataTableRef = useRef<any>(null);
  const [selectedIdType, setSelectedIdType] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const handleChange = (e: SelectChangeEvent) => {
    setGender(e.target.value);
  };
  const handleIdTypeChange = (e: SelectChangeEvent) => {
    setSelectedIdType(e.target.value);
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>({ resolver: yupResolver(userSchema) as any });

  const usersData: any[] = users.map((user) => [
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
    if (users && users.length > 0) {
      dataTableRef.current = new DataTable("#example", {
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
        if (dataTableRef.current) {
          dataTableRef.current.destroy();
        }
      };
    }
  }, [users, usersData]);

  const handleNext = (): void => {
    navigate("/address");
  };

  return (
    <div className="mainContainer">
      <Container maxWidth="md">
        <Typography variant="h4" sx={{ textDecoration: "underline" }}>Personal Details</Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <div>
              <Typography variant="body1" color="black">
                Name
              </Typography>
              <TextField
                variant="outlined"
                size="small"
                {...register("Name")}
                placeholder="Enter Name"
                type="text"
                required
              />
            </div>
            {errors.Name && <span>{errors.Name.message}</span>}
            <div>
              <Typography variant="body1" color="black">
                {" "}
                Age
              </Typography>
              <TextField
                variant="outlined"
                size="small"
                {...register("Age")}
                placeholder="Age in Years"
                type="text"
                required
              />
            </div>
            {errors.Age && <span>Age is required</span>}
            <div>
              <InputLabel id="demo-simple-select-label">Sex</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Sex"
                value={gender}
                {...register("Sex", { onChange: handleChange })}
                size="small"
                required
              >
                <MenuItem value="">None</MenuItem>
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
              </Select>
            </div>
            {errors.Sex && <span>{errors.Sex.message}</span>}
            <div>
              <Typography variant="body1" color="black">
                Mobile
              </Typography>
              <TextField
                variant="outlined"
                size="small"
                placeholder="Enter Mobile"
                {...register("Mobile")}
                type="text"
              />
            </div>

            <div>
              <InputLabel id="demo-simple-select-label">
                Government Issue ID{" "}
              </InputLabel>
              <div className="GovtIssueId">
                
              <Select
                  className="Id_Select"
                  value={selectedIdType}
                  // onChange: handleIdTypeChange 
                  {...register("GovtIssuedIDType", { onChange: handleIdTypeChange  })}
                  size="small"
                >
                  <MenuItem value="">ID Type</MenuItem>
                  <MenuItem value="Adhar">Adhar</MenuItem>
                  <MenuItem value="PAN">PAN</MenuItem>
                </Select>
                <TextField
                  variant="outlined"
                  size="small"
                  placeholder="Enter Govt ID"
                  {...register("GovtIssuedId")}
                  type="text"
                />
              </div>
            </div>
            {errors.GovtIssuedId && <span>{errors.GovtIssuedId.message}</span>}
          </div>
          <Button variant="outlined" color="secondary" type="submit">
            Submit
          </Button>
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
        <tbody></tbody>
      </table>
      <Button
        variant="outlined"
        color="secondary"
        type="submit"
        onClick={handleNext}
      >
        Next
      </Button>
    </div>
  );
};

export default Personal;

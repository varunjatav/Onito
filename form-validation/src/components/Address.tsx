import { Button, Container, TextField, Typography } from "@mui/material";
import { useForm, SubmitHandler } from "react-hook-form";
import { object, string, number } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/index";
import { AddressInf, addAddress } from "../store/addressSlice";
import DataTable from "datatables.net-dt";
// https://restcountries.com/v3.1/name/{name}

let addressSchema = object({
  Address: string(),
  State: string(),
  City: string(),
  Country: string(),
  Pincode: number(),
});



const Address = () => {
  const dispatch = useDispatch();
  const address = useSelector((store:RootState) => store.address.address)
  const { register, handleSubmit } = useForm<AddressInf>({
    resolver: yupResolver(addressSchema) as any,
  });
  const countryRef = useRef<string>("");
  console.log("country ref : ", countryRef.current);

  const [filteredCountries, setFilteredCountries] = useState<string[]>([]);
  console.log(filteredCountries);

  const [loading, setLoading] = useState<boolean>(false);
  const dataTableRef = useRef<any>(null);

  const handleChange = (e:any) => {
    countryRef.current = e.target.value
      const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://restcountries.com/v3.1/name/${countryRef.current}`
        );
        const data = await response.json();
        console.log(data);
        const countryNames = data.map((country: any) => country.name.common);
        setFilteredCountries(countryNames);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (countryRef.current) {
      fetchData();
    } else {
      setFilteredCountries([]);
    }
  }

  const addressData: any[] = address.map((add) => [
    add.Address,
    add.State,
    add.City,
    add.Country,
    add.Pincode,
  ]);
  const onSubmit: SubmitHandler<AddressInf> = (data) => {
    setFilteredCountries([]);
    console.log(data);
    dispatch(addAddress(data));
  };

  useEffect(() => {
    if (address && address.length > 0) {
      dataTableRef.current = new DataTable("#example", {
        data: addressData,
        columns: [
          { title: "Address" },
          { title: "State" },
          { title: "City" },
          { title: "Cuntry" },
          { title: "Pincode" },
        ],
      });

      // Optionally destroy the DataTable instance on component unmount
      return () => {
        if (dataTableRef.current) {
          dataTableRef.current.destroy();
        }
      };
    }
  }, [address, addressData]);
  return (
    <div className="mainContainer">
    <Container maxWidth="md">
      <Typography variant="h4"  sx={{ textDecoration: "underline" }}>Address Details</Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <div>
            <Typography variant="body1" color="black">
              Address
            </Typography>
            <TextField
              {...register("Address")}
              placeholder="Enter Address"
              type="text"
              variant="outlined"
              size="small"
            />
          </div>

          <div>
            <Typography variant="body1" color="black">
              State
            </Typography>
            <TextField
              {...register("State")}
              placeholder="Enter your state"
              type="text"
              variant="outlined"
              size="small"
            />
          </div>

          <div>
            <Typography variant="body1" color="black">
              City
            </Typography>
            <TextField
              {...register("City")}
              type="text"
              placeholder="Enter your city"
              variant="outlined"
              size="small"
            />
          </div>

          <div className="country">
            <Typography variant="body1" color="black">
              Country
            </Typography>

            <TextField
              placeholder="Enter Country"
              {...register("Country")}
              type="text"
              onChange={(e) => {handleChange(e)}}
              variant="outlined"
              size="small"
            />
            {loading && <p>Loading...</p>}
            {filteredCountries.length > 0 && (
              <ul className="countryList">
                {filteredCountries.map((country, index) => (
                  <li key={index}>{country}</li>
                ))}
              </ul>
            )}
           
          </div>

          <div>
            <Typography variant="body1" color="black">
              Pincode
            </Typography>
            <TextField
              placeholder="Enter Pincode"
              {...register("Pincode")}
              type="number"
              variant="outlined"
              size="small"
            />
          </div>
        </div>

        <Button variant="outlined" color="secondary" type="submit" > Submit </Button>
      </form>
    </Container>
    <table id="example" className="display" style={{ width: "100%" }}>
        <thead>
          <tr>
            <th>Adress</th>
            <th>State</th>
            <th>City</th>
            <th>Country</th>
            <th>Pincode</th>
          </tr>
        </thead>
        <tbody>
          
        </tbody>
      </table>
      </div>
  );
};

export default Address;

import { Container } from '@mui/material'
import { useForm, SubmitHandler } from "react-hook-form";
import { object, string, number } from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import { useEffect, useRef, useState } from 'react';
// https://restcountries.com/v3.1/name/{name}

let addressSchema = object({
  Address: string(),
  State: string(),
  City: string(),
  Country: string(),
  Pincode: number().required(),
});


type IFormInput = {
  Address: string;
  State: string;
  City: string;
  Country: string;
  Pincode: number
};

const Address = () => {

  const { register, handleSubmit } = useForm<IFormInput>( { resolver : yupResolver(addressSchema) as any });
  const countryRef = useRef<HTMLInputElement>(null);
  console.log(countryRef);
  
  const [filteredCountries, setFilteredCountries] = useState<string[]>([]);
  console.log(filteredCountries);
  
  const [loading, setLoading] = useState<boolean>(false);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://restcountries.com/v3.1/name/${countryRef.current?.value}`);
        const data = await response.json();
        const countryNames = data.map((country: any) => {
          country.name.common;
          console.log(country);
          
        });
        setFilteredCountries(countryNames);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (countryRef.current?.value) {
      fetchData();
    } else {
      setFilteredCountries([]);
    }
  }, [countryRef.current?.value]);
  

    
 
  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log(data);
  };
  return (
    <Container maxWidth="md">
      <h2>Address Details</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <div>
            <label htmlFor="Address">Address</label>
            <input {...register('Address')} placeholder="Enter Address" type="text" />
          </div>

          <div>
            <label htmlFor="State">State</label>
            <input {...register('State')} placeholder="Enter your state" type="text" />
          </div>

          <div>
            <label htmlFor="City">City</label>
            <input {...register('City')} type="text" placeholder="Enter your city" />
          </div>

          <div className='country'>
            <label htmlFor="Country">Country</label>
            <div>
            <input
              placeholder="Enter Country"
              {...register('Country')}
              type="text"
              ref={countryRef}
            />
            {loading && <p>Loading...</p>}
            {filteredCountries.length > 0 && (
              <ul>
                {filteredCountries.map((country, index) => (
                  <li key={index}>{country}</li>
                ))}
              </ul>
            )}
            </div>
            
          </div>

          <div>
            <label htmlFor="Pincode">Pincode</label>
            <input placeholder="Enter Pincode" {...register('Pincode')} type="number" />
          </div>
        </div>

        <input type="submit" value="Submit" />
      </form>
    </Container>
  );
}

export default Address
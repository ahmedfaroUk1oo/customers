import React from 'react'
import Details from './Details';

export default async function FetchData() {
    const fetchData = async () => {
        try {
          const response = await fetch('https://my-json-server.typicode.com/ahmedfarouk1oo/Api/customers'); // replace 'your-endpoint' with the actual endpoint
          const result = await response.json();
          return result;
        } catch (error) {
          console.error('Error fetching data:', error)
        }}
        const names = await fetchData();
     


        const tranactions = async() => {
          try {
            const data = await fetch('https://my-json-server.typicode.com/ahmedfarouk1oo/Api/transactions');
            const result = await data.json();
            return result;
          } catch (error) {
            console.log(error);
          }
        }

        const transactionsData = await tranactions();
  return (
    <>
   
    <Details names={names} transactionsProccess={transactionsData} />
      
    </>
  )
}

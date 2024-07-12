"use client"
import React, { useState } from 'react'
import Chart from './Chart';

export default  function Details({names, transactionsProccess}) {
 const [customerTransations,setCustomerTransactions] = useState(transactionsProccess);
const [filterr ,setFilterr] = useState(names)
const [selectedCustomer, setSelectedCustomer] = useState(null);
const [selectedCustomerTransactions, setSelectedCustomerTransactions] = useState(null);
 const filteringName= (e)=> {
    if(e.target.value){
        setFilterr(names.filter(name => name.name.toLowerCase().includes(e.target.value.toLowerCase())));
        let filterNames = names.filter(name => name.name.toLowerCase().includes(e.target.value.toLowerCase()));
let nameId = filterNames.map(id => id.id);
setCustomerTransactions(transactionsProccess.filter(proccess => nameId.toString().includes(proccess.customer_id.toString())))
    }else {
        setFilterr(names);
        setCustomerTransactions(transactionsProccess);
    }
 }

 const filteringAmount = (e) => {
    if(e.target.value){
        setCustomerTransactions(transactionsProccess.filter(proccess => proccess.amount.toString().includes(e.target.value)))
        let filterTrans = transactionsProccess.filter(proccess => proccess.amount.toString().includes(e.target.value))
        let id = filterTrans.map(id => id.customer_id)
        setFilterr(names.filter(name=>id.toString().includes(name.id) ));
    }else {
        setCustomerTransactions(transactionsProccess);
        setFilterr(names)
    }
 }



 const handleCustomerClick = (customer , id) => {
setSelectedCustomer(customer);
setSelectedCustomerTransactions(transactionsProccess.filter(proccess => proccess.customer_id.toString() === id.toString()));
 }

   return (
    <>
   
<div className="header w-full py-5 bg-slate-600 text-red-400 text-center text-3xl font-bold">
  <h1>Customer Transactions</h1>
</div>

{filterr ? <div className="container mx-auto">
    <div className="input my-5 w-full flex ">
        <input type="text" placeholder='Search by Name ' onChange={(e)=> filteringName(e)} className='inline-block w-1/2 mr-2 p-3 border rounded-md border-slate-500  focus:outline-0' />
        <input type="text" placeholder='Search by Amount ' onChange={filteringAmount} className='inline-block w-1/2 p-3 border rounded-md border-slate-500  focus:outline-0' />
    </div>
    
   
<div className="overflow-x-scroll  w-full">
<table className="border-separate  border-spacing-2 border rounded-md bg-slate-600  border-slate-500 text-center p-3 w-full">
  <thead className=' text-red-400 text-2xl' >
    
    <tr>
      <th className="border border-slate-600 ">Customer Id</th>
      <th className="border border-slate-600 ">Name</th>
      <th className="border border-slate-600  ">Date</th>
      <th className="border border-slate-600 ">Amount</th>
    </tr>
  </thead>
  <tbody className='text-[#eee] '>
    {filterr?.map(customer => <tr key={customer.id} onClick={() => handleCustomerClick(customer , customer.id ) } className='cursor-pointer'>
      <td className="border border-slate-700 rounded-md font-bold">{customer.id}</td>
      <td className="border border-slate-700 rounded-md">{customer.name}</td>
    
    <td className='border border-slate-700 rounded-md '> { customerTransations.filter(proccess => proccess.customer_id.toString() === customer.id.toString()).map(proccess =>   <p key={proccess.id} className=" w-max md:w-full m-auto border-b border-slate-700 ">
        {proccess.date}
     </p>

          )}</td>
    <td className='border border-slate-700 rounded-md'> { customerTransations.filter(proccess => proccess.customer_id.toString() === customer.id.toString()).map(proccess =>   <p key={proccess.id} className=" border-b border-slate-700">
        {proccess.amount}
     </p>

          )}</td>
    </tr>)}
    
    
  </tbody>
</table>
</div>


{selectedCustomer ? <div className="chart py-10 ">
  <Chart selectedCustomer={selectedCustomer} customerTransations={selectedCustomerTransactions} />
</div> :
   <h3 className='py-10 w-full text-center text-3xl text-slate-700 font-bold'>Please select a customer to show the chart</h3>
 }

</div> : <div class=" flex justify-center items-center  min-h-[100vh]">
  <div className="loader h-10"></div>
</div> }

      
    </>
  )
}

import axios from 'axios'
import React, { useState, useEffect } from 'react'
import Header from '../Home/Header/Header'

function Sales() {
    const [sale,setSale] = useState([])
    const response = async()=>{
        try {
            const catagoriesSale = await axios.get("http://localhost:5000/sales")
            setSale(catagoriesSale.data)
        } catch (error) {
            console.error("Error fetching sales data:", error);
        }
    }
    useEffect(() => {
        response();
    }, []);
  return (
    <div className='sale'>
        <Header/>
        {sale.length > 0 ?
        (sale.map((items,index)=>(
            <div>
                <h3>{items.product_name}</h3>
                <img src={items.image} alt={items.product_name} />
                <h5>{items.category}</h5>
                <h5>{items.price}</h5>
            </div>
        ))):(
            <p>Loading...</p>
          )}
    </div>
  )
}

export default Sales
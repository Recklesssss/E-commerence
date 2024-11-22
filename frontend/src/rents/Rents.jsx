import React, {useState,useEffect} from 'react'
import axios from 'axios'
import Header from '../Home/Header/Header'

function Rents() {
    
    const [rent,setRent] = useState([])
    const responseForRents = async()=>{
        try {
            const catagoriesRent = await axios.get("http://localhost:5000/rents")
            setRent(catagoriesRent.data)
        } catch (error) {
            console.error("Error fetching sales data:", error);
        }
    }
    useEffect(() => {
        responseForRents();
    }, []);
  return (
    <div className='sale'>
        <Header/>
        {rent.length > 0 ?
        (rent.map((items,index)=>(
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

export default Rents
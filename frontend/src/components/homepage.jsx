import { useEffect, useState } from 'react'
import axios from 'axios'
function homepage() {
    const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const getData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/products');
      setData(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <div>
        <div>
      <ul>
    {data.map(product => (
      <li key={product._id}>
        {product.name} - ${product.price}
      </li>
    ))}
  </ul>
  </div>
      
    </div>
  )
}

export default homepage

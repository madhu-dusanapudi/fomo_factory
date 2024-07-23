import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { updatePrice } from '../store/priceSlice';
import { setSymbol } from '../store/symbolSlice';
import CustomSelect from "../components/Dropdown";
import axios from 'axios';

const options = ['bitcoin', 'ethereum', 'dogecoin', 'litecoin', 'ripple'];

const Home = () => {
  const dispatch = useDispatch<AppDispatch>();
  const prices = useSelector((state: RootState) => state?.prices?.data?.prices);
  const symbol = useSelector((state: RootState) => state?.symbol?.symbol);

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/prices`, {
        params: { symbol }
      });
      dispatch(updatePrice(response.data)); 
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();

    const interval = setInterval(() => {
      fetchData();
    }, 5000);

    return () => clearInterval(interval);
  }, [symbol, dispatch]);

  const handleDropDown = (item: string) => {
    dispatch(setSymbol(item));
  };

  useEffect(() => {
    console.log('Prices in Redux state:', prices);
  }, [prices]);

  return (
    <div className="main">
      <h1>Real-Time Price Data</h1>
      <CustomSelect
        value={symbol}
        onChange={handleDropDown}
        options={options}
        placeholder="Choose an option..."
      />

      <table className="PriceTable">
        <thead>
          <tr>
            <th>Symbol</th>
            <th>Price</th>
            <th>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {prices && prices.map((price: any) => (
            <tr key={price.timestamp}>
              <td>{price.symbol}</td>
              <td>{price.price}</td>
              <td>{new Date(price.timestamp).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Home;

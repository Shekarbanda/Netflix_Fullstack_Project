import './App.css';
import Body from './Components/Body';
import Footer from './Components/Footer';
import Header from './Components/Header';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


function App() {
  const url = useSelector((state)=>state.backend.url);
  const nav = useNavigate();
  useEffect(()=>{
    is_login();
  },[]);

  async function is_login() {
    try {
        const is_user = await axios.get(url, {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        });
    } catch (err) {
        
    }
    
}
  return (
    <>
      <Header></Header>
      <Body></Body>
      <Footer></Footer>
    </>
  );
}

export default App;

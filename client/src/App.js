import './App.css';
import {Route, Routes, BrowserRouter as Router} from "react-router-dom"
import { SignUp } from './component/user_form/Signup_Form';
import { SignIn } from './component/user_form/signin_form';
import {Provider} from "react-redux";
import { store } from './redux/store';
import {AccessLog} from './component/accesslog/AccessLogForm';
import { ShowChart } from './component/chart/chart';

function App() {
  return (
    <>
    <Provider store={store}>
    <Router>
      <Routes>
        <Route path='/' element={<SignIn/>}/>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/log' element={<ShowChart/>}/>
      </Routes>
    </Router>
    </Provider>
    </>
  );
}

export default App;

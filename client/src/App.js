// import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Home from './pages/Home';
import Login from './pages/Login';
import Admin from './pages/Admin';
import Register from './pages/Register';
import ProtectedRoute from './components/ProtectedRoute';
import {Provider} from 'react-redux';
import store from './redux/store';
import Partner from './pages/Partner';
import SingleMovie from './pages/Home/singleMovie';
import BookShow from './pages/Home/BookShow';
import ForgotPassword from './pages/User/ForgotPassword';
import ResetPassword from './pages/User/ResetPassword';
function App() {
  return (
    <div className="App">
      <Provider store={store}>
<BrowserRouter>
<Routes>
  <Route path="/"
   element={
   <ProtectedRoute>
    <Home />
    </ProtectedRoute>
    }/>
  <Route path="/login" element={<Login />}/>
  <Route path="/register" element={<Register />}/>
  
  <Route path="/admin" element={
    <ProtectedRoute>
    <Admin />
    </ProtectedRoute>
  }/>

  <Route path="/partner" element={
    <ProtectedRoute>
    <Partner />
    </ProtectedRoute>
   }/> 
     <Route path="/movie/:movie_id" element={
    <ProtectedRoute>
    <SingleMovie />
    </ProtectedRoute>
   }/>
     <Route path="/book-show/:show_id" element={
    <ProtectedRoute>
    <BookShow />
    </ProtectedRoute>
   }/>
      <Route path="/forgot_password" element={<ForgotPassword />}/>
      <Route path="/resetpassword/:email" element={<ResetPassword />}/>

</Routes>
</BrowserRouter>
</Provider>
    </div>
  );
}

export default App;

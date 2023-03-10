import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import { authenticate } from './store/session';
import PaymentMethods from './components/payment';
import Sidebar from './components/sidebar';
import PaymentDetails from './components/PaymentDetails';
import AllTransaction from './components/AllTransactions';
import CreateTransaction from './components/PostTransaction';
import HomePage from './components/HomePage';
import TransactionDetails from './components/TransactionDetails';
import UserTransactions from './components/UserTransactions';



function App() {

  const user = useSelector(state => state.session.user)

  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }



  return (
    <BrowserRouter>
      {/* <NavBar /> */}
      <div className='page-container'>
        <Sidebar />
        <Switch>
          <Route path='/login' exact={true}>
            <LoginForm />
          </Route>
          <Route path='/sign-up' exact={true}>
            <SignUpForm />
          </Route>
          <ProtectedRoute path='/users' exact={true} >
            <UsersList />
          </ProtectedRoute>
          <ProtectedRoute path='/users/:userId' exact={true} >
            <User />
          </ProtectedRoute>
          <Route path='/:id/send' exact={true} >
            <CreateTransaction />
          </Route>
          <Route path='/:id/send' exact={true} >
            <CreateTransaction />
          </Route>

          {user &&
            <Route path='/' exact={true} >
              <AllTransaction />

            </Route>}

          <Route path='/' exact={true} >
            <HomePage />
          </Route>

          <Route path='/home' exact={true}>
            <AllTransaction />
          </Route>

          <Route path='/user-transactions' exact={true}>
            <UserTransactions />
          </Route>

          <Route path='/:id/payment-methods' exact={true} >
            <PaymentMethods />
          </Route>
          <Route path='/:id/payment-method-details' exact={true} >
            <PaymentDetails />
          </Route>

          <Route path='/:id/transaction'>
            <TransactionDetails />
          </Route>


        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;

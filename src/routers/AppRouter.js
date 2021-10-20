import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { getAuth, onAuthStateChanged } from '@firebase/auth';
import { AuthRouter } from "./AuthRouter";
import { JournalScreen } from "../components/journal/JournalScreen";
import { PrivateRoute } from "./PrivateRoute";

import { BrowserRouter as Router, Switch, Redirect } from "react-router-dom";
import { login } from "../actions/auth";
import { PublicRoute } from "./PublicRoute";
import { startLoadingNotes } from "../actions/notes";

export const AppRouter = () => {

  const dispatch = useDispatch();


  const [ checking, setChecking ] = useState(true);
  const [ isLoggedIn, setIsLoggedIn ] = useState(false);


  useEffect(() => {
        
    const auth = getAuth();
    onAuthStateChanged(auth, async (user) =>{

      if( user?.uid ) {
        dispatch( login(user.uid, user.displayName) );
        setIsLoggedIn(true);

        dispatch( startLoadingNotes(user.uid));
      } else {
        setIsLoggedIn(false);
      }

      setChecking(false);
      

    })
    
}, [ dispatch, setChecking, setIsLoggedIn ]);

  if (checking) {

    return (
        <h1>Loading...</h1>

    )
    
  }

  return (
    <Router>
      <div>
        <Switch>
          <PublicRoute isAuthenticated={ isLoggedIn }  path="/auth" component={AuthRouter} />
          <PrivateRoute exact isAuthenticated={ isLoggedIn } path="/" component={JournalScreen} />

          <Redirect to="/auth/login" />
        </Switch>
      </div>
    </Router>
  );
};

import React from 'react'
import './App.css';
import HomePage from './components/homepage/homepage'
import { Route, Switch, Redirect } from 'react-router-dom'
import ShopPage from './components/shop/shop'

import Header from './components/header/header'
import SignInUp from './components/pages/sign-in-up/sign-in-up'
import { auth, createUserProfileDocument } from './firebase/firebase.util'
import { connect } from 'react-redux'
import { setCurrentUser } from './redux/user/user.actions'
import { selectCurrentUser } from './redux/user/user.selectors'
import { createStructuredSelector } from 'reselect'
import CheckoutPage from './components/pages/checkout/checkout'


class App extends React.Component {
  unsubscribeFromAuth = null;

  componentDidMount(){
    const {setCurrentUser} = this.props 

   this.unsubscribeFromAuth = auth.onAuthStateChanged( async userAuth => {
      if(userAuth){
        const userRef = await createUserProfileDocument(userAuth)

        userRef.onSnapshot(snapShot => {
          setCurrentUser({
              id: snapShot.id,
              ...snapShot.data()
            })
          })
      } 
      setCurrentUser(userAuth)
    })
  }

  componentWillUnmount(){

  }

  render() {
  return (
    <div>
    <Header />
      <Switch>
      <Route exact path='/' component={HomePage} />
      <Route path='/shop' component={ShopPage} />
      <Route exact path='/checkout' component={CheckoutPage} />
      <Route exact 
      path='/signin' 
      render={() => 
        this.props.currentUser ? (
          <Redirect to='/' />
        ) : (
          <SignInUp />
        ) }
          />
      </Switch>
    </div>
  );
  }
}


const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

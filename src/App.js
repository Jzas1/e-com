import React from 'react'
import './App.css';
import HomePage from './components/homepage/homepage'
import { Route, Switch } from 'react-router-dom'
import ShopPage from './components/shop/shop'
import Header from './components/header/header'
import SignInUp from './components/pages/sign-in-up/sign-in-up'
import { auth, createUserProfileDocument } from './firebase/firebase.util'

class App extends React.Component {
  constructor(){
    super()

    this.state = {
      currentUser: null
    }
  }

  unsubscribeFromAuth = null;

  componentDidMount(){
   this.unsubscribeFromAuth = auth.onAuthStateChanged( async userAuth => {
      if(userAuth){
        const userRef = await createUserProfileDocument(userAuth)

        userRef.onSnapshot(snapShot => {
          this.setState({
            currentUser: {
              id: snapShot.id,
              ...snapShot.data()
            }
          })
          console.log(this.state)
        })
      } 
      this.setState({ currentUser: userAuth })
    })
  }

  componentWillUnmount(){
    this.unsubscribeFromAuth()
  }

  render() {
  return (
    <div>
    <Header currentUser={this.state.currentUser}/>
      <Switch>
      <Route exact path='/' component={HomePage} />
      <Route path='/shop' component={ShopPage} />
      <Route path='/signin' component={SignInUp} />
      </Switch>
    </div>
  );
  }
}

export default App;


import React from 'react';

import SignIn from '../../sign-in/sign-in'
import SignUp from '../../sign-up/sign-up'

import './sign-in-up.scss'

const SignInUp = () => (
    <div className='sign-in-and-sign-up'>
        <SignIn />
        <SignUp />
    </div>
)

export default SignInUp
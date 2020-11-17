import React from 'react'
import { withRouter } from 'react-router-dom'

import './homepage.scss'
import Directory from '../../components/directory/directory'


const HomePage = ({ history }) => (
    <div className='homepage'>
       <Directory history={history} />
    </div>
)

export default HomePage
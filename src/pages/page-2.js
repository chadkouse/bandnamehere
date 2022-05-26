import React from 'react'
import { Link } from 'gatsby'

import Layout from '../components/layout'

const SecondPage = () => (
  <Layout>
    <h1>Merch!</h1>
    <p>Please visit our facebook store to purchase merchandise</p>
    <Link to="/">Go back to the homepage</Link>
  </Layout>
)

export default SecondPage

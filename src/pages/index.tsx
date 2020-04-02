import { Link } from 'gatsby'
import React, { FC } from 'react'
import Layout from '../components/layout'
import SEO from '../components/seo'

const IndexPage: FC = () => (
  <Layout>
    <SEO title="Home" />
    <h1>Hi people</h1>
    <p>Welcome to your new Gatsby site.</p>
    <p>Now go build something great.</p>
    <Link to="/posts">Read posts</Link>
  </Layout>
)

export default IndexPage

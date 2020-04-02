import { graphql, Link } from 'gatsby'
import React, { FC } from 'react'
import Layout from '../components/layout'
import SEO from '../components/seo'
import { PostQuery } from '../graphqlTypes'

interface Props {
  data: PostQuery
}

const Post: FC<Props> = ({ data }) => (
  <Layout>
    <SEO title={data.datoCmsPost.title} />
    <div dangerouslySetInnerHTML={{ __html: data.datoCmsPost.content }} />
    <Link to="/posts">
      <button>Go Back</button>
    </Link>
  </Layout>
)

export const query = graphql`
  query Post($slug: String!) {
    datoCmsPost(slug: { eq: $slug }) {
      title
      content
    }
  }
`
export default Post

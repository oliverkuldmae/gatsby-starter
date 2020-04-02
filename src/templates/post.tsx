import { graphql, Link } from 'gatsby'
import React, { FC, Fragment } from 'react'
import SEO from '../components/seo'
import { PostQuery } from '../graphqlTypes'

interface Props {
  data: PostQuery
}

const Post: FC<Props> = ({ data }) => (
  <Fragment>
    <SEO title={data.datoCmsPost.title} />
    <div dangerouslySetInnerHTML={{ __html: data.datoCmsPost.content }} />
    <Link to="/">
      <button>Go Back</button>
    </Link>
  </Fragment>
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

import { graphql, Link } from 'gatsby'
import React, { FC } from 'react'
import Layout from '../components/layout'
import SEO from '../components/seo'
import { PostsQuery } from '../graphqlTypes'

interface Props {
  data: PostsQuery
}

const PostsPage: FC<Props> = ({ data }) => (
  <Layout>
    <SEO title="Home" />
    {data.allDatoCmsPost.edges.map(({ node: post }) => (
      <Link key={post.slug} to={`/posts/${post.slug}`}>
        {post.title}
      </Link>
    ))}
  </Layout>
)

export const query = graphql`
  query Posts($skip: Int! = 0, $limit: Int! = 5) {
    allDatoCmsPost(
      sort: { fields: [meta___createdAt], order: DESC }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          slug
          title
          content
        }
      }
    }
  }
`

export default PostsPage

const path = require(`path`)

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return new Promise((resolve) => {
    graphql(`
      {
        allDatoCmsPost {
          edges {
            node {
              slug
            }
          }
        }
      }
    `).then((result) => {
      result.data.allDatoCmsPost.edges.forEach(({ node: post }) => {
        createPage({
          path: `posts/${post.slug}`,
          component: path.resolve(`./src/templates/post.tsx`),
          context: { slug: post.slug },
        })
      })
      resolve()
    })
  })
}

const path = require(`path`)

exports.createPages = async ({ graphql, actions, reporter }) => {
  const result = await graphql(`
    {
      allDatoCmsPost(
        sort: { fields: [meta___createdAt], order: DESC }
        limit: 1000
      ) {
        edges {
          node {
            slug
          }
        }
      }
    }
  `)

  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }

  const posts = result.data.allDatoCmsPost.edges
  const postTemplate = path.resolve('./src/templates/post.tsx')

  posts.forEach(({ node: post }, index) => {
    const previous = index === posts.length - 1 ? null : posts[index + 1].node
    const next = index === 0 ? null : posts[index - 1].node
    actions.createPage({
      path: `/posts/${post.slug}`,
      component: postTemplate,
      context: { slug: post.slug, previous, next },
    })
  })

  const postsPerPage = 6
  const numPages = Math.ceil(posts.length / postsPerPage)
  const postsTemplate = path.resolve('./src/templates/posts.tsx')

  Array.from({ length: numPages }).forEach((_, i) => {
    actions.createPage({
      path: i === 0 ? `/posts` : `/posts/${i + 1}`,
      component: postsTemplate,
      context: {
        limit: postsPerPage,
        skip: i * postsPerPage,
        numPages,
        currentPage: i + 1,
      },
    })
  })
}

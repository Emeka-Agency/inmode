exports.onCreateWebpackConfig = ({actions}) => {
  actions.setWebpackConfig({
    resolve: {
      // It's important to have 'node_modules' in resolve module,
      // otherwise the webpack resolve won't be able to find dependencies
      // correctly.
      modules: ['node_modules']
    }
  })
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const result = await graphql(
    `
      {
        addons: allStrapiAddonTemplates {
          edges {
            node {
              id
              TitrePage
            }
          }
        }
      }
    `
  )

  if (result.errors) {
    throw result.errors
  }

  // Create addons pages.
  const addons = result.data.addons.edges

  const AddonTemplates = require.resolve("./src/templates/addon.js")

  addons.forEach((addon, index) => {
    console.log(addon.node.TitrePage);
    createPage({
      path: `/addon/${addon.node.TitrePage}`,
      component: AddonTemplates,
      context: {
        id: addon.node.id,
      },
    })
  })
}
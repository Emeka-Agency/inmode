const { crc32 } = require('crc');

    exports.onCreateWebpackConfig = ({
    actions
}) => {
    actions.setWebpackConfig({
        resolve: {
            // It's important to have 'node_modules' in resolve module,
            // otherwise the webpack resolve won't be able to find dependencies
            // correctly.
            modules: ['node_modules']
        }
    })
}

exports.onCreatePage = async ({
    page,
    actions
}) => {
    const {
        createPage,
        deletePage
    } = actions
    deletePage(page)
    // You can access the variable "house" in your page queries now

    if (page.path == '/test/') {
        return false;
    }

    if (page.path == '/testimonials/') {
        return false;
    }

    // console.log(page.path);

    createPage({
        ...page,
        context: {
            ...page.context,
            today_string: new Date().toISOString(),
        },
    })
}

exports.createPages = async ({
    graphql,
    actions
}) => {
    
    const {
        createPage
    } = actions

    const result = await graphql(
        `
      {
        addons: allStrapiAddon {
          edges {
            node {
              id
              Name
              Page_addon
              MenuParams {
                url
              }
            }
          }
        }
        products: allStrapiProduct {
          edges {
            node {
              id
              Name
              MenuParams {
                url
              }
            }
          }
        }
        treatments: allStrapiTreatment {
          edges {
            node {
              id
              Name
              MenuParams {
                url
              }
            }
          }
        }
        articles: allStrapiArticle(sort: {fields: strapiId, order: DESC}) {
            nodes {
                id
                strapiId
            }
        }
      }
    `
    );

    if (result.errors) {
        throw result.errors
    }

    // Create addons pages.
    const addons = result.data.addons.edges

    const AddonTemplates = require.resolve("./src/templates/addon.tsx")

    addons.forEach((addon, index) => {
        addon.node.Page_addon && createPage({
            path: addon.node.MenuParams.url,
            component: AddonTemplates,
            context: {
                id: addon.node.id,
            },
        })
    });

    // Create products pages.
    const products = result.data.products.edges

    const ProductTemplates = require.resolve("./src/templates/product.tsx")

    products.forEach((product, index) => {
        createPage({
            path: product.node.MenuParams.url,
            component: ProductTemplates,
            context: {
                id: product.node.id,
            },
        })
    });

    // Create treatments pages.
    const treatments = result.data.treatments.edges

    const TreatmentTemplates = require.resolve("./src/templates/treatment.tsx")

    treatments.forEach((treatment, index) => {
        createPage({
            path: treatment.node.MenuParams.url,
            component: TreatmentTemplates,
            context: {
                id: treatment.node.id
            },
        })
    });

    // Create articles pages.
    const articles = result.data.articles.nodes;

    const ArticleTemplates = require.resolve("./src/templates/article.tsx")

    articles.forEach((article, index) => {
        // console.log(JSON.stringify(article));
        createPage({
            path: "blog" + "/" + (typeof article.strapiId == "number" ? crc32((article.strapiId).toString()).toString(16) : crc32(article.strapiId).toString(16)),
            component: ArticleTemplates,
            context: {
                id: article.id
            },
        })
    });
}
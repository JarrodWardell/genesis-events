import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

const ViewStorePage = () => {
  return (
    <>
      <MetaTags
        title="ViewStore"
        // description="ViewStore description"
        /* you should un-comment description and add a unique description, 155 characters or less
      You can look at this documentation for best practices : https://developers.google.com/search/docs/advanced/appearance/good-titles-snippets */
      />

      <h1>ViewStorePage</h1>
      <p>
        Find me in <code>./web/src/pages/ViewStorePage/ViewStorePage.js</code>
      </p>
      <p>
        My default route is named <code>viewStore</code>, link to me with `
        <Link to={routes.viewStore()}>ViewStore</Link>`
      </p>
    </>
  )
}

export default ViewStorePage

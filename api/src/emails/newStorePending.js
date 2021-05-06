import mjml2html from 'mjml'
import emailTemplate1 from './template'

const newStorePending = ({ options = {}, store }) => {
  const htmlOutput = mjml2html(
    emailTemplate1(
      `
      <mj-column>
        <mj-text mj-class="header">
          The following store is pending: ${store.name}
        </mj-text>
        <mj-text mj-class="body">
          Login now to approve this store.
        </mj-text>
      </mj-column>
      `
    ),
    options
  )

  return htmlOutput
}

export default newStorePending

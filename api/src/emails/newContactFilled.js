import mjml2html from 'mjml'
import emailTemplate1 from './template'

const newContactFilled = ({ options = {}, contact }) => {
  const htmlOutput = mjml2html(
    emailTemplate1(
      `
      <mj-column>
        <mj-text mj-class="header">
          User ${contact.name} (${contact.email}) has filled out a contact form
        </mj-text>
        <mj-text mj-class="body">
          ${contact.text}
        </mj-text>
        <mj-text mj-class="body">
          View the contact form here:
        </mj-text>
        <mj-button background-color="#F63A4D" href="${process.env.FRONTEND_URL}/admin/contacts/${contact.id}">
            Contact Form
          </mj-button>
      </mj-column>
      `
    ),
    options
  )

  return htmlOutput
}

export default newContactFilled

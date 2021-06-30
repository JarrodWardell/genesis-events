import mjml2html from 'mjml'
import emailTemplate1 from './template'

const newContactFilled = ({ options = {}, contact }) => {
  const htmlOutput = mjml2html(
    emailTemplate1(
      `
      <mj-column>
        <mj-image width="75px" align="left" src="https://firebasestorage.googleapis.com/v0/b/genesis-events.appspot.com/o/Logo.png?alt=media&token=2169a5b8-9bc0-4647-ae70-a7f41db78a59" />
        <mj-text mj-class="header">
          User ${contact.name} (${contact.email}) has filled out a contact form
        </mj-text>
        <mj-text mj-class="body">
          ${contact.text}
        </mj-text>
        <mj-text mj-class="body">
          View the contact form here:
        </mj-text>
        <mj-button background-color="#047857" color="white" href="${process.env.FRONTEND_URL}/admin/contacts/${contact.id}">
          Contact Form
        </mj-button>
        <mj-text><p>Or follow the link here: ${process.env.FRONTEND_URL}/admin/contacts/${contact.id}</p></mj-text>
      </mj-column>
      `
    ),
    options
  )

  return htmlOutput
}

export default newContactFilled

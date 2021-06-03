import mjml2html from 'mjml'
import emailTemplate1 from './template'

const tournamentCancelledEO = ({ options = {}, tournament }) => {
  const htmlOutput = mjml2html(
    emailTemplate1(
      `
      <mj-column>
        <mj-text mj-class="header">
          The tournament ${tournament.name} has been successfully cancelled.
        </mj-text>
        <mj-text mj-class="body">
          If you have not done this intentionally, please let the admin team know.
        </mj-text>
      </mj-column>
      `
    ),
    options
  )

  return htmlOutput
}

export default tournamentCancelledEO

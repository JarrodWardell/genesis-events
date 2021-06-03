import mjml2html from 'mjml'
import emailTemplate1 from './template'

const tournamentCancelledPlayer = ({ options = {}, player, tournament }) => {
  const htmlOutput = mjml2html(
    emailTemplate1(
      `
      <mj-column>
        <mj-text mj-class="header">
          The tournament ${tournament.name} has been cancelled.
        </mj-text>
        <mj-text mj-class="body">
          Sorry for the inconvenience.
        </mj-text>
      </mj-column>
      `
    ),
    options
  )

  return htmlOutput
}

export default tournamentCancelledPlayer

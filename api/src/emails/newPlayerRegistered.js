import mjml2html from 'mjml'
import emailTemplate1 from './template'

const newPlayerRegistered = ({ options = {}, player, tournament }) => {
  const htmlOutput = mjml2html(
    emailTemplate1(
      `
      <mj-column>
        <mj-text mj-class="header">
          The player ${player.nickname} has registered for your tournament: ${tournament.name}
        </mj-text>
        <mj-text mj-class="body">
          Login now to view the tournament players.
        </mj-text>
      </mj-column>
      `
    ),
    options
  )

  return htmlOutput
}

export default newPlayerRegistered

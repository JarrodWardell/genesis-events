import mjml2html from 'mjml'
import emailTemplate1 from './template'

const tournamentEditedEO = ({
  options = {},
  prevTournament,
  tournament,
  owner,
  adminEmail = false,
}) => {
  const htmlOutput = mjml2html(
    emailTemplate1(
      `
      <mj-column>
        <mj-image width="75px" align="left" src="https://firebasestorage.googleapis.com/v0/b/genesis-events.appspot.com/o/Logo.png?alt=media&token=2169a5b8-9bc0-4647-ae70-a7f41db78a59" />
        <mj-text mj-class="header">
          The Tournament you created has been updated!
        </mj-text>
        <mj-text mj-class="body">
          Hello ${owner.nickname}
        </mj-text>
        <mj-text mj-class="body">
          We would like to inform you that the Tournament you created that was to take place on ${
            new Date(prevTournament.startDate).toLocaleString().split(',')[0]
          } located at ${prevTournament.locationName}, ${
        prevTournament.street1
      } at ${
        new Date(prevTournament.startDate).toLocaleString().split(',')[1]
      } has been successfully updated.
        </mj-text>
        <mj-text mj-class="body">
          Please see below for the following changes:
        </mj-text>
        <mj-text mj-class="body">
        ${prevTournament.name !== tournament.name ? tournament.name : ''}
      </mj-text>
        <mj-text>
        ${
          prevTournament.startDate !== tournament.startDate
            ? new Date(tournament.startDate).toLocaleString().split(',')[0]
            : ''
        }
        </mj-text>
        <mj-text>
        ${
          prevTournament.locationName !== tournament.locationName
            ? tournament.locationName
            : ''
        }
        </mj-text>
        <mj-text mj-class="body">
          Visit the following link to view the tournament details in full
        </mj-text>
        <mj-button background-color="#047857" color="white" href="${
          process.env.FRONTEND_URL
        }/tournament/${tournament.tournamentUrl}/rounds">
          ${tournament.name} Tournament Page
        </mj-button>
        <mj-text>
        ${
          adminEmail
            ? 'This is a copy of the email sent to the event organizers'
            : ''
        }
        </mj-text>
      </mj-column>
      `
    ),
    options
  )

  return htmlOutput
}

export default tournamentEditedEO

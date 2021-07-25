import mailgun from 'mailgun-js'

const mg = mailgun({
  apiKey: process.env.MAILGUN_API_KEY,
  domain: process.env.MAILGUN_BASE_URL,
})

export const sendEmail = async ({ to, subject, text, html }) => {
  const data = {
    from: 'Genesis Event Organizer <noreply@mail.geo.genesisbattlesofchampions.com>',
    to,
    subject,
    text,
    html,
  }

  await mg.messages().send(data, (error, body) => {
    console.log('Body', body)
    console.log('Err', error)
  })
}

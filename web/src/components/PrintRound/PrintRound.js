class PrintRound extends React.Component {
  getMatch = (match) => {}

  render() {
    const { round, tournament } = this.props

    return (
      <div className="print flex">
        <h1 className="text-center w-full mb-4 text-xl">
          {tournament.name} - Round {round.roundNumber} - Print Sheet
        </h1>
        <h2 className="text-center w-full mb-4 text-md">
          {new Date().toDateString()}
        </h2>
        <table className="w-full">
          <tr>
            <th className="py-2 text-center">Match #</th>
            <th className="py-2 text-center">Player 1 Nickname</th>
            <th className="py-2 text-center">Player 1 Score</th>
            <th className="py-2 text-center">Player 1 Signature</th>
            <th className="py-2 text-center">Player 2 Nickname</th>
            <th className="py-2 text-center">Player 2 Score</th>
            <th className="py-2 text-center">Player 2 Signature</th>
          </tr>
          {round?.matches.map((match, index) => (
            <tr key={match.id}>
              <td className="mr-2 text-center">{index + 1}</td>
              {match?.players?.map((playerScore) => (
                <>
                  <td className="py-2 text-center">
                    {playerScore?.user?.nickname}
                  </td>

                  <td className="py-2 text-center font-bold">
                    {playerScore?.bye ? (
                      'BYE'
                    ) : (
                      <span>{playerScore?.score}</span>
                    )}
                  </td>
                  <td className="py-2">
                    <div className="ml-4 border-b border-black w-20 h-4" />
                  </td>
                </>
              ))}
            </tr>
          ))}
        </table>
      </div>
    )
  }
}

export default PrintRound

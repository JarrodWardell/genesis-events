import ProfilePicture from '../ProfilePicture/ProfilePicture'

const PlayerProfileItem = ({ player, className = '', showPhoto = true }) => {
  let { nickname, photo } = player

  return (
    <div className={`flex items-center` + className}>
      {showPhoto && (
        <div className="mr-4">
          <ProfilePicture pic={photo} size="12" />
        </div>
      )}
      <span>{nickname}</span>
    </div>
  )
}

export default PlayerProfileItem

import ProfilePicture from '../ProfilePicture/ProfilePicture'
import UserPictureSelectorCell from '../UserPictureSelectorCell/UserPictureSelectorCell'

const UserPictureSelector = ({ userPicture, selectImage }) => {
  const [isSelectorOpen, setIsSelectorOpen] = React.useState(false)

  return (
    <div className="relative mx-auto my-4">
      <button
        type="button"
        className="bg-white rounded-full flex text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        id="user-menu-button"
        aria-expanded={isSelectorOpen}
        aria-haspopup="true"
        onClick={() => setIsSelectorOpen(!isSelectorOpen)}
      >
        <span className="sr-only">Open user image selector</span>
        <ProfilePicture pic={userPicture} />
      </button>
      {isSelectorOpen && (
        <div className="absolute max-h-60 w-96 bg-white  border-2 z-20 grid grid-cols-4 gap-2 p-4 overflow-y-scroll shadow-md">
          <UserPictureSelectorCell
            selectImage={(image) => selectImage(image)}
          />
        </div>
      )}
    </div>
  )
}

export default UserPictureSelector

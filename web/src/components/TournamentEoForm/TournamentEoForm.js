import { useAuth } from '@redwoodjs/auth'
import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  NumberField,
  Submit,
  HiddenField,
} from '@redwoodjs/forms'
import { useMutation } from '@redwoodjs/web'
import { useForm, Controller } from 'react-hook-form'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'
import CreatableSelect from 'react-select/creatable'
import { getAddress } from 'src/helpers/formatAddress'
import { EditorState } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'
import { navigate } from '@redwoodjs/router'
import toast from 'react-hot-toast'
import { stateFromHTML } from 'draft-js-import-html'
import { stateToHTML } from 'draft-js-export-html'
import { TOURNAMENT_BY_URL } from 'src/pages/ViewTournamentPage/ViewTournamentPage'
import ReactDatePicker from 'react-datepicker'

import 'react-datepicker/dist/react-datepicker.css'
import Button from '../Button/Button'

const CREATE_TOURNAMENT = gql`
  mutation CreateTournamentMutation($input: CreateTournamentInput!) {
    createTournament(input: $input) {
      id
      name
      tournamentUrl
    }
  }
`

const UPDATE_TOURNAMENT = gql`
  mutation updateTournament($id: Int!, $input: UpdateTournamentInput!) {
    updateTournament(id: $id, input: $input) {
      id
      name
      tournamentUrl
    }
  }
`

const CANCEL_TOURNAMENT = gql`
  mutation cancelTournament($id: Int!) {
    cancelTournament(id: $id) {
      id
      tournamentUrl
    }
  }
`

const formatDatetime = (value) => {
  if (value) {
    return value.replace(/:\d{2}\.\d{3}\w/, '')
  }
}

const TournamentEOForm = ({ tournament }) => {
  const { currentUser } = useAuth()
  const formMethods = useForm()
  const [locationName, setLocationName] = React.useState('')
  const [street1, setStreet1] = React.useState('')
  const [desc, setDesc] = React.useState(EditorState.createEmpty())
  const [confirmCancel, setConfirmCancel] = React.useState(false)

  React.useEffect(() => {
    if (tournament?.desc) {
      let contentState = stateFromHTML(tournament?.desc)
      setDesc(EditorState.createWithContent(contentState))
    }

    if (tournament?.startDate) {
      formMethods.setValue('startDate', new Date(tournament?.startDate))
    }

    formMethods.setValue('locationName', tournament?.locationName)
    formMethods.setValue('storeId', tournament?.storeId)
    formMethods.setValue('country', tournament?.country)
    formMethods.setValue('zip', tournament?.zip)
    formMethods.setValue('city', tournament?.city)
    formMethods.setValue('state', tournament?.state)
    formMethods.setValue('lat', tournament?.lat)
    formMethods.setValue('lng', tournament?.lng)

    setLocationName(tournament?.locationName)
    setStreet1(tournament?.street1)
  }, [tournament])

  const [createTournament, { loading: createTournamentLoading }] = useMutation(
    CREATE_TOURNAMENT,
    {
      onCompleted: ({ createTournament }) => {
        toast.success(
          `Successfully created ${createTournament.name} Tournament`
        )
        navigate(`/tournament/${createTournament.tournamentUrl}/rounds`)
      },
    }
  )

  const [updateTournament, { loading: updateTournamentLoading }] = useMutation(
    UPDATE_TOURNAMENT,
    {
      onCompleted: ({ updateTournament }) => {
        toast.success(
          `Successfully updated ${updateTournament.name} Tournament`
        )
        navigate(`/tournament/${updateTournament.tournamentUrl}/rounds`)
      },
      refetchQueries: [
        {
          query: TOURNAMENT_BY_URL,
          variables: { url: tournament?.tournamentUrl },
        },
      ],
    }
  )

  const [cancelTournament, { loading: cancelTournamentLoading }] = useMutation(
    CANCEL_TOURNAMENT,
    {
      onCompleted: ({ cancelTournament }) => {
        toast(`Successfully cancelled ${cancelTournament.name} Tournament`)
        navigate(`/tournament/${cancelTournament.tournamentUrl}/rounds`)
      },
      refetchQueries: [
        {
          query: TOURNAMENT_BY_URL,
          variables: { url: tournament?.tournamentUrl },
        },
      ],
    }
  )

  const onSubmit = (data) => {
    let markup = stateToHTML(desc.getCurrentContent())
    console.log(data)
    var input = {
      ...data,
      street1,
      locationName,
      desc: markup,
      lat: data.lat ? parseFloat(data.lat) : null,
      lng: data.lng ? parseFloat(data.lng) : null,
    }

    input['name'] = data.tournamentName
    delete input.tournamentName
    if (input.storeId === '') {
      delete input.storeId
    }

    if (tournament?.id) {
      updateTournament({
        variables: {
          id: tournament.id,
          input,
        },
      })
    } else {
      createTournament({
        variables: {
          input,
        },
      })
    }
  }

  const onDescChange = (editorState) => setDesc(editorState)

  const onStoreSelect = (data) => {
    var addr = data.value
    setLocationName(addr.name)
    setStreet1(addr.street1)
    console.log(addr)
    formMethods.setValue('locationName', addr.name)
    formMethods.setValue('country', addr.country)
    formMethods.setValue('zip', addr.zip)
    formMethods.setValue('city', addr.city)
    formMethods.setValue('state', addr.state)
    formMethods.setValue('lat', addr.lat)
    formMethods.setValue('lng', addr.lng)
    formMethods.setValue('storeId', addr.id)
  }

  const onCreateLocation = (data) => {
    setLocationName(data)
    formMethods.setValue('locationName', data)
    formMethods.setValue('country', null)
    formMethods.setValue('zip', null)
    formMethods.setValue('city', null)
    formMethods.setValue('state', null)
    formMethods.setValue('lat', null)
    formMethods.setValue('lng', null)
    formMethods.setValue('storeId', null)
  }

  const onSelectAddress = async (data) => {
    var addr = await getAddress(data.label)
    setStreet1(addr.formatted_address)
    formMethods.setValue('zip', addr.postal_code)
    formMethods.setValue('country', addr.country)
    formMethods.setValue('city', addr.locality)
    formMethods.setValue('state', addr.administrative_area_level_1)
    formMethods.setValue('lat', addr.lat)
    formMethods.setValue('lng', addr.lng)
  }

  if (confirmCancel) {
    return (
      <div className="min-h-screen flex flex-col justify-center">
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-3xl">
          Are you sure you would like to cancel this tournament. This cannot be
          undone.
          <div className="rw-button-group">
            <button
              className="rw-button rw-button-green"
              onClick={() => setConfirmCancel(false)}
            >
              Nevermind
            </button>
            <Submit
              disabled={cancelTournamentLoading}
              className="rw-button rw-button-red"
              onClick={() =>
                cancelTournament({ variables: { id: tournament.id } })
              }
            >
              Cancel Tournament
            </Submit>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col justify-center">
      <div className="sm:mx-auto sm:w-full sm:max-w-3xl">
        <Form
          onSubmit={onSubmit}
          formMethods={formMethods}
          className="grid-cols-1 grid sm:grid-cols-2 gap-4 font-normal"
        >
          <div className="flex flex-col col-span-2">
            <FormError
              wrapperClassName="rw-form-error-wrapper"
              titleClassName="rw-form-error-title"
              listClassName="rw-form-error-list"
            />
          </div>
          <div className="flex flex-col col-span-2">
            <Label
              name="tournamentName"
              className="mt-2"
              errorClassName=" -error"
            >
              Name of Tournament
            </Label>
            <TextField
              name="tournamentName"
              defaultValue={tournament?.name}
              className="border-2 p-2 mt-2 w-full rounded-md shadow-sm"
              errorClassName="border-2 p-2 mt-2 w-full rounded-md shadow-sm border-red-500"
              validation={{ required: true }}
            />
            <FieldError name="tournamentName" className="rw-field-error" />
          </div>

          <div className="flex flex-col w-full col-span-2 sm:col-span-1">
            <Label name="startDate" className="" errorClassName=" -error">
              Start date
            </Label>
            <Controller
              control={formMethods.control}
              name="startDate"
              rules={{
                required: true,
              }}
              render={({ name, value, onChange, ref, onBlur }) => (
                <ReactDatePicker
                  onChange={onChange}
                  selected={value}
                  name={name}
                  customInputRef={ref}
                  onBlur={onBlur}
                  minDate={new Date()}
                  showTimeSelect
                  className="border-2 p-2 mt-2 w-full z-10"
                  errorClassName="border-2 p-2 mt-2 w-full border-red-500"
                  peekNextMonth
                  dateFormat="MMMM d, yyyy h:mm aa"
                  calendarClassName="z-10"
                />
              )}
            />
            <FieldError name="startDate" className="rw-field-error" />
          </div>

          <div className="flex flex-col w-full col-span-2 sm:col-span-1">
            <Label name="maxPlayers" className="" errorClassName=" -error">
              Max players
            </Label>
            <NumberField
              name="maxPlayers"
              defaultValue={tournament?.maxPlayers}
              className="rw-input"
              errorClassName="rw-input rw-input-error"
              min={0}
              validation={{ required: true, validate: () => {} }}
            />
            <FieldError name="maxPlayers" className="rw-field-error" />
          </div>

          <div className="flex flex-col col-span-2">
            <Label
              name="description"
              className=" mt-2"
              errorClassName=" -error"
            >
              Description of Tournament (Optional)
            </Label>
            <Editor
              editorState={desc}
              defaultValue={tournament?.desc}
              onEditorStateChange={onDescChange}
              editorStyle={{
                height: 200,
                overflow: 'auto',
                backgroundColor: 'white',
                padding: '8px',
                marginTop: '-3px',
              }}
              toolbar={{
                inline: { inDropdown: true },
                list: { inDropdown: true },
                textAlign: { inDropdown: true },
                link: { inDropdown: true },
                history: { inDropdown: true },
              }}
              wrapperClassName="border-2 w-full rounded-md shadow-sm"
            />
          </div>

          <div className="flex flex-col col-span-2">
            <Label name="locationName" className="" errorClassName=" -error">
              Location name
            </Label>
            <Controller
              control={formMethods.control}
              defaultValue={tournament?.locationName}
              name="locationName"
              rules={{
                required: true,
              }}
              render={() => (
                <CreatableSelect
                  onCreateOption={onCreateLocation}
                  onChange={onStoreSelect}
                  className="w-full rounded-md shadow-sm"
                  errorClassName="border-2 p-2 mt-2 w-full rounded-md shadow-sm border-red-500"
                  value={{
                    value: locationName,
                    label: locationName,
                  }}
                  options={currentUser?.stores?.map((store) => ({
                    value: store,
                    label: store.name,
                  }))}
                />
              )}
            />
            <FieldError name="locationName" className="rw-field-error" />
          </div>

          <div className="flex flex-col col-span-2">
            <Label name="street1" className="" errorClassName=" -error">
              Address of Tournament (Optional)
            </Label>
            <GooglePlacesAutocomplete
              apiKey={process.env.GOOGLE_API_KEY}
              selectProps={{
                value: {
                  label: street1,
                  value: { description: street1, place_id: '' },
                },
                onChange: onSelectAddress,
              }}
              className="border-2 p-2 mt-2 w-full"
            />
          </div>

          <div className="flex flex-col w-full col-span-2 sm:col-span-1">
            <Label name="city" className="" errorClassName=" -error">
              City (Optional)
            </Label>
            <TextField
              name="city"
              defaultValue={tournament?.city}
              className="rw-input"
              errorClassName="rw-input rw-input-error"
            />
            <FieldError name="city" className="rw-field-error" />
          </div>

          <div className="flex flex-col w-full col-span-2 sm:col-span-1">
            <Label name="state" className="" errorClassName=" -error">
              State (Optional)
            </Label>
            <TextField
              name="state"
              defaultValue={tournament?.state}
              className="rw-input"
              errorClassName="rw-input rw-input-error"
            />
            <FieldError name="state" className="rw-field-error" />
          </div>

          <div className="flex flex-col w-full col-span-2 sm:col-span-1">
            <Label name="country" className="" errorClassName=" -error">
              Country (Optional)
            </Label>
            <TextField
              name="country"
              defaultValue={tournament?.country}
              className="rw-input"
              errorClassName="rw-input rw-input-error"
            />
            <FieldError name="country" className="rw-field-error" />
          </div>

          <div className="flex flex-col w-full col-span-2 sm:col-span-1">
            <Label name="zip" className="" errorClassName=" -error">
              Zip (Optional)
            </Label>
            <TextField
              name="zip"
              defaultValue={tournament?.zip}
              className="rw-input"
              errorClassName="rw-input rw-input-error"
            />
            <FieldError name="zip" className="rw-field-error" />
          </div>

          <div className="col-span-2 flex flex-col w-full col-span-2">
            <Label name="infoUrl" className="" errorClassName=" -error">
              Extra Information URL (Optional)
            </Label>
            <TextField
              name="infoUrl"
              defaultValue={tournament?.infoUrl}
              className="rw-input"
              errorClassName="rw-input rw-input-error"
            />
            <FieldError name="infoUrl" className="rw-field-error" />
          </div>

          <HiddenField name="lat" />
          <HiddenField name="lng" />
          <HiddenField name="storeId" />

          <div className="col-span-2 flex justify-center">
            {tournament?.id && (
              <div
                className="w-full mr-4 text-center py-4 px-4 h-14 sm:h-auto border rounded-md text-white bg-red-700 hover:bg-red-800 justify-center items-center flex flex-col sm:flex-row"
                onClick={() => setConfirmCancel(true)}
              >
                Cancel Tournament
              </div>
            )}
            <Button
              loading={createTournamentLoading || updateTournamentLoading}
              type="submit"
            >
              Submit
            </Button>
          </div>
        </Form>
      </div>
    </div>
  )
}

export default TournamentEOForm
import { useAuth } from '@redwoodjs/auth'
import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  DatetimeLocalField,
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
    formMethods.setValue('locationName', tournament?.locationName)
    formMethods.setValue('storeId', tournament?.storeId)
    formMethods.setValue('country', tournament?.country)
    formMethods.setValue('zip', tournament?.zip)
    formMethods.setValue('city', tournament?.city)
    formMethods.setValue('state', tournament?.state)
    formMethods.setValue('lat', tournament?.lat)
    formMethods.setValue('lng', tournament?.lng)
    formMethods.setValue('storeId', tournament?.id)

    setLocationName(tournament?.locationName)
    setStreet1(tournament?.street1)
  }, [tournament])

  const [createTournament, { loading: createTournamentLoading }] = useMutation(
    CREATE_TOURNAMENT,
    {
      onCompleted: ({ createTournament }) => {
        toast(`Successfully created ${createTournament.name} Tournament`)
        navigate(`/tournament/${createTournament.tournamentUrl}/rounds`)
      },
    }
  )

  const [updateTournament, { loading: updateTournamentLoading }] = useMutation(
    UPDATE_TOURNAMENT,
    {
      onCompleted: ({ updateTournament }) => {
        toast(`Successfully updated ${updateTournament.name} Tournament`)
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

    if (tournament) {
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
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-3xl">
        <Form onSubmit={onSubmit} formMethods={formMethods}>
          <FormError
            wrapperClassName="rw-form-error-wrapper"
            titleClassName="rw-form-error-title"
            listClassName="rw-form-error-list"
          />

          <Label
            name="tournamentName"
            className="rw-label"
            errorClassName="rw-label rw-label-error"
          >
            Tournament Name
          </Label>
          <TextField
            name="tournamentName"
            defaultValue={tournament?.name}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
            validation={{ required: true }}
          />
          <FieldError name="tournamentName" className="rw-field-error" />

          <Label
            name="startDate"
            className="rw-label"
            errorClassName="rw-label rw-label-error"
          >
            Start date
          </Label>
          <DatetimeLocalField
            name="startDate"
            defaultValue={formatDatetime(tournament?.startDate)}
            className="rw-input"
            min={new Date().toISOString().split('T')[0]}
            errorClassName="rw-input rw-input-error"
            validation={{ required: true }}
          />
          <FieldError name="startDate" className="rw-field-error" />

          <Label
            name="maxPlayers"
            className="rw-label"
            errorClassName="rw-label rw-label-error"
          >
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

          <Label
            name="locationName"
            className="rw-label"
            errorClassName="rw-label rw-label-error"
          >
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

          <Label
            name="street1"
            className="rw-label"
            errorClassName="rw-label rw-label-error"
          >
            Address
          </Label>
          <GooglePlacesAutocomplete
            apiKey={process.env.GOOGLE_API_KEY}
            selectProps={{
              value: { label: street1, value: street1 },
              onChange: onSelectAddress,
            }}
            className="border-2 p-2 mt-2 w-full"
          />

          <Label
            name="city"
            className="rw-label"
            errorClassName="rw-label rw-label-error"
          >
            City
          </Label>
          <TextField
            name="city"
            defaultValue={tournament?.city}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
          />
          <FieldError name="city" className="rw-field-error" />

          <Label
            name="country"
            className="rw-label"
            errorClassName="rw-label rw-label-error"
          >
            Country
          </Label>
          <TextField
            name="country"
            defaultValue={tournament?.country}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
          />
          <FieldError name="country" className="rw-field-error" />

          <Label
            name="state"
            className="rw-label"
            errorClassName="rw-label rw-label-error"
          >
            State
          </Label>
          <TextField
            name="state"
            defaultValue={tournament?.state}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
          />
          <FieldError name="state" className="rw-field-error" />

          <Label
            name="zip"
            className="rw-label"
            errorClassName="rw-label rw-label-error"
          >
            Zip
          </Label>
          <TextField
            name="zip"
            defaultValue={tournament?.zip}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
          />
          <FieldError name="zip" className="rw-field-error" />

          <Label
            name="infoUrl"
            className="rw-label"
            errorClassName="rw-label rw-label-error"
          >
            Extra Information URL
          </Label>
          <TextField
            name="infoUrl"
            defaultValue={tournament?.infoUrl}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
          />
          <FieldError name="infoUrl" className="rw-field-error" />

          <Label
            name="description"
            className="rw-label"
            errorClassName="rw-label rw-label-error"
          >
            Description
          </Label>
          <Editor
            editorState={desc}
            defaultValue={tournament?.desc}
            onEditorStateChange={onDescChange}
            toolbar={{
              inline: { inDropdown: true },
              list: { inDropdown: true },
              textAlign: { inDropdown: true },
              link: { inDropdown: true },
              history: { inDropdown: true },
            }}
            wrapperClassName="border-gray-50 border-2 rounded"
          />
          <HiddenField name="lat" defaultValue={tournament?.lat} />
          <HiddenField name="lng" defaultValue={tournament?.lng} />
          <HiddenField name="storeId" defaultValue={tournament?.storeId} />

          <div className="rw-button-group">
            {tournament && (
              <div
                className="rw-button rw-button-red"
                onClick={() => setConfirmCancel(true)}
              >
                Cancel Tournament
              </div>
            )}
            <Submit
              disabled={createTournamentLoading || updateTournamentLoading}
              className="rw-button rw-button-blue"
            >
              Save
            </Submit>
          </div>
        </Form>
      </div>
    </div>
  )
}

export default TournamentEOForm

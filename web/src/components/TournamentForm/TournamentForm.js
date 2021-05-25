import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  DatetimeLocalField,
  NumberField,
  Submit,
} from '@redwoodjs/forms'

const formatDatetime = (value) => {
  if (value) {
    return value.replace(/:\d{2}\.\d{3}\w/, '')
  }
}

const TournamentForm = (props) => {
  const onSubmit = (data) => {
    props.onSave(data, props?.tournament?.id)
  }

  return (
    <div className="rw-form-wrapper">
      <Form onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />

        <Label
          name="name"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Name
        </Label>
        <TextField
          name="name"
          defaultValue={props.tournament?.name}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />
        <FieldError name="name" className="rw-field-error" />

        <Label
          name="tournamentUrl"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Tournament url
        </Label>
        <TextField
          name="tournamentUrl"
          defaultValue={props.tournament?.tournamentUrl}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />
        <FieldError name="tournamentUrl" className="rw-field-error" />

        <Label
          name="startDate"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Start date
        </Label>
        <DatetimeLocalField
          name="startDate"
          defaultValue={formatDatetime(props.tournament?.startDate)}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />
        <FieldError name="startDate" className="rw-field-error" />

        <Label
          name="dateStarted"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Date started
        </Label>
        <DatetimeLocalField
          name="dateStarted"
          defaultValue={formatDatetime(props.tournament?.dateStarted)}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />
        <FieldError name="dateStarted" className="rw-field-error" />

        <Label
          name="dateEnded"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Date ended
        </Label>
        <DatetimeLocalField
          name="dateEnded"
          defaultValue={formatDatetime(props.tournament?.dateEnded)}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />
        <FieldError name="dateEnded" className="rw-field-error" />

        <Label
          name="maxPlayers"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Max players
        </Label>
        <NumberField
          name="maxPlayers"
          defaultValue={props.tournament?.maxPlayers}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />
        <FieldError name="maxPlayers" className="rw-field-error" />

        <Label
          name="locationName"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Location name
        </Label>
        <TextField
          name="locationName"
          defaultValue={props.tournament?.locationName}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />
        <FieldError name="locationName" className="rw-field-error" />

        <Label
          name="infoUrl"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Info url
        </Label>
        <TextField
          name="infoUrl"
          defaultValue={props.tournament?.infoUrl}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />
        <FieldError name="infoUrl" className="rw-field-error" />

        <Label
          name="street1"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Street1
        </Label>
        <TextField
          name="street1"
          defaultValue={props.tournament?.street1}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />
        <FieldError name="street1" className="rw-field-error" />

        <Label
          name="street2"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Street2
        </Label>
        <TextField
          name="street2"
          defaultValue={props.tournament?.street2}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />
        <FieldError name="street2" className="rw-field-error" />

        <Label
          name="city"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          City
        </Label>
        <TextField
          name="city"
          defaultValue={props.tournament?.city}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
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
          defaultValue={props.tournament?.country}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
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
          defaultValue={props.tournament?.state}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
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
          defaultValue={props.tournament?.zip}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />
        <FieldError name="zip" className="rw-field-error" />

        <Label
          name="lat"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Lat
        </Label>
        <TextField
          name="lat"
          defaultValue={props.tournament?.lat}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
          dataType="Float"
        />
        <FieldError name="lat" className="rw-field-error" />

        <Label
          name="lng"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Lng
        </Label>
        <TextField
          name="lng"
          defaultValue={props.tournament?.lng}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
          dataType="Float"
        />
        <FieldError name="lng" className="rw-field-error" />

        <Label
          name="storeId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Store id
        </Label>
        <TextField
          name="storeId"
          defaultValue={props.tournament?.storeId}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />
        <FieldError name="storeId" className="rw-field-error" />

        <Label
          name="ownerId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Owner id
        </Label>
        <TextField
          name="ownerId"
          defaultValue={props.tournament?.ownerId}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />
        <FieldError name="ownerId" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default TournamentForm

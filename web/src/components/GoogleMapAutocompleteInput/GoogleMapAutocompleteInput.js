import React from 'react';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import { getAddress } from 'src/helpers/formatAddress';

const GoogleMapAutocompleteInput = (onSelectAddress = () => {}, placeholder = 'Search Places...') => {
  const [address, setAddress] = React.useState('');

  const onSelect = async (data) => {
    setAddress(data)
    const addressObj = await getAddress(data);
    onSelectAddress(addressObj);
  }

  return (
    <PlacesAutocomplete
      value={address}
      onChange={e => setAddress(e)}
      onSelect={e => onSelect(e)}
    >
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
        <div className='relative flex w-full'>
          <input
            {...getInputProps({
              placeholder,
              className: 'w-full shadow-sm border-gray-300 border rounded-md p-2',
            })}
          />
          <div className='w-full rounded-md absolute' style={{ marginTop: '38px', padding: '4px' }}>
            {loading && <div>Loading...</div>}
            {suggestions.map(suggestion => {
              const className = suggestion.active
                ? 'suggestion-item--active'
                : 'suggestion-item';
              // inline style for demonstration purpose
              const style = suggestion.active
                ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                : { backgroundColor: '#ffffff', cursor: 'pointer' };
              return (
                <div
                  {...getSuggestionItemProps(suggestion, {
                    className,
                    style,
                  })}
                >
                  <span>{suggestion.description}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </PlacesAutocomplete>
  )
}

export default GoogleMapAutocompleteInput

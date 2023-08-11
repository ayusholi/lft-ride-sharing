import React from 'react';
import PlacesAutocomplete from 'react-places-autocomplete';

interface SearchBoxProps {
  value: string;
  onChange: (value: string) => void;
  onSelect: (value: string) => void;
}

const SearchBox: React.FC<SearchBoxProps> = ({ value, onChange, onSelect }) => {
  return (
    <PlacesAutocomplete value={value} onChange={onChange} onSelect={onSelect}>
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
        <div>
          <input {...getInputProps({ placeholder: 'Enter location...' })} />
          <div>
            {loading && <div>Loading...</div>}
            {suggestions.map((suggestion, index) => (
              // @ts-ignore
              <div key={index} {...getSuggestionItemProps(suggestion)}>
                {suggestion.description}
              </div>
            ))}
          </div>
        </div>
      )}
    </PlacesAutocomplete>
  );
};

export default SearchBox;

import React from 'react';
// import PlacesAutocomplete from 'react-places-autocomplete';
import { AddressAutofill } from '@mapbox/search-js-react';
interface SearchBoxProps {
  value: string;
  onChange: (value: string) => void;
  onSelect: (value: string) => void;
}

const SearchBox: React.FC<SearchBoxProps> = ({ value, onChange, onSelect }) => {
  return (
    <>
      <AddressAutofill accessToken="pk.eyJ1IjoiYXl1c2gtb2xpIiwiYSI6ImNsbDY0MWZzdTBmNjgzbHM4dGhkeWcxaWQifQ.ggzHGHtCLzraNlyoHBaF4g">
        <input name="address" placeholder="Address" type="text" autoComplete="address-line1"/>
      </AddressAutofill>
    </>
  );
};

export default SearchBox;

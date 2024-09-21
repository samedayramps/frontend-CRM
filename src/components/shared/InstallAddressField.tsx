import React, { useRef, useEffect } from 'react';
import { TextField } from '@mui/material';
import { useLoadScript, Autocomplete } from '@react-google-maps/api';
import { styled } from '@mui/system';

interface InstallAddressFieldProps {
  value: string;
  onChange: (value: string) => void;
}

const libraries: ("places")[] = ['places'];

const StyledAutocomplete = styled(Autocomplete)({
  '& .pac-container': {
    zIndex: 1301, // This should be higher than the Dialog's z-index
  },
});

const InstallAddressField: React.FC<InstallAddressFieldProps> = ({ value, onChange }) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY || '',
    libraries,
  });

  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);

  useEffect(() => {
    if (isLoaded) {
      const pacContainers = document.getElementsByClassName('pac-container');
      for (let i = 0; i < pacContainers.length; i++) {
        (pacContainers[i] as HTMLElement).style.zIndex = '1301';
      }
    }
  }, [isLoaded]);

  const onLoad = (autocomplete: google.maps.places.Autocomplete) => {
    autocompleteRef.current = autocomplete;
  };

  const onPlaceChanged = () => {
    if (autocompleteRef.current !== null) {
      const place = autocompleteRef.current.getPlace();
      if (place.formatted_address) {
        onChange(place.formatted_address);
      } else if (place.name) {
        // If formatted_address is not available, use the place name
        onChange(place.name);
      } else {
        // If neither formatted_address nor name is available, use whatever text is in the input
        const input = document.querySelector('input[aria-autocomplete="list"]') as HTMLInputElement;
        if (input) {
          onChange(input.value);
        }
      }
    }
  };

  if (loadError) return <div>Error loading Google Maps</div>;
  if (!isLoaded) return <div>Loading...</div>;

  return (
    <StyledAutocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
      <TextField
        label="Installation Address"
        variant="outlined"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        fullWidth
        required
      />
    </StyledAutocomplete>
  );
};

export default InstallAddressField;
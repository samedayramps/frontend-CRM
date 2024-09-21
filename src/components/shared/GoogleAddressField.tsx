import React, { useRef, useEffect } from 'react';
import { TextField } from '@mui/material';

interface GoogleAddressFieldProps {
  value: string;
  onChange: (value: string) => void;
  label: string;
}

const GoogleAddressField: React.FC<GoogleAddressFieldProps> = ({ value, onChange, label }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);

  useEffect(() => {
    if (!inputRef.current) return;

    const autocomplete = new google.maps.places.Autocomplete(inputRef.current, {
      types: ['address'],
    });

    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
      if (place && place.formatted_address) {
        onChange(place.formatted_address);
      } else if (inputRef.current) {
        // If formatted_address is not available, use the input value
        onChange(inputRef.current.value);
      }
    });

    autocompleteRef.current = autocomplete;

    return () => {
      if (autocompleteRef.current) {
        google.maps.event.clearInstanceListeners(autocompleteRef.current);
      }
    };
  }, [onChange]);

  return (
    <TextField
      inputRef={inputRef}
      label={label}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      fullWidth
      variant="outlined"
    />
  );
};

export default GoogleAddressField;
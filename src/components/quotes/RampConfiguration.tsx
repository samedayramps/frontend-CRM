// src/components/quotes/RampConfiguration.tsx

import React, { useState, useEffect } from 'react';
import { Button, Grid, Typography, IconButton, Paper } from '@mui/material';
import { Remove } from '@mui/icons-material';
import { RampConfiguration, RampComponent } from '../../types/Quote';

interface RampConfigurationComponentProps {
  configuration: RampConfiguration;
  onChange: (newConfig: RampConfiguration) => void;
}

const rampOptions = [4, 5, 6, 7, 8];
const landingOptions = [
  { length: 5, width: 4 },
  { length: 5, width: 5 },
  { length: 5, width: 8 },
];

const RampConfigurationComponent: React.FC<RampConfigurationComponentProps> = ({ configuration, onChange }) => {
  const [components, setComponents] = useState<RampComponent[]>(configuration.components);

  useEffect(() => {
    const totalLength = components.reduce((sum, comp) => sum + (comp.length * comp.quantity), 0);
    onChange({ components, totalLength });
  }, [components, onChange]);

  const addComponent = (type: 'ramp' | 'landing', length: number, width?: number) => {
    const existingIndex = components.findIndex(c => 
      c.type === type && c.length === length && c.width === width
    );

    if (existingIndex !== -1) {
      const updatedComponents = [...components];
      updatedComponents[existingIndex].quantity += 1;
      setComponents(updatedComponents);
    } else {
      setComponents([...components, { type, length, width, quantity: 1 }]);
    }
  };

  const removeComponent = (index: number) => {
    const updatedComponents = [...components];
    if (updatedComponents[index].quantity > 1) {
      updatedComponents[index].quantity -= 1;
    } else {
      updatedComponents.splice(index, 1);
    }
    setComponents(updatedComponents);
  };

  return (
    <Paper elevation={3} style={{ padding: '16px', marginBottom: '16px' }}>
      <Typography variant="h6" gutterBottom>Ramp Configuration</Typography>
      
      <Grid container spacing={2} sx={{ mb: 2 }}>
        {rampOptions.map(length => (
          <Grid item key={`ramp-${length}`}>
            <Button
              variant="outlined"
              onClick={() => addComponent('ramp', length)}
              sx={{ minWidth: '100px' }}
            >
              {length}ft Ramp
            </Button>
          </Grid>
        ))}
        {landingOptions.map(({ length, width }) => (
          <Grid item key={`landing-${length}x${width}`}>
            <Button
              variant="outlined"
              onClick={() => addComponent('landing', length, width)}
              sx={{ minWidth: '100px' }}
            >
              {length}x{width} Landing
            </Button>
          </Grid>
        ))}
      </Grid>

      <Typography variant="subtitle1" gutterBottom>Added Components:</Typography>
      {components.map((component, index) => (
        <Grid container alignItems="center" key={index} sx={{ mb: 1 }}>
          <Grid item xs={10}>
            <Typography>
              {component.type === 'ramp' 
                ? `${component.length}ft Ramp` 
                : `${component.length}x${component.width} Landing`} 
              (x{component.quantity})
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <IconButton onClick={() => removeComponent(index)} size="small">
              <Remove />
            </IconButton>
          </Grid>
        </Grid>
      ))}

      <Typography variant="h6" sx={{ mt: 2 }}>
        Total Length: {configuration.totalLength} ft
      </Typography>
    </Paper>
  );
};

export default RampConfigurationComponent;
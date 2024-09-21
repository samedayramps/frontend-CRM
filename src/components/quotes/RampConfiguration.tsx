// src/components/quotes/RampConfiguration.tsx

import React from 'react';
import { Button, Grid, Select, MenuItem, IconButton, Typography, TextField } from '@mui/material';
import { Delete } from '@mui/icons-material';
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
  const addComponent = (type: 'ramp' | 'landing') => {
    const newComponent: RampComponent = type === 'ramp' 
      ? { type: 'ramp', length: 4, quantity: 1 } 
      : { type: 'landing', length: 5, width: 4, quantity: 1 };
    const newComponents = [...configuration.components, newComponent];
    updateConfiguration(newComponents);
  };

  const updateComponent = (index: number, field: string, value: any) => {
    const newComponents = configuration.components.map((comp, i) => 
      i === index ? { ...comp, [field]: value } : comp
    );
    updateConfiguration(newComponents);
  };

  const removeComponent = (index: number) => {
    const newComponents = configuration.components.filter((_, i) => i !== index);
    updateConfiguration(newComponents);
  };

  const updateConfiguration = (components: RampComponent[]) => {
    const totalLength = components.reduce((sum, comp) => sum + (comp.length * comp.quantity), 0);
    onChange({ components, totalLength });
  };

  return (
    <div>
      <Typography variant="h6" gutterBottom>Ramp Configuration</Typography>
      {configuration.components.map((component, index) => (
        <Grid container spacing={2} key={index} alignItems="center">
          <Grid item xs={2}>
            <Select
              value={component.type}
              onChange={(e) => updateComponent(index, 'type', e.target.value)}
              fullWidth
            >
              <MenuItem value="ramp">Ramp</MenuItem>
              <MenuItem value="landing">Landing</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={3}>
            <Select
              value={component.type === 'ramp' ? component.length : `${component.length}x${component.width}`}
              onChange={(e) => {
                const value = e.target.value;
                if (component.type === 'ramp') {
                  updateComponent(index, 'length', Number(value));
                } else {
                  const [length, width] = (value as string).split('x').map(Number);
                  updateComponent(index, 'length', length);
                  updateComponent(index, 'width', width);
                }
              }}
              fullWidth
            >
              {component.type === 'ramp'
                ? rampOptions.map(length => (
                    <MenuItem key={length} value={length}>{length} ft</MenuItem>
                  ))
                : landingOptions.map(({ length, width }) => (
                    <MenuItem key={`${length}x${width}`} value={`${length}x${width}`}>{length}x{width} ft</MenuItem>
                  ))
              }
            </Select>
          </Grid>
          <Grid item xs={2}>
            <TextField
              type="number"
              label="Quantity"
              value={component.quantity}
              onChange={(e) => updateComponent(index, 'quantity', Math.max(1, parseInt(e.target.value) || 1))}
              inputProps={{ min: 1 }}
              fullWidth
            />
          </Grid>
          <Grid item>
            <IconButton onClick={() => removeComponent(index)}>
              <Delete />
            </IconButton>
          </Grid>
        </Grid>
      ))}
      <Button onClick={() => addComponent('ramp')} variant="outlined" style={{ marginTop: 10, marginRight: 10 }}>
        Add Ramp
      </Button>
      <Button onClick={() => addComponent('landing')} variant="outlined" style={{ marginTop: 10 }}>
        Add Landing
      </Button>
      <Typography style={{ marginTop: 10 }}>Total Length: {configuration.totalLength} ft</Typography>
    </div>
  );
};

export default RampConfigurationComponent;
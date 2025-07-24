'use client';
import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import PeopleIcon from '@mui/icons-material/People';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

type Passengers = {
  adults: number;
  numChildren: number;
  infants: number;
};

type Props = {
  value: Passengers;
  onChange: (value: Passengers) => void;
  totalPassengers: number;
};

export default function PassengersDropdown({ value, onChange, totalPassengers }: Props) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [pending, setPending] = React.useState(value);

  React.useEffect(() => {
    setPending(value);
  }, [anchorEl, value]);

  const handleChange = (type: keyof Passengers, delta: number) => {
    setPending(prev => {
      const next = { ...prev, [type]: Math.max(0, prev[type] + delta) };
      if (type === 'adults' && next.adults < 1) next.adults = 1;
      return next;
    });
  };

  const handleDone = () => {
    onChange(pending);
    setAnchorEl(null);
  };
  const handleCancel = () => setAnchorEl(null);

  return (
    <>
      <Button
        variant="text"
        onClick={e => setAnchorEl(e.currentTarget)}
        endIcon={<ArrowDropDownIcon />}
        className="capitalize text-lg"
        sx={{ textTransform: 'none', fontWeight: 500 }}
      >
        <PeopleIcon className="mr-1" fontSize="small" />
        {totalPassengers}
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCancel}
        slotProps={{ paper: { sx: { minWidth: 260, p: 2 } } }}
      >
        <div className="flex flex-col gap-2 p-2">
          <div className="flex items-center justify-between">
            <span>Adults</span>
            <div className="flex items-center gap-1">
              <IconButton size="small" onClick={() => handleChange('adults', -1)} disabled={pending.adults <= 1}> <RemoveIcon fontSize="small" /> </IconButton>
              <span className="w-6 text-center">{pending.adults}</span>
              <IconButton size="small" onClick={() => handleChange('adults', 1)}> <AddIcon fontSize="small" /> </IconButton>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span>Children <span className="text-xs text-gray-400">(2-11)</span></span>
            <div className="flex items-center gap-1">
              <IconButton size="small" onClick={() => handleChange('numChildren', -1)} disabled={pending.numChildren <= 0}> <RemoveIcon fontSize="small" /> </IconButton>
              <span className="w-6 text-center">{pending.numChildren}</span>
              <IconButton size="small" onClick={() => handleChange('numChildren', 1)}> <AddIcon fontSize="small" /> </IconButton>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span>Infants <span className="text-xs text-gray-400">(under 2)</span></span>
            <div className="flex items-center gap-1">
              <IconButton size="small" onClick={() => handleChange('infants', -1)} disabled={pending.infants <= 0}> <RemoveIcon fontSize="small" /> </IconButton>
              <span className="w-6 text-center">{pending.infants}</span>
              <IconButton size="small" onClick={() => handleChange('infants', 1)}> <AddIcon fontSize="small" /> </IconButton>
            </div>
          </div>
          <div className="flex items-center justify-end gap-2 mt-2">
            <Button size="small" onClick={handleCancel}>Cancel</Button>
            <Button size="small" variant="contained" onClick={handleDone}>Done</Button>
          </div>
        </div>
      </Menu>
    </>
  );
} 
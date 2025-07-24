import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

export default function Actions({ onBack, backLabel = 'Back to search' }: { onBack: () => void; backLabel?: string }) {
  return (
    <Box className="flex justify-end gap-4">
      <Button variant="outlined" onClick={onBack}>
        {backLabel}
      </Button>
    </Box>
  );
} 
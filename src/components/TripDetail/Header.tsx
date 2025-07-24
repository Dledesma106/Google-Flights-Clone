import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function Header({ title, route, price, subtitle }: { title: string; route: string; price: string; subtitle?: string }) {
  return (
    <>
      <Typography variant="h4" className="font-bold mb-2">
        {title}
      </Typography>
      <Box className="flex items-center justify-between">
        <Typography variant="h6" sx={{ color: 'text.secondary' }}>
          {route}
        </Typography>
        <Box className="text-right">
          <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'success.main' }}>
            {price}
          </Typography>
          {subtitle && (
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {subtitle}
            </Typography>
          )}
        </Box>
      </Box>
    </>
  );
} 
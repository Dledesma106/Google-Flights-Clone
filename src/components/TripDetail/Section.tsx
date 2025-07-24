import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function Section({ title, subtitle, carrier, children, defaultExpanded }: {
  title: string;
  subtitle: string;
  carrier?: string;
  children: React.ReactNode;
  defaultExpanded?: boolean;
}) {
  return (
    <Accordion defaultExpanded={defaultExpanded}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Box className="flex items-center justify-between w-full pr-4">
          <Box>
            <Typography variant="h6" className="font-semibold">
              {title}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {subtitle}
            </Typography>
          </Box>
          {carrier && (
            <Box className="text-right">
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {carrier}
              </Typography>
              <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                {/* Emissions/extra info placeholder */}
              </Typography>
            </Box>
          )}
        </Box>
      </AccordionSummary>
      <AccordionDetails>
        <Box className="mb-4">
          {children}
        </Box>
      </AccordionDetails>
    </Accordion>
  );
} 
// src/components/SearchPanel/SearchPanel.jsx

import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Stack,
  Typography,
  TextField,
  Chip,
} from "@mui/material";
import NearMeIcon from "@mui/icons-material/NearMe";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import { Autocomplete } from "@react-google-maps/api";

export default function SearchPanel({
  originRef,
  destinationRef,
  calculateRoute,
  clearRoute,
  distance,
  duration,
  onOpenLegend,
  onOpenAbout,
}) {
  return (
    <Card
      elevation={8}
      sx={{
        position: "absolute",
        top: { xs: 16, md: 24 },
        left: { xs: 16, md: 24 },
        right: { xs: 16, md: "auto" },
        width: { xs: "auto", md: 380 },
        borderRadius: 4,
        zIndex: 10,
        backdropFilter: "blur(10px)",
      }}
    >
      <CardContent>
        <Stack spacing={2}>
          <Box>
            <Typography variant="h5" fontWeight={800}>
              Military Lodging Map
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Find military lodging, RV sites, vacation rentals, and resorts.
            </Typography>
          </Box>

          <Divider />

          <Autocomplete>
            <TextField
              inputRef={originRef}
              label="Starting point"
              placeholder="Enter city, base, or address"
              size="small"
              fullWidth
            />
          </Autocomplete>

          <Autocomplete>
            <TextField
              inputRef={destinationRef}
              label="Destination"
              placeholder="Where are you headed?"
              size="small"
              fullWidth
            />
          </Autocomplete>

          <Stack direction="row" spacing={1}>
            <Button
              variant="contained"
              startIcon={<NearMeIcon />}
              onClick={calculateRoute}
              fullWidth
            >
              Route
            </Button>

            <Button
              variant="outlined"
              startIcon={<RestartAltIcon />}
              onClick={clearRoute}
            >
              Clear
            </Button>
          </Stack>

          {(distance || duration) && (
            <Stack direction="row" spacing={1}>
              <Chip label={`Distance: ${distance}`} />
              <Chip label={`Time: ${duration}`} />
            </Stack>
          )}

          <Stack direction="row" spacing={1}>
            <Button
              size="small"
              startIcon={<MapOutlinedIcon />}
              onClick={onOpenLegend}
            >
              Legend
            </Button>

            <Button
              size="small"
              startIcon={<InfoOutlinedIcon />}
              onClick={onOpenAbout}
            >
              About
            </Button>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}
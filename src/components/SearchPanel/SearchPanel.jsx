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
import HotelIcon from "@mui/icons-material/Hotel";
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
  selectedBranches,
  selectedPropertyTypes,
  onToggleBranch,
  onTogglePropertyType,
}) {

const BRANCHES = ["Navy", "Army", "Marines", "Air Force", "Coast Guard"];

const PROPERTY_TYPES = [
  "Hotel",
  "RV",
  "Campground",
  "Vacation Rental",
  "Resort",
];

  return (
    <Card
      elevation={8}
      sx={{
        position: "absolute",
        top: { xs: 16, md: 24 },
        left: { xs: 16, md: 24 },
        right: { xs: 16, md: "auto" },
        width: { xs: "auto", sm: 390 },
        maxWidth: "calc(100vw - 32px)",
        borderRadius: 4,
        zIndex: 10,
        backgroundColor: "rgba(255,255,255,0.96)",
        backdropFilter: "blur(10px)",
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Stack spacing={2}>
          <Stack direction="row" spacing={1.5} alignItems="center">
            <Box
              sx={{
                width: 46,
                height: 46,
                borderRadius: "50%",
                bgcolor: "primary.main",
                color: "white",
                display: "grid",
                placeItems: "center",
                flexShrink: 0,
              }}
            >
              <HotelIcon />
            </Box>

            <Box>
              <Typography variant="h5" fontWeight={800} lineHeight={1.1}>
                Military Lodging Map
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                Find military lodging, RV sites, vacation rentals, and resorts.
              </Typography>
            </Box>
          </Stack>

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
              sx={{ py: 1.1 }}
            >
              Route
            </Button>

            <Button
              variant="outlined"
              startIcon={<RestartAltIcon />}
              onClick={clearRoute}
              sx={{ px: 2.5 }}
            >
              Clear
            </Button>
          </Stack>

          {(distance || duration) && (
            <Stack direction="row" spacing={1} flexWrap="wrap">
              {distance && <Chip label={`Distance: ${distance}`} />}
              {duration && <Chip label={`Time: ${duration}`} />}
            </Stack>
          )}

          <Divider />



          <Box>
            <Typography variant="subtitle2" fontWeight={800} sx={{ mb: 1 }}>
              Filters
            </Typography>

            <Typography variant="caption" color="text.secondary">
              Branch
            </Typography>

            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ mt: 1 }}>
              {BRANCHES.map((branch) => (
                <Chip
                  key={branch}
                  label={branch}
                  clickable
                  color={selectedBranches.includes(branch) ? "primary" : "default"}
                  variant={selectedBranches.includes(branch) ? "filled" : "outlined"}
                  onClick={() => onToggleBranch(branch)}
                />
              ))}
            </Stack>

            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ display: "block", mt: 2 }}
            >
              Property Type
            </Typography>

            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ mt: 1 }}>
              {PROPERTY_TYPES.map((type) => (
                <Chip
                  key={type}
                  label={type}
                  clickable
                  color={selectedPropertyTypes.includes(type) ? "secondary" : "default"}
                  variant={selectedPropertyTypes.includes(type) ? "filled" : "outlined"}
                  onClick={() => onTogglePropertyType(type)}
                />
              ))}
            </Stack>
          </Box>



          <Divider />

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
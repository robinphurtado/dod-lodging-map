import {
  AppBar,
  Box,
  Button,
  Toolbar,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import ShieldOutlinedIcon from "@mui/icons-material/ShieldOutlined";

export default function AppHeader({ onOpenLegend, onOpenAbout }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: "Military Lodging Map",
        url: window.location.href,
      });
    } else {
      await navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard");
    }
  };

  return (
    <AppBar
      position="absolute"
      elevation={6}
      sx={{
        zIndex: 12,
        bgcolor: "primary.main",
      }}
    >
      <Toolbar
        sx={{
          minHeight: { xs: 56, md: 64 },
          px: { xs: 2, md: 3 },
          display: "flex",
          justifyContent: "space-between",
          gap: 2,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <ShieldOutlinedIcon />
          <Typography
            variant={isMobile ? "subtitle1" : "h6"}
            fontWeight={800}
            noWrap
          >
            Military Lodging Map
          </Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Button
            color="inherit"
            size="small"
            startIcon={!isMobile && <MapOutlinedIcon />}
            onClick={onOpenLegend}
          >
            Legend
          </Button>

          <Button
            color="inherit"
            size="small"
            startIcon={!isMobile && <InfoOutlinedIcon />}
            onClick={onOpenAbout}
          >
            About
          </Button>

          {!isMobile && (
            <Button
              color="inherit"
              size="small"
              startIcon={<ShareOutlinedIcon />}
              onClick={handleShare}
            >
              Share
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
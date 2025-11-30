import { useState } from "react";
import { trackOrderAPI } from "../service/commonService";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepConnector, { stepConnectorClasses } from "@mui/material/StepConnector";
import { styled } from "@mui/material/styles";
import Check from "@mui/icons-material/Check";
import { Box, Button, Card, CircularProgress, TextField, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import KitchenIcon from '@mui/icons-material/Kitchen';

// Custom connector for Stepper
const QontoConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: { top: 15 },
  [`&.${stepConnectorClasses.active}`]: { [`& .${stepConnectorClasses.line}`]: { borderColor: "#c15b78" } },
  [`&.${stepConnectorClasses.completed}`]: { [`& .${stepConnectorClasses.line}`]: { borderColor: "#c15b78" } },
  [`& .${stepConnectorClasses.line}`]: { borderColor: "#ddd", borderTopWidth: 4, borderRadius: 1 },
}));

export default function TrackOrder() {
  const location = useLocation();
  const prefilledOrderId = location.state?.orderId || "";

  const [orderId, setOrderId] = useState(prefilledOrderId);
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [popupMsg, setPopupMsg] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const steps = ["Order Placed", "Preparation", "Out for Delivery", "Delivered"];
  const stepIcons = [<AssignmentTurnedInIcon />, <KitchenIcon />, <LocalShippingIcon />, <CheckCircleIcon />];
  const statusMap = { placed: 0, preparation: 1, out_for_delivery: 2, delivered: 3 };

  const togglePopup = (msg) => {
    setPopupMsg(msg);
    setShowPopup(true);
  };

  const handleTrack = async () => {
    if (!orderId) {
      togglePopup("Please enter an Order ID");
      return;
    }
    setLoading(true);
    setOrder(null);

    try {
      const response = await trackOrderAPI(orderId);
      setOrder(response.data);
    } catch (err) {
      console.error(err);
      togglePopup("Order not found or server error");
    } finally {
      setLoading(false);
    }
  };

  const activeStep = order ? statusMap[order.status.toLowerCase()] ?? 0 : 0;

  return (
    <Box sx={{ maxWidth: 800, mx: "auto", mt: 5, fontFamily: "'Roboto', sans-serif" }}>
      
      {/* Popup Modal */}
      {showPopup && (
        <Box
          sx={{
            position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
            bgcolor: "rgba(0,0,0,0.5)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 9999,
          }}
        >
          <Card sx={{ p: 4, minWidth: 300, borderRadius: 3, textAlign: "center", bgcolor: "#fff7fb" }}>
            <Typography sx={{ mb: 3, fontFamily: "'Playfair Display', serif", fontWeight: 700, color: "#c15b78", fontSize: "1.3rem" }}>
              {popupMsg}
            </Typography>
            <Button
              variant="contained"
              sx={{ bgcolor: "#c15b78", "&:hover": { bgcolor: "#ff6f91" }, color: "#fff", fontWeight: 700, px: 4 }}
              onClick={() => setShowPopup(false)}
            >
              OK
            </Button>
          </Card>
        </Box>
      )}

      {/* Header */}
      <Typography variant="h4" align="center" gutterBottom sx={{ fontFamily: "'Playfair Display', serif", color: "#c15b78", fontWeight: 700 }}>
        Track Your Order
      </Typography>

      {/* Order ID input */}
      <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
        <TextField
          label="Order ID"
          variant="outlined"
          fullWidth
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
        />
        <Button
          variant="contained"
          sx={{ bgcolor: "#c15b78", "&:hover": { bgcolor: "#ff6f91" }, color: "#fff", fontWeight: 700 }}
          onClick={handleTrack}
        >
          Track Order
        </Button>
      </Box>

      {/* Loading */}
      {loading && (
        <Box sx={{ display: "flex", justifyContent: "center", my: 5 }}>
          <CircularProgress />
        </Box>
      )}

      {/* Order details */}
      {order && (
        <Card sx={{ p: 3, mt: 3, backgroundColor: "#fff0f5", borderRadius: 3 }}>
          {[
            { label: "Order ID", value: order.id },
            { label: "User Name", value: order.username },
            { label: "Order Placed", value: new Date(order.paymentDate).toLocaleDateString() },
            { label: "Total Amount", value: `$${order.totalAmount}` },
            { label: "Address", value: order.userAddress },
          ].map((item, idx) => (
            <Typography key={idx} sx={{ mb: 1 }}>
              <strong style={{ color: "#c15b78", fontFamily: "'Playfair Display', serif", fontWeight: 700 }}>{item.label}:</strong>
              <span style={{ color: "#333", fontFamily: "'Roboto', sans-serif", fontWeight: 500, marginLeft: 5 }}>{item.value}</span>
            </Typography>
          ))}

          <Stepper alternativeLabel activeStep={activeStep} connector={<QontoConnector />} sx={{ mt: 3 }}>
            {steps.map((label, index) => (
              <Step key={label} completed={index < activeStep}>
                <StepLabel
                  StepIconComponent={(props) => (
                    <Box
                      sx={{
                        width: 35,
                        height: 35,
                        borderRadius: "50%",
                        bgcolor: props.active || props.completed ? "#c15b78" : "#fff",
                        border: `3px solid ${props.active || props.completed ? "#c15b78" : "#ddd"}`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: props.completed ? "#fff" : "#333",
                        fontWeight: 700,
                        fontSize: 16,
                      }}
                    >
                      {props.completed ? <Check fontSize="small" /> : stepIcons[index]}
                    </Box>
                  )}
                >
                  {label}
                </StepLabel>
              </Step>
            ))}
          </Stepper>
        </Card>
      )}
    </Box>
  );
}

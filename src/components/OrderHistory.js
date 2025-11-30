import React, { useEffect, useState } from "react";
import { Card, Typography, Button, Box, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getUserOrdersAPI } from "../service/commonService";

function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    getUserOrdersAPI()
      .then((res) => {
        if (res.data && res.data.data) {
          const paidOrders = res.data.data.filter(
            (o) => o.status.toLowerCase() === "paid"
          );
          paidOrders.sort(
            (a, b) => new Date(b.paymentDate) - new Date(a.paymentDate)
          );
          setOrders(paidOrders);
        }
      })
      .catch((err) => console.error("ORDER API ERROR:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
        <CircularProgress />
      </Box>
    );
  if (orders.length === 0)
    return (
      <Typography variant="h6" align="center" sx={{ mt: 5, color: "#c15b78" }}>
        No paid orders found.
      </Typography>
    );

  return (
    <Box sx={{ maxWidth: 800, mx: "auto", mt: 5, fontFamily: "'Roboto', sans-serif" }}>
      <Typography
        variant="h4"
        gutterBottom
        align="center"
        sx={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, color: "#c15b78", mb: 4 }}
      >
        Your Paid Orders
      </Typography>

      {orders.map((order) => (
        <Card
          key={order.orderId}
          sx={{
            p: 3,
            mb: 3,
            borderRadius: 3,
            boxShadow: "0px 4px 20px rgba(0,0,0,0.1)",
            backgroundColor: "#f6f3f4",
          }}
        >
          <Typography sx={{ mb: 1 }}>
            <strong style={{ color: "#c15b78", fontFamily: "'Playfair Display', serif", fontWeight: 700 }}>
              Order ID:
            </strong>
            <span style={{ color: "#333", fontWeight: 500, marginLeft: 5 }}>{order.orderId}</span>
          </Typography>

          <Typography sx={{ mb: 1 }}>
            <strong style={{ color: "#c15b78", fontFamily: "'Playfair Display', serif", fontWeight: 700 }}>
              Date:
            </strong>
            <span style={{ color: "#333", fontWeight: 500, marginLeft: 5 }}>
              {order.orderDate ? new Date(order.orderDate).toLocaleDateString() : "N/A"}
            </span>
          </Typography>

          <Typography sx={{ mb: 1 }}>
            <strong style={{ color: "#c15b78", fontFamily: "'Playfair Display', serif", fontWeight: 700 }}>
              Total Amount:
            </strong>
            <span style={{ color: "#333", fontWeight: 500, marginLeft: 5 }}>
              ${order.totalAmount ? order.totalAmount.toFixed(2) : "0.00"}
            </span>
          </Typography>

          <Typography sx={{ mb: 2 }}>
            <strong style={{ color: "#c15b78", fontFamily: "'Playfair Display', serif", fontWeight: 700 }}>
              Status:
            </strong>
            <span style={{ color: "#333", fontWeight: 500, marginLeft: 5 }}>{order.status}</span>
          </Typography>

          <Button
            variant="contained"
            sx={{
              bgcolor: "#c15b78",
              "&:hover": { bgcolor: "#ff6f91" },
              color: "#fff",
              fontWeight: 700,
              px: 4,
            }}
            onClick={() =>
              navigate("/track-order", {
                state: { orderId: order.orderId },
              })
            }
          >
            Track This Order
          </Button>
        </Card>
      ))}
    </Box>
  );
}

export default OrderHistory;

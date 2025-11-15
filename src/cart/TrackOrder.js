import { useState } from "react";

const TrackOrder = () => {
  const [orderId, setOrderId] = useState("");
  const [orderStatus, setOrderStatus] = useState(null);

  const statusSteps = ["Processing", "Out for Delivery", "Delivered"];

  const handleTrack = () => {
    if (!orderId) {
      alert("Please enter an order ID");
      return;
    }

    // Mock order data
    const mockOrders = {
      "123": "Processing",
      "124": "Out for Delivery",
      "125": "Delivered",
    };

    const status = mockOrders[orderId];
    if (status) {
      setOrderStatus(status);
    } else {
      setOrderStatus("notfound");
    }
  };

  const getProgressValue = () => {
    if (!orderStatus || orderStatus === "notfound") return 0;
    return ((statusSteps.indexOf(orderStatus) + 1) / statusSteps.length) * 100;
  };

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Track Your Order</h2>

      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Enter Order ID"
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
        />
      </div>
      <button className="btn btn-primary mb-3" onClick={handleTrack}>
        Track Order
      </button>

      {orderStatus === "notfound" && (
        <div className="alert alert-danger">Order not found</div>
      )}

      {orderStatus && orderStatus !== "notfound" && (
        <div>
          <h5>Status: {orderStatus}</h5>
          <div className="progress">
            <div
              className="progress-bar"
              role="progressbar"
              style={{ width: `${getProgressValue()}%` }}
              aria-valuenow={getProgressValue()}
              aria-valuemin="0"
              aria-valuemax="100"
            ></div>
          </div>
          <div className="d-flex justify-content-between mt-2">
            {statusSteps.map((step, index) => (
              <small key={index}>{step}</small>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TrackOrder;

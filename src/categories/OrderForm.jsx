import React, { useState, useEffect } from "react";
import moment from "moment";
import { useAuth } from "../context/AuthProvider";
import { useLocation, useNavigate } from "react-router-dom";

function OrderForm() {
  const [authUser] = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const cartTotal = parseFloat(queryParams.get("total")) || 0;

  const [formData, setFormData] = useState({
    fullname: authUser?.fullname || "",
    email: authUser?.email || "",
    mobile: "",
    address: "",
    fromDate: "",
    toDate: "",
    time: "",
  });

  const [grandTotal, setGrandTotal] = useState(cartTotal);
  const [mobileError, setMobileError] = useState(""); // State for mobile validation
  const today = moment().format("YYYY-MM-DD"); // Get today's date in YYYY-MM-DD format
  const [minToDate, setMinToDate] = useState(today); // Minimum To Date based on From Date

  useEffect(() => {
    const { fromDate, toDate } = formData;
    if (fromDate && toDate) {
      const from = moment(fromDate);
      const to = moment(toDate);
      const days = to.diff(from, "days") + 1;
      setGrandTotal(cartTotal * days);
    } else {
      setGrandTotal(cartTotal);
    }
  }, [formData.fromDate, formData.toDate, cartTotal]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });

    // Set minimum To Date if From Date changes
    if (name === "fromDate") {
      setMinToDate(value); // Set minToDate to From Date value
    }
  };

  const validateMobile = () => {
    const { mobile } = formData;
    if (mobile.length !== 10 || !/^\d{10}$/.test(mobile)) {
      setMobileError("Please enter a valid 10-digit mobile number.");
      return false;
    }
    setMobileError("");
    return true;
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (validateMobile()) {
      // Navigate to the payment page with the mobile number and grand total
      navigate("/paymentoptions", {
        state: {
          grandTotal,
          mobile: formData.mobile,
        },
      });
    }
  };

  return (
    <div className="flex flex-col text-black items-center justify-center mt-10 pt-[80px]">
      <h2 className="text-2xl font-algerian text-dark-green mb-4">~~~ Order Details ~~~</h2>
      <form onSubmit={handleFormSubmit} className="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg">
        <div className="mb-4">
          <label className="block text-sm font-medium">Name</label>
          <input
            type="text"
            name="fullname"
            value={formData.fullname}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">Mobile Number</label>
          <input
            type="tel"
            name="mobile"
            pattern="[0-9]{10}"
            value={formData.mobile}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            placeholder="Enter your mobile number"
            required
            onBlur={validateMobile} // Call validation when input loses focus
          />
          {mobileError && (
            <p className="text-red-500 text-sm mt-1">{mobileError}</p> // Validation message
          )}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">Address</label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            placeholder="Enter address"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">From Date</label>
          <input
            type="date"
            name="fromDate"
            value={formData.fromDate}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            required
            min={today} // Limit to today or future dates
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">To Date</label>
          <input
            type="date"
            name="toDate"
            value={formData.toDate}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            required
            min={minToDate} // Set minimum To Date based on From Date
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">Time</label>
          <input
            type="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">Grand Total</label>
          <p className="font-bold">₹{grandTotal.toFixed(2)}</p>
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="btn bg-[#4ade80] hover:bg-[#4ade80] text-white px-4 py-2"
          >
            Proceed to Payment
          </button>
        </div>
      </form>
    </div>
  );
}

export default OrderForm;

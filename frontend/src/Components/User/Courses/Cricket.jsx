import { useState } from "react";
import { axiosInstanceCricket } from "../../../api/axiosInstance";
import arrow from "../../../assets/icons/arrow.png";
import toast from "react-hot-toast";


const DISPLAY_FEE = 15;

function Cricket() {
  const [submitting, setSubmitting] = useState(false);

  const handlePay = async () => {
    if (submitting) return;
    try {
      setSubmitting(true);
      const res = await axiosInstanceCricket.post("/initiate");
      if (res.data.status === "NEW" && res.data.payment_links?.web) {
        window.location.href = res.data.payment_links.web;
      } else {
        toast.error("Could not initiate payment.");
        setSubmitting(false);
      }
    } catch (error) {
      console.error("Payment failed:", error);
      toast.error("Something went wrong. Please try again.");
      setSubmitting(false);
    }
  };

  const feeText = DISPLAY_FEE.toLocaleString("en-IN");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-10 px-4">
      <div className="bg-white shadow-xl rounded-lg max-w-md w-full overflow-hidden">
        <div className="bg-teal-700 text-white py-10 px-8 text-center">
          <h1 className="text-sm font-semibold mb-3 uppercase tracking-widest">
            ARCITE EDUCATIONAL SOLUTIONS PVT. LTD.
          </h1>
          <h2 className="text-2xl font-semibold opacity-90">🏏 Cricket League</h2>
          <p className="text-sm opacity-80 mt-1">Payment</p>

          <div className="mt-6 bg-white/10 border border-white/20 rounded-lg px-5 py-4">
            <div className="flex justify-between font-bold text-base">
              <span>Amount Payable</span>
              <span>₹{feeText}</span>
            </div>
          </div>
        </div>

        <div className="p-8">
          <button
            onClick={handlePay}
            disabled={submitting}
            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-teal-600 text-white text-lg font-semibold hover:bg-teal-800 active:scale-95 transition-all rounded-md shadow-md disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {submitting ? "Redirecting to payment..." : "Pay Now"}
            {!submitting && <img src={arrow} alt="arrow" className="w-5 h-5" />}
          </button>

          <div className="mt-6 text-center text-sm text-gray-500 space-y-1">
            <p>📧 info@arcite.in</p>
            <p>📞 7994211144</p>
          </div>

          <p className="text-center text-xs text-gray-400 mt-4">
            🔒 Secure online payment
          </p>
        </div>
      </div>
    </div>
  );
}

export default Cricket;
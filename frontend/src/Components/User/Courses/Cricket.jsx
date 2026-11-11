
import { useState } from "react";
import { axiosInstanceCricket } from "../../../api/axiosInstance";
import arrow from "../../../assets/icons/arrow.png";
import toast from "react-hot-toast";

const DISPLAY_FEE = 4000;

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
    <div className="relative min-h-screen overflow-hidden bg-[#071323] text-white flex items-center justify-center px-4 py-12">

      {/* Stadium-inspired background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_#1d4560_0%,_#071323_65%)]" />

      {/* Decorative stadium lights */}
      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-cyan-400/10 blur-3xl" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-amber-400/10 blur-3xl" />

      {/* Grid texture */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)",
          backgroundSize: "45px 45px",
        }}
      />

      <div className="relative z-10 w-full max-w-lg">

        {/* Tournament header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 border border-amber-400/40 bg-amber-400/10 px-5 py-2 rounded-full mb-5">
            <span className="text-amber-400 text-xs font-bold tracking-[0.2em] uppercase">
              Corporate Cricket League
            </span>
          </div>

          <div className="text-5xl mb-4">🏏</div>

          <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-wide leading-tight">
            ARCITE <span className="text-amber-400">CCL</span>
          </h1>

      

          <div className="w-20 h-1 bg-amber-400 mx-auto mt-5 rounded-full" />
        </div>

        {/* Payment card */}
        <div className="rounded-2xl overflow-hidden border border-white/15 bg-[#101f32]/95 shadow-2xl shadow-black/40">

          {/* Card heading */}
          <div className="bg-gradient-to-r from-[#172f49] to-[#102238] px-7 py-7 border-b border-white/10">
            <p className="text-amber-400 text-xs uppercase font-bold tracking-[0.2em] mb-2">
              Registration Payment
            </p>

            <h2 className="text-2xl font-bold">
              Complete Your Entry
            </h2>

            <p className="text-slate-400 text-sm mt-2">
              Secure your place in the Cricket League.
            </p>
          </div>

          <div className="p-7 sm:p-8">

            {/* Amount section */}
            <div className="rounded-xl bg-[#081728] border border-amber-400/25 p-6 mb-7">
              <div className="flex justify-between items-center gap-3">
                <div>
                  <p className="text-slate-400 text-sm mb-2">
                    Amount Payable
                  </p>

                  <p className="text-3xl sm:text-4xl font-black text-white">
                    ₹{feeText}
                  </p>
                </div>

                <div className="w-12 h-12 rounded-full bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-2xl">
                  🏆
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between">
                <span className="text-slate-400 text-xs uppercase tracking-wider">
                  Payment Type
                </span>

                <span className="text-amber-400 text-xs font-semibold">
                  League Registration
                </span>
              </div>
            </div>

            {/* Payment button - original logic unchanged */}
            <button
              onClick={handlePay}
              disabled={submitting}
              className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-amber-400 to-yellow-500 text-[#071323] text-lg font-extrabold uppercase tracking-wide hover:from-yellow-300 hover:to-amber-400 active:scale-95 transition-all rounded-lg shadow-lg shadow-amber-500/20 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {submitting ? "Redirecting to payment..." : "Pay Now"}

              {!submitting && (
                <img
                  src={arrow}
                  alt="arrow"
                  className="w-5 h-5"
                />
              )}
            </button>

            <p className="text-center text-slate-400 text-xs mt-4 flex items-center justify-center gap-2">
              <span>🔒</span>
              Secure online payment
            </p>

            {/* Contact */}
            <div className="mt-8 pt-6 border-t border-white/10">
              <p className="text-center text-xs text-slate-500 uppercase tracking-widest mb-4">
                Need Assistance?
              </p>

              <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-6 text-sm text-slate-300">
                <span>✉ info@arcite.in</span>
                <span>☎ 7994211144</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-slate-500 text-xs uppercase tracking-wider">
            ARCITE EDUCATIONAL SOLUTIONS PVT. LTD.
          </p>

          <p className="text-slate-600 text-xs mt-2">
            Powered by ARCITE
          </p>
        </div>
      </div>
    </div>
  );
}

export default Cricket;

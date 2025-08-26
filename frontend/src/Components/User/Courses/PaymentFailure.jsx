import { useSearchParams } from "react-router-dom";
import { XCircle } from "lucide-react";

const PaymentFailure = () => {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("orderId");
  const status = searchParams.get("status");

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full text-center">
        <div className="flex justify-center mb-4">
          <XCircle className="text-red-500 w-16 h-16" />
        </div>
        <h2 className="text-2xl font-bold text-red-600 mb-4">
          Payment Failed
        </h2>
        <p className="text-gray-700 mb-2">
          <strong>Order ID:</strong>{" "}
          <span className="text-gray-900">{orderId}</span>
        </p>
        <p className="text-gray-700 mb-4">
          <strong>Status:</strong>{" "}
          <span className="text-gray-900">{status}</span>
        </p>
        <p className="text-gray-600 mb-6">
          Unfortunately, your payment could not be processed.  
          Please try again or contact support.
        </p>
        <div className="mt-6 flex justify-center gap-4">
          <a
            href="/"
            className="inline-block bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-300"
          >
            Go to Home
          </a>
          <a
            href="/courses"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-300"
          >
            Retry Payment
          </a>
        </div>
      </div>
    </div>
  );
};

export default PaymentFailure;

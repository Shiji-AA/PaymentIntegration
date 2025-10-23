import { useSearchParams } from "react-router-dom";
import { CheckCircle } from "lucide-react";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("orderId");
  const amount = searchParams.get("amount");


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full text-center">
        <div className="flex justify-center mb-4">
          <CheckCircle className="text-green-500 w-16 h-16" />
        </div>
        <h2 className="text-2xl font-bold text-green-600 mb-4">Payment Successful!</h2>
        <p className="text-gray-700 mb-2">
          <strong>Order ID:</strong> <span className="text-gray-900">{orderId}</span>
        </p>
        <p className="text-gray-700 mb-2">
          <strong>Amount Paid:</strong> <span className="text-gray-900">₹{amount}</span>
        </p>     
        <div className="mt-6">
          <a
            href="/"
            className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-300"
          >
            Go to Home
          </a>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;

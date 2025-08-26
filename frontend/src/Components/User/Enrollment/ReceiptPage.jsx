import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // Next.js: useRouter
import axios from 'axios';

const ReceiptPage = () => {
  const { orderId } = useParams();
  const [receipt, setReceipt] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchReceipt = async () => {
      try {
        const res = await axios.get(`/api/payment/receipt/${orderId}`);
        if (res.data.success) {
          setReceipt(res.data.receipt);
        } else {
          setError('Receipt not found or payment incomplete');
        }
      } catch (err) {
        setError(err.response?.data?.error || 'Error fetching receipt');
      } finally {
        setLoading(false);
      }
    };

    if (orderId) fetchReceipt();
  }, [orderId]);

  if (loading) return <div className="p-6 text-gray-600">Loading receipt...</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;
  if (!receipt) return null;

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-xl border border-gray-300">
      <h2 className="text-2xl font-bold mb-6 text-green-700 border-b pb-2">
        Payment Receipt
      </h2>

      <div className="mb-6 text-gray-800 space-y-1">
        <p><strong>Receipt ID:</strong> {receipt.receiptId}</p>
        <p><strong>Order ID:</strong> {receipt.orderId}</p>
        <p><strong>Transaction ID:</strong> {receipt.transactionId}</p>
        <p><strong>Status:</strong> {receipt.status}</p>
        <p><strong>Paid On:</strong> {receipt.paidOn ? new Date(receipt.paidOn).toLocaleString() : 'N/A'}</p>
      </div>

      <div className="mb-6 text-gray-800">
        <h4 className="font-semibold text-lg mb-2">Customer Details</h4>
        <p><strong>Name:</strong> {receipt.customer.name}</p>
        <p><strong>Email:</strong> {receipt.customer.email}</p>
        <p><strong>Phone:</strong> {receipt.customer.phone}</p>
      </div>

      <div className="mb-6 text-gray-800">
        <h4 className="font-semibold text-lg mb-2">Payment Details</h4>
        <p><strong>Amount Paid:</strong> {receipt.amountPaid}</p>
        <p><strong>Payment Method:</strong> {receipt.paymentMethod}</p>
        <p><strong>Card Last 4:</strong> {receipt.cardLast4}</p>
        <p><strong>Card Issuer:</strong> {receipt.cardIssuer}</p>
        <p><strong>Auth Code:</strong> {receipt.authCode}</p>
        <p><strong>RRN:</strong> {receipt.rrn}</p>
        <p><strong>Bank Txn ID:</strong> {receipt.bankTxnId}</p>
      </div>

      <div className="mt-8 text-center">
        <button
          onClick={() => window.print()}
          className="bg-blue-600 text-white px-5 py-2 rounded-lg shadow hover:bg-blue-700"
        >
          Download / Print Receipt
        </button>
      </div>
    </div>
  );
};

export default ReceiptPage;

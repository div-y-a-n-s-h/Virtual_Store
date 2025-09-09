import React, { useEffect } from 'react';
import './Payment.css'; // Optional: Create a CSS file for styles if needed

const Payment = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://ajax.googleapis.com/ajax/libs/jquery/3.6.1/jquery.min.js";
    script.async = true;
    document.body.appendChild(script);

    const razorpayScript = document.createElement('script');
    razorpayScript.src = "https://checkout.razorpay.com/v1/checkout.js";
    razorpayScript.async = true;
    document.body.appendChild(razorpayScript);
  }, []);

  const handlePayment = () => {
    const name = document.querySelector(".name").value;
    const phone = document.querySelector(".number").value;
    const email = document.querySelector(".email").value;
    const amount = document.querySelector(".amount").value;

    if (name && phone && email) {
      const options = {
        key: "rzp_test_BDswwIXEct4A9r", // Replace with your Razorpay API key
        name: "Deepanshu thappa",
        description: "Pay",
        image: "https://yt3.ggpht.com/ytc/AL5GRJV8C79mjvuZKWalgTdrO7QnpREZNbj66eP1rV9I4g=s240-c-k-c0x00ffffff-no-rj",
        prefill: {
          name: name,
          email: email,
          contact: phone,
        },
        theme: {
          color: "#fea317",
        },
        amount: amount * 100,
        currency: "INR",
        handler: function(response) {
          console.log(response.razorpay_payment_id);
          // Handle successful payment here
        },
        modal: {
          ondismiss: function() {
            console.log("Modal closed");
          }
        },
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.on('payment.failed', function(response) {
        console.log("Payment Failed!");
      });
      rzp1.open();
    } else {
      alert("Fill the fields properly!");
    }
  };

  return (
    <div className="wrapper">
      <h2 className="sub-head" data-item="help us">Donate Us</h2>
      <input type="text" placeholder="Name*" className="name" /><br />
      <input type="number" placeholder="Phone Number*" className="number" /><br />
      <input type="email" placeholder="Email*" required className="email" /><br />
      <input type="number" placeholder="Amount*" required className="amount" /><br />
      <button className="btn" onClick={handlePayment}>Pay Now</button>
    </div>
  );
};

export default Payment;
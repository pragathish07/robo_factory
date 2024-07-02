import React from 'react';
import './ReturnsAndRefunds.css';

const ReturnsAndRefunds = () => {
  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Returns and Refunds Policy</h1>
      {/* <p><strong>Effective Date:</strong> [Date]</p> */}

      <p>
        At Binary Autobots Private Limited (Robofactory), we strive to ensure that our customers are satisfied with their purchases.
        If you are not completely satisfied with a product, we offer a return and refund policy to address your concerns.
      </p>

      <h2>Returns Eligibility</h2>
      <ul>
        <li>Items must be unused, undamaged, and in their original packaging to be eligible for return.</li>
        <li>Returns are accepted within 30 days from the date of purchase.</li>
      </ul>

      <h2>Defective Items</h2>
      <ul>
        <li>If any component is found to be defective upon arrival, customers must notify us within 7 days of receiving the item.</li>
        <li>We will provide a prepaid shipping label for the return and offer a replacement or full refund, including return shipping costs.</li>
      </ul>

      <h2>Non-Returnable Items</h2>
      <ul>
        <li>Custom-made or modified parts are non-returnable.</li>
        <li>Items damaged due to misuse, neglect, or improper installation are not eligible for return.</li>
      </ul>

      <h2>Refund Process</h2>
      <ul>
        <li>Refunds will be processed within 5-7 business days of receiving the returned item.</li>
        <li>Refunds will be issued in the original form of payment.</li>
        <li>Customers will receive an email notification once the refund has been processed.</li>
      </ul>

      <h2>Return Shipping</h2>
      <ul>
        <li>Customers are responsible for return shipping costs unless the item is defective or damaged upon arrival.</li>
        <li>For defective or damaged items, we will provide a prepaid shipping label.</li>
      </ul>

      <h2>Restocking Fee</h2>
      <ul>
        <li>A restocking fee of 15% may be applied to returns of non-defective items to cover inspection, repackaging, and restocking costs.</li>
      </ul>

      <h2>Refunds for Cancelled Orders</h2>
      <ul>
        <li>Orders cancelled before shipment will receive a full refund.</li>
        <li>Orders cancelled after shipment will be subject to the standard returns process outlined above.</li>
      </ul>

      <h2>Shipping Damage</h2>
      <ul>
        <li>If an item arrives damaged during shipping, customers must notify us within 48 hours of delivery.</li>
        <li>We will assist customers in filing a claim with the shipping carrier and provide a replacement or refund once the claim is processed.</li>
      </ul>

      <h2>Contact Information</h2>
      <p>
        Customers can contact our customer service team at <a href="mailto:info@binaryautobots.in">info@binaryautobots.in</a> or call us at 7200061904 for assistance with returns or any questions regarding the policy.
      </p>
      <address>
        Binary Autobots Private Limited (Robofactory)<br />
        10-5-111 (1), Gandhi Bazaar, Surandai<br />
        Tirunelveli - 627859<br />
        <a href="mailto:info@binaryautobots.in">info@binaryautobots.in</a><br />
        7200061904
      </address>
    </div>
  );
};

export default ReturnsAndRefunds;

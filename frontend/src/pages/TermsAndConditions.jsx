// pages/TermsAndConditions.jsx
import React from "react";
import { FileText, AlertTriangle, Scale, ShieldCheck, Ban, DollarSign } from "lucide-react";

const TermsAndConditions = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-900 to-black text-white pt-20 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <FileText className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
            Terms and Conditions
          </h1>
          <p className="text-gray-400">Last Updated: {new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
        </div>

        {/* Important Notice */}
        <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-2xl p-6 mb-8">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-yellow-400 mb-2">Important Notice</h3>
              <p className="text-gray-300 leading-relaxed">
                Please read these Terms and Conditions carefully before using our website and services. 
                By accessing or using our services, you agree to be bound by these terms. If you do not agree 
                with any part of these terms, please do not use our services.
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-8">
          
          {/* Introduction */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <FileText className="w-6 h-6 text-purple-400" />
              1. Introduction and Acceptance
            </h2>
            <div className="space-y-3 text-gray-300">
              <p>
                These Terms and Conditions ("Terms") govern your use of the website and services provided by 
                <strong> Shri Ashok Traders</strong>, a registered local shop based in Pratapgarh, Uttar Pradesh, India.
              </p>
              <p>
                By creating an account, placing an order, or using any of our services, you acknowledge that you have 
                read, understood, and agree to be bound by these Terms, as well as our Privacy Policy.
              </p>
              <p>
                <strong>Business Registration:</strong>
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>FSSAI Licensed (Food Safety Standards)</li>
                <li>GST Registered and Compliant</li>
                <li>Operating since 1995</li>
              </ul>
            </div>
          </div>

          {/* Pricing & Final Authority */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <DollarSign className="w-6 h-6 text-purple-400" />
              2. Pricing and Final Authority
            </h2>
            <div className="space-y-3 text-gray-300">
              <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
                <p className="font-bold text-red-400 mb-2">CRITICAL: Prices are NOT Final</p>
                <p>
                  <strong>All prices displayed on this website are indicative and subject to change.</strong> 
                  Prices shown are for reference purposes only and may vary based on market conditions, 
                  product availability, quantity ordered, and other factors.
                </p>
              </div>
              
              <p><strong>Price Determination:</strong></p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Listed prices are estimates and may be higher or lower than actual prices</li>
                <li>Final prices will be quoted and confirmed by Shri Ashok Traders before order fulfillment</li>
                <li>Prices may vary based on quantity, quality grade, and current market rates</li>
                <li>We reserve the right to modify prices at any time without prior notice</li>
                <li>The price confirmed by us at the time of order confirmation is the final price</li>
              </ul>

              <div className="p-4 bg-purple-600/10 border border-purple-500/30 rounded-lg mt-4">
                <p className="font-semibold">
                  <strong>Final Decision Authority:</strong> All decisions regarding pricing, product availability, 
                  order acceptance, and dispute resolution rest solely with Shri Ashok Traders. Our decision is final 
                  and binding in all matters.
                </p>
              </div>
            </div>
          </div>

          {/* Account & User Responsibilities */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20">
            <h2 className="text-2xl font-bold mb-4">3. User Account and Responsibilities</h2>
            <div className="space-y-3 text-gray-300">
              <p><strong>Account Registration:</strong></p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>You must provide accurate, current, and complete information during registration</li>
                <li>We collect only essential information: Name, Phone Number, and Delivery Address</li>
                <li><strong>We do NOT store passwords</strong> on our servers</li>
                <li>You are responsible for maintaining the confidentiality of your account</li>
                <li>You must be at least 18 years old to create an account and place orders</li>
              </ul>

              <p className="mt-4"><strong>User Conduct:</strong></p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>You agree not to misuse our services or engage in fraudulent activities</li>
                <li>You agree to provide genuine contact information for order verification</li>
                <li>Multiple fake orders or suspicious behavior may result in account suspension</li>
                <li>You agree to treat our staff with respect during all interactions</li>
              </ul>
            </div>
          </div>

          {/* Orders & Fulfillment */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <ShieldCheck className="w-6 h-6 text-purple-400" />
              4. Orders and Fulfillment
            </h2>
            <div className="space-y-3 text-gray-300">
              <p><strong>Order Placement:</strong></p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>All orders are subject to acceptance by Shri Ashok Traders</li>
                <li>We reserve the right to refuse or cancel any order for any reason</li>
                <li>Order confirmation does not guarantee final price or product availability</li>
                <li>Quantities mentioned are requests and may be adjusted based on availability</li>
              </ul>

              <p className="mt-4"><strong>Product Availability:</strong></p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Product availability is subject to stock and market conditions</li>
                <li>We reserve the right to substitute products with similar alternatives if original items are unavailable</li>
                <li>In case of unavailability, we will inform you and offer alternatives or cancellation</li>
              </ul>

              <p className="mt-4"><strong>Order Verification:</strong></p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>We may contact you via phone to verify orders, especially for large quantities</li>
                <li>In case of suspicious activity, we reserve the right to request additional verification</li>
                <li>Failure to respond to verification calls may result in order cancellation</li>
              </ul>

              <p className="mt-4"><strong>Scheduled Pickup/Delivery:</strong></p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Pickup times are approximate and may vary based on operational conditions</li>
                <li>Please arrive within the scheduled time window</li>
                <li>Delayed pickups may affect product freshness (perishable items)</li>
                <li>Rescheduling is subject to availability and our approval</li>
              </ul>
            </div>
          </div>

          {/* Payment Terms */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20">
            <h2 className="text-2xl font-bold mb-4">5. Payment Terms</h2>
            <div className="space-y-3 text-gray-300">
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Payment is required at the time of pickup/delivery</li>
                <li>We accept cash and may offer digital payment options (please inquire)</li>
                <li><strong>We do NOT store</strong> any payment information, card details, or banking information</li>
                <li>Proper GST invoices will be provided for all transactions</li>
                <li>Prices are inclusive of applicable GST unless stated otherwise</li>
                <li>In case of price disputes, our quoted price prevails</li>
              </ul>
            </div>
          </div>

          {/* Cancellations & Refunds */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Ban className="w-6 h-6 text-purple-400" />
              6. Cancellations, Returns, and Refunds
            </h2>
            <div className="space-y-3 text-gray-300">
              <p><strong>Order Cancellation:</strong></p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>You may cancel orders while in 'Pending' or 'Confirmed' status</li>
                <li>Once order preparation begins, cancellation may not be possible</li>
                <li>We reserve the right to cancel orders due to unavailability or suspicious activity</li>
                <li>Repeated cancellations may result in account restrictions</li>
              </ul>

              <p className="mt-4"><strong>Returns:</strong></p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Returns are accepted only in case of genuine product defects or quality issues</li>
                <li>Perishable items must be reported within 24 hours of pickup/delivery</li>
                <li>Returns are subject to inspection and our approval</li>
                <li>Custom orders or specially sourced items may not be returnable</li>
              </ul>

              <p className="mt-4"><strong>Refunds:</strong></p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Refunds are processed on a case-by-case basis at our sole discretion</li>
                <li>Valid complaints will be addressed fairly and reasonably</li>
                <li>Refund processing time may vary (typically 7-14 business days)</li>
                <li>Refund decisions made by Shri Ashok Traders are final</li>
              </ul>

              <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg mt-4">
                <p className="font-semibold text-red-400">
                  <strong>Important:</strong> The final decision on all cancellations, returns, and refunds 
                  rests exclusively with Shri Ashok Traders. We strive for fair resolution while protecting 
                  our business interests.
                </p>
              </div>
            </div>
          </div>

          {/* Product Quality & Liability */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20">
            <h2 className="text-2xl font-bold mb-4">7. Product Quality and Liability</h2>
            <div className="space-y-3 text-gray-300">
              <p><strong>Quality Assurance:</strong></p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>We operate under valid FSSAI license and maintain quality standards</li>
                <li>Products are sourced from trusted suppliers</li>
                <li>We conduct reasonable quality checks before dispatch</li>
                <li>Product images are representative; actual products may vary slightly</li>
              </ul>

              <p className="mt-4"><strong>Limitation of Liability:</strong></p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>We are not liable for issues arising from improper storage or handling by customers</li>
                <li>We are not responsible for allergic reactions or health issues unless caused by proven negligence</li>
                <li>Our liability is limited to the value of the product purchased</li>
                <li>We are not liable for indirect, incidental, or consequential damages</li>
              </ul>
            </div>
          </div>

          {/* Data Usage */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20">
            <h2 className="text-2xl font-bold mb-4">8. Data Collection and Usage</h2>
            <div className="space-y-3 text-gray-300">
              <p><strong>Information We Collect:</strong></p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Name:</strong> For identification and addressing customers</li>
                <li><strong>Phone Number:</strong> For order confirmation and communication</li>
                <li><strong>Address:</strong> For accurate delivery (address lines and pincode)</li>
              </ul>

              <p className="mt-4"><strong>What We DO NOT Collect:</strong></p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Passwords:</strong> We do not store passwords on our servers</li>
                <li><strong>Payment Information:</strong> No card details or banking information</li>
                <li><strong>Sensitive Personal Data:</strong> No unnecessary personal information</li>
              </ul>

              <p className="mt-4"><strong>Usage of Information:</strong></p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>To process and fulfill your orders</li>
                <li>To contact you regarding order status and updates</li>
                <li>To verify suspicious activities and prevent fraud</li>
                <li>To improve our services and customer experience</li>
                <li>We will NEVER sell or share your information with third parties for marketing</li>
              </ul>

              <p className="mt-4">
                For detailed information, please refer to our <a href="/privacy-policy" className="text-purple-400 hover:text-purple-300">Privacy Policy</a>.
              </p>
            </div>
          </div>

          {/* Intellectual Property */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20">
            <h2 className="text-2xl font-bold mb-4">9. Intellectual Property</h2>
            <div className="space-y-3 text-gray-300">
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>All content on this website (text, images, logos, design) is owned by Shri Ashok Traders</li>
                <li>You may not copy, reproduce, or distribute our content without permission</li>
                <li>Product images are for reference only and may not be used commercially</li>
                <li>Our business name and branding are protected</li>
              </ul>
            </div>
          </div>

          {/* Dispute Resolution */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Scale className="w-6 h-6 text-purple-400" />
              10. Dispute Resolution and Governing Law
            </h2>
            <div className="space-y-3 text-gray-300">
              <p><strong>Dispute Resolution:</strong></p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>We encourage resolving disputes through direct communication</li>
                <li>Please contact us first if you have any complaints or concerns</li>
                <li>We will make reasonable efforts to resolve issues amicably</li>
                <li><strong>Final Authority:</strong> In case of disagreements, the decision of Shri Ashok Traders is final and binding</li>
              </ul>

              <p className="mt-4"><strong>Governing Law:</strong></p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>These Terms are governed by the laws of India</li>
                <li>Any legal disputes will be subject to the jurisdiction of courts in Pratapgarh, Uttar Pradesh</li>
                <li>You agree to comply with all applicable local, state, and national laws</li>
              </ul>
            </div>
          </div>

          {/* Modifications */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20">
            <h2 className="text-2xl font-bold mb-4">11. Modifications to Terms</h2>
            <div className="space-y-3 text-gray-300">
              <p>
                We reserve the right to modify these Terms and Conditions at any time without prior notice. 
                Changes will be effective immediately upon posting on our website with an updated "Last Updated" date.
              </p>
              <p>
                Your continued use of our services after changes constitutes acceptance of the modified Terms. 
                We recommend reviewing these Terms periodically to stay informed of any updates.
              </p>
            </div>
          </div>

          {/* Termination */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20">
            <h2 className="text-2xl font-bold mb-4">12. Account Termination</h2>
            <div className="space-y-3 text-gray-300">
              <p>We reserve the right to suspend or terminate your account if:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>You violate these Terms and Conditions</li>
                <li>You engage in fraudulent or suspicious activities</li>
                <li>You provide false or misleading information</li>
                <li>You repeatedly cancel orders or cause operational issues</li>
                <li>You misuse our services or staff</li>
              </ul>
              <p className="mt-3">
                You may also request account deletion by contacting us. Upon deletion, your order history 
                may be retained for legal and accounting purposes.
              </p>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-2xl p-6 border border-purple-500/30">
            <h2 className="text-2xl font-bold mb-4">13. Contact Information</h2>
            <p className="text-gray-300 mb-4">
              For questions, concerns, or inquiries about these Terms and Conditions, please contact us:
            </p>
            <div className="space-y-2 text-gray-300">
              <p><strong>Business Name:</strong> Shri Ashok Traders</p>
              <p><strong>Established:</strong> 1995</p>
              <p><strong>Location:</strong> Pratapgarh, Uttar Pradesh, India</p>
              <p><strong>Phone:</strong> [Your Phone Number]</p>
              <p><strong>FSSAI License:</strong> [Your FSSAI Number]</p>
              <p><strong>GST Number:</strong> [Your GST Number]</p>
            </div>
          </div>

          {/* Acceptance */}
          <div className="bg-green-500/10 border border-green-500/30 rounded-2xl p-6">
            <h2 className="text-2xl font-bold mb-4 text-green-400">14. Acceptance of Terms</h2>
            <p className="text-gray-300 leading-relaxed">
              By using our website, creating an account, or placing an order, you acknowledge that you have read, 
              understood, and agree to be bound by these Terms and Conditions, as well as our Privacy Policy. 
              If you do not agree with any part of these terms, please discontinue use of our services immediately.
            </p>
            <p className="text-gray-300 leading-relaxed mt-3">
              <strong>Thank you for choosing Shri Ashok Traders.</strong> We appreciate your business and look 
              forward to serving you with quality products and excellent service!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;
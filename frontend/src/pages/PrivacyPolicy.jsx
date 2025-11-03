// pages/PrivacyPolicy.jsx
import React from "react";
import { Shield, Lock, Eye, Database, Phone, Mail } from "lucide-react";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-900 to-black text-white pt-20 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
            Privacy Policy
          </h1>
          <p className="text-gray-400">Last Updated: {new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
        </div>

        {/* Content */}
        <div className="space-y-8">
          
          {/* Introduction */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Eye className="w-6 h-6 text-purple-400" />
              Introduction
            </h2>
            <p className="text-gray-300 leading-relaxed">
              At Shri Ashok Traders, we are committed to protecting your privacy and ensuring the security of your personal information. 
              This Privacy Policy explains how we collect, use, and safeguard your data when you use our website and services. 
              We are a registered local shop based in Pratapgarh, Uttar Pradesh, operating under valid FSSAI license and GST registration.
            </p>
          </div>

          {/* Information We Collect */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Database className="w-6 h-6 text-purple-400" />
              Information We Collect
            </h2>
            <div className="space-y-4 text-gray-300">
              <div>
                <h3 className="font-semibold text-white mb-2">1. Personal Information</h3>
                <p className="mb-2">We collect only essential information necessary to process your orders:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li><strong>Name:</strong> To identify you and address you properly</li>
                  <li><strong>Phone Number:</strong> To contact you regarding order confirmation and delivery</li>
                  <li><strong>Delivery Address:</strong> To deliver your orders to the correct location (includes address line 1, line 2, and pincode)</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-white mb-2">2. Order Information</h3>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Product details and quantities</li>
                  <li>Order date and scheduled pickup/delivery time</li>
                  <li>Special instructions or preferences</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-white mb-2">3. Information We DO NOT Collect</h3>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li><strong>Passwords:</strong> We do not store or save any passwords on our servers</li>
                  <li><strong>Payment Information:</strong> We do not collect credit/debit card details, CVV, or bank account information</li>
                  <li><strong>Sensitive Personal Data:</strong> We do not collect any sensitive personal information</li>
                </ul>
              </div>
            </div>
          </div>

          {/* How We Use Your Information */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Lock className="w-6 h-6 text-purple-400" />
              How We Use Your Information
            </h2>
            <div className="space-y-3 text-gray-300">
              <p>We use your information solely for the following purposes:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Order Processing:</strong> To confirm and process your orders</li>
                <li><strong>Communication:</strong> To contact you regarding order status, confirmations, and updates</li>
                <li><strong>Delivery:</strong> To ensure accurate delivery of your orders</li>
                <li><strong>Fraud Prevention:</strong> To verify suspicious activities and prevent fraudulent orders</li>
                <li><strong>Customer Support:</strong> To respond to your queries and provide assistance</li>
                <li><strong>Service Improvement:</strong> To improve our products and services based on feedback</li>
              </ul>
              <p className="mt-4 p-3 bg-purple-600/10 border border-purple-500/30 rounded-lg">
                <strong>Important:</strong> We will NEVER sell, rent, or share your personal information with third parties for marketing purposes.
              </p>
            </div>
          </div>

          {/* Data Storage and Security */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20">
            <h2 className="text-2xl font-bold mb-4">Data Storage and Security</h2>
            <div className="space-y-3 text-gray-300">
              <p>We take data security seriously and implement appropriate measures:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Your data is stored on secure servers</li>
                <li>We use industry-standard encryption for data transmission</li>
                <li>Access to your information is restricted to authorized personnel only</li>
                <li>We regularly review and update our security practices</li>
                <li>We do not store passwords - authentication is handled securely</li>
              </ul>
            </div>
          </div>

          {/* Data Retention */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20">
            <h2 className="text-2xl font-bold mb-4">Data Retention</h2>
            <p className="text-gray-300 leading-relaxed">
              We retain your personal information only for as long as necessary to fulfill the purposes outlined in this policy, 
              comply with legal obligations, resolve disputes, and enforce our agreements. Order history is maintained for 
              record-keeping and customer service purposes. You may request deletion of your account and data at any time by 
              contacting us.
            </p>
          </div>

          {/* Your Rights */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20">
            <h2 className="text-2xl font-bold mb-4">Your Rights</h2>
            <div className="space-y-3 text-gray-300">
              <p>You have the following rights regarding your personal information:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Access:</strong> Request a copy of your personal data</li>
                <li><strong>Correction:</strong> Update or correct your information through your profile</li>
                <li><strong>Deletion:</strong> Request deletion of your account and data</li>
                <li><strong>Opt-out:</strong> Unsubscribe from promotional communications</li>
                <li><strong>Data Portability:</strong> Request your data in a structured format</li>
              </ul>
              <p className="mt-4">To exercise these rights, please contact us using the information provided below.</p>
            </div>
          </div>

          {/* Cookies and Tracking */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20">
            <h2 className="text-2xl font-bold mb-4">Cookies and Tracking</h2>
            <p className="text-gray-300 leading-relaxed mb-3">
              Our website uses minimal cookies and local storage to provide basic functionality:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4 text-gray-300">
              <li><strong>Essential Cookies:</strong> Required for login and cart functionality</li>
              <li><strong>Local Storage:</strong> To remember your cart items and preferences</li>
              <li>We do not use third-party tracking or advertising cookies</li>
              <li>You can clear cookies and local storage through your browser settings</li>
            </ul>
          </div>

          {/* Third-Party Services */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20">
            <h2 className="text-2xl font-bold mb-4">Third-Party Services</h2>
            <p className="text-gray-300 leading-relaxed">
              We use Cloudinary for image storage and hosting. Images uploaded to our platform are stored on Cloudinary's 
              secure servers. We do not share any personal information with Cloudinary beyond what is necessary for image 
              hosting services. We do not use any analytics, advertising, or tracking services from third parties.
            </p>
          </div>

          {/* Children's Privacy */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20">
            <h2 className="text-2xl font-bold mb-4">Children's Privacy</h2>
            <p className="text-gray-300 leading-relaxed">
              Our services are intended for users aged 18 and above. We do not knowingly collect personal information from 
              children under 18. If you are a parent or guardian and believe your child has provided us with personal information, 
              please contact us immediately, and we will delete such information.
            </p>
          </div>

          {/* Changes to Privacy Policy */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20">
            <h2 className="text-2xl font-bold mb-4">Changes to This Privacy Policy</h2>
            <p className="text-gray-300 leading-relaxed">
              We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. 
              We will notify you of any significant changes by posting the updated policy on our website with a new "Last Updated" 
              date. Your continued use of our services after such changes constitutes acceptance of the updated policy.
            </p>
          </div>

          {/* Contact Information */}
          <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-2xl p-6 border border-purple-500/30">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Phone className="w-6 h-6 text-purple-400" />
              Contact Us
            </h2>
            <p className="text-gray-300 mb-4">
              If you have any questions, concerns, or requests regarding this Privacy Policy or your personal information, 
              please contact us:
            </p>
            <div className="space-y-2 text-gray-300">
              <p><strong>Business Name:</strong> Shri Ashok Traders</p>
              <p><strong>Location:</strong> Pratapgarh, Uttar Pradesh, India</p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-purple-400" />
                <strong>Phone:</strong> 91187 00266
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-purple-400" />
                <strong>Email:</strong> satyamkasaudhan29@gmail.com
              </p>
              <p><strong>FSSAI License:</strong> [Your FSSAI Number]</p>
              <p><strong>GST Number:</strong> [Your GST Number]</p>
            </div>
          </div>

          {/* Consent */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-green-500/20">
            <h2 className="text-2xl font-bold mb-4 text-green-400">Your Consent</h2>
            <p className="text-gray-300 leading-relaxed">
              By using our website and services, you consent to the collection and use of your information as described in 
              this Privacy Policy. If you do not agree with this policy, please do not use our services.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
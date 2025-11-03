// pages/FAQ.jsx
import React, { useState } from "react";
import { HelpCircle, ChevronDown, ChevronUp, ShoppingCart, Package, MapPin, CreditCard, Shield, Phone } from "lucide-react";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      category: "Orders & Pricing",
      icon: ShoppingCart,
      questions: [
        {
          q: "Are the prices shown on the website final?",
          a: "No, the prices displayed on our website are indicative and subject to change. Final prices will be quoted and confirmed by us before order fulfillment based on current market rates, product availability, and quantity. The actual price may be slightly higher or lower than listed prices."
        },
        {
          q: "How do I place an order?",
          a: "Simply browse our products, add items to your cart, select the desired quantity (in kg, grams, or pieces), choose your pickup date and time, and schedule your order. You'll need to create an account or login to complete the order."
        },
        {
          q: "Can I modify my order after placing it?",
          a: "Yes, you can modify or cancel your order if it's still in 'Pending' or 'Confirmed' status. Once the order is being prepared, modifications may not be possible. Please contact us immediately if you need to make changes."
        },
        {
          q: "What is the minimum order value?",
          a: "We do not have a minimum order value. You can order any quantity based on your needs. However, we recommend ordering reasonable quantities as prices are quoted based on quantities ordered."
        },
        {
          q: "Do you offer bulk discounts?",
          a: "Yes, we offer special pricing for bulk orders. The final price will be quoted based on the quantity you order. Please contact us directly for bulk order inquiries."
        }
      ]
    },
    {
      category: "Delivery & Pickup",
      icon: Package,
      questions: [
        {
          q: "Do you deliver to my location?",
          a: "We primarily serve customers in Pratapgarh, Uttar Pradesh, and surrounding areas. During checkout, you can enter your address to schedule a pickup. For deliveries outside our regular service area, please contact us to check availability."
        },
        {
          q: "How does scheduled pickup work?",
          a: "You can select your preferred date and time during checkout. Our team will prepare your order and have it ready for pickup at the scheduled time. You'll receive notifications when your order status changes."
        },
        {
          q: "Can I schedule same-day pickup?",
          a: "Yes, same-day pickup is available if you place your order before our cutoff time. Please select today's date and an appropriate time slot during checkout."
        },
        {
          q: "What if I miss my scheduled pickup time?",
          a: "Please contact us as soon as possible if you cannot make your scheduled pickup. We'll try our best to accommodate a reschedule, subject to product availability and storage constraints."
        }
      ]
    },
    {
      category: "Payment & Security",
      icon: CreditCard,
      questions: [
        {
          q: "What payment methods do you accept?",
          a: "We accept cash on pickup/delivery. We're a registered business with valid GST registration, and proper invoices will be provided for all transactions. Digital payment options may be available - please inquire at the time of order."
        },
        {
          q: "Do you store my payment information?",
          a: "No, we do not store any payment information, credit/debit card details, or bank account information on our servers. All transactions are handled securely at the time of payment."
        },
        {
          q: "Is my personal information safe?",
          a: "Yes, we only collect essential information (name, phone number, and address) necessary to process your orders. We do not store passwords or any sensitive personal data. Please read our Privacy Policy for more details."
        },
        {
          q: "Will I receive an invoice?",
          a: "Yes, we provide proper GST invoices for all transactions as we are a registered business. You'll receive your invoice at the time of pickup/delivery."
        }
      ]
    },
    {
      category: "Products & Quality",
      icon: Shield,
      questions: [
        {
          q: "Are your products licensed and safe?",
          a: "Yes, we operate under a valid FSSAI (Food Safety and Standards Authority of India) license. All our food products meet safety standards and regulations. We are also GST registered and compliant with all legal requirements."
        },
        {
          q: "How do you ensure product quality?",
          a: "We source our products from trusted suppliers and conduct quality checks before making them available. We've been serving the community since 1995 and take pride in maintaining high quality standards."
        },
        {
          q: "What if I receive a damaged or incorrect product?",
          a: "If you receive any damaged, incorrect, or unsatisfactory products, please contact us immediately. We'll work with you to resolve the issue promptly, either through replacement or refund as appropriate."
        },
        {
          q: "Do you accept returns?",
          a: "Returns are evaluated on a case-by-case basis, especially for perishable items. Please contact us within 24 hours of pickup/delivery if there's any issue with your order. The final decision on returns and refunds rests with us."
        },
        {
          q: "Can I see the products before buying?",
          a: "For online orders, you can view product images and descriptions on our website. If you'd like to see products in person, you're welcome to visit our shop in Pratapgarh during business hours."
        }
      ]
    },
    {
      category: "Account & Technical",
      icon: HelpCircle,
      questions: [
        {
          q: "Do I need to create an account?",
          a: "Yes, you need to create an account to place orders. This helps us maintain your order history, track your preferences, and provide better service. Account creation is quick and simple."
        },
        {
          q: "How do I reset my password?",
          a: "We do not store passwords on our servers. If you're having trouble logging in, please contact us directly, and we'll assist you with account access."
        },
        {
          q: "How do I update my delivery address?",
          a: "You can update your address in your profile settings or enter a different address during checkout. Make sure your address includes all necessary details (address lines and pincode)."
        },
        {
          q: "I'm not receiving order notifications. What should I do?",
          a: "Make sure your phone number is correct in your profile. Check your notification settings and ensure you have a stable internet connection. If issues persist, contact us directly."
        },
        {
          q: "Can I track my order status?",
          a: "Yes, you can view your order status in the 'My Orders' section of your account. You'll see status updates as your order progresses: Pending → Confirmed → Preparing → Ready → Completed."
        }
      ]
    },
    {
      category: "Business Information",
      icon: MapPin,
      questions: [
        {
          q: "How long have you been in business?",
          a: "Shri Ashok Traders has been serving the community since 1995 - that's over 30 years of trusted service. We've built our reputation on quality products and customer satisfaction."
        },
        {
          q: "Are you a registered business?",
          a: "Yes, we are a fully registered business with valid FSSAI license for food products and GST registration. We comply with all legal requirements and provide proper documentation for all transactions."
        },
        {
          q: "Where are you located?",
          a: "We are located in Pratapgarh, Uttar Pradesh. You can visit us during business hours or contact us for our exact address and directions."
        },
        {
          q: "What are your business hours?",
          a: "Please contact us for current business hours as they may vary. You can place online orders 24/7, and we'll prepare them according to your scheduled pickup time."
        },
        {
          q: "How can I contact you?",
          a: "You can reach us by phone at [Your Phone Number] or visit our shop in Pratapgarh. For general inquiries, you can also use the contact information provided in the footer of our website."
        }
      ]
    },
    {
      category: "Terms & Policies",
      icon: Shield,
      questions: [
        {
          q: "What are your terms and conditions?",
          a: "Please visit our Terms and Conditions page for complete details. Key points include: prices are indicative and subject to our final quote, orders are subject to product availability, and we reserve the right to accept or refuse any order."
        },
        {
          q: "How do you handle disputes?",
          a: "We strive for customer satisfaction and handle all disputes fairly. Our decision is final in case of any disagreements regarding orders, pricing, or services. We encourage open communication to resolve issues amicably."
        },
        {
          q: "Do you have a refund policy?",
          a: "Refunds are handled on a case-by-case basis and are at our discretion. For valid complaints or issues, we'll work with you to find a fair solution. The final decision on refunds rests with Shri Ashok Traders."
        },
        {
          q: "Can you refuse or cancel my order?",
          a: "Yes, we reserve the right to refuse or cancel any order in case of suspicious activity, product unavailability, pricing errors, or if we're unable to fulfill the order for any reason. You'll be notified promptly if this occurs."
        }
      ]
    }
  ];

  const toggleQuestion = (categoryIndex, questionIndex) => {
    const index = `${categoryIndex}-${questionIndex}`;
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-900 to-black text-white pt-20 pb-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <HelpCircle className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Find answers to common questions about our products, services, and policies. 
            Can't find what you're looking for? Contact us directly!
          </p>
        </div>

        {/* FAQ Categories */}
        <div className="space-y-6">
          {faqs.map((category, categoryIndex) => {
            const CategoryIcon = category.icon;
            return (
              <div key={categoryIndex} className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-purple-500/20 overflow-hidden">
                <div className="p-6 border-b border-purple-500/20 bg-slate-900/50">
                  <h2 className="text-2xl font-bold flex items-center gap-3">
                    <CategoryIcon className="w-6 h-6 text-purple-400" />
                    {category.category}
                  </h2>
                </div>

                <div className="divide-y divide-purple-500/10">
                  {category.questions.map((faq, questionIndex) => {
                    const isOpen = openIndex === `${categoryIndex}-${questionIndex}`;
                    return (
                      <div key={questionIndex} className="p-6">
                        <button
                          onClick={() => toggleQuestion(categoryIndex, questionIndex)}
                          className="w-full flex items-start justify-between gap-4 text-left group"
                        >
                          <span className="flex-1 font-semibold text-lg group-hover:text-purple-400 transition-colors">
                            {faq.q}
                          </span>
                          {isOpen ? (
                            <ChevronUp className="w-5 h-5 text-purple-400 flex-shrink-0 mt-1" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0 mt-1 group-hover:text-purple-400 transition-colors" />
                          )}
                        </button>
                        
                        {isOpen && (
                          <div className="mt-4 pl-0 text-gray-300 leading-relaxed animate-fadeIn">
                            {faq.a}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Still Have Questions */}
        <div className="mt-12 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-2xl p-8 border border-purple-500/30 text-center">
          <Phone className="w-12 h-12 text-purple-400 mx-auto mb-4" />
          <h3 className="text-2xl font-bold mb-3">Still Have Questions?</h3>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            We're here to help! If you couldn't find the answer you're looking for, 
            please don't hesitate to reach out to us directly.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:[YOUR_PHONE]"
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-semibold hover:from-pink-600 hover:to-purple-600 transition-all"
            >
              Call Us
            </a>
            <button
              onClick={() => window.location.href = '/contact'}
              className="px-6 py-3 bg-slate-800 border border-purple-500/30 rounded-xl font-semibold hover:bg-slate-700 transition-all"
            >
              Contact Us
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default FAQ;
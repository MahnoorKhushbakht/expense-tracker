'use client';
import { useState } from "react";
import {motion} from 'motion/react'

export default function ContactPage() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL_Contact;
  const [formData, setFormData] = useState({ email: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [statusType, setStatusType] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatusMessage('');

    if (!validateEmail(formData.email)) {
      setStatusType('error');
      setStatusMessage('Please enter a valid email address.');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      setLoading(false);

      if (response.ok) {
        setStatusType('success');
        setStatusMessage('Thank you! Your message has been sent successfully.');
        setFormData({ email: '', message: '' });
      } else {
        setStatusType('error');
        setStatusMessage('An error occurred. Please try again later.');
      }
    } catch (error) {
      setLoading(false);
      setStatusType('error');
      setStatusMessage('Submission error. Please try again.');
      console.error('Submission error:', error);
    }
  };

  return (
    <section 
    className="relative w-full h-screen">
      {/* Map Background */}
      <div className="absolute inset-0 w-full h-full">
        <iframe
          width="100%"
          height="100%"
          frameBorder="0"
          title="map"
          scrolling="no"
          loading="lazy"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3023.7057718910783!2d-74.00601508459442!3d40.71277677933153!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDQyJzQ2LjAiTiA3NMKwMDAnMTYuMCJX!5e0!3m2!1sen!2sus!4v1635867273169!5m2!1sen!2sus"
          style={{ filter: "grayscale(1) contrast(1.2) opacity(0.4)" }}
        ></iframe>
      </div>

      {/* Contact Form */}
      <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
                duration: 0.8,
                delay: 0.5,
                ease: [0, 0.71, 0.2, 1.01],
            }}
      className="relative z-10 flex items-center justify-center h-full p-4">
        <div className="w-full max-w-md bg-black bg-opacity-90 rounded-lg p-6 shadow-lg">
          <h2 className="text-amber-100 text-xl mb-2 font-semibold">Contact Us</h2>
          <p className="text-amber-100 text-sm mb-4">
            Have a question or suggestion about the Expense Tracker? Drop us a message and we’ll get back to you soon.
          </p>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm text-amber-200/70 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-amber-200 text-amber-700 placeholder-amber-500 border border-amber-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="message" className="block text-sm text-amber-200/70 mb-1">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                placeholder="How can we help you?"
                value={formData.message}
                onChange={handleChange}
                className="w-full bg-amber-200 text-amber-700 placeholder-amber-500 border border-amber-300 rounded px-3 py-2 h-28 resize-none focus:outline-none focus:ring-2 focus:ring-amber-400"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-amber-100 text-amber-700 font-semibold py-2 rounded hover:bg-amber-500 hover:text-white transition"
              disabled={loading}
            >
              {loading ? (
                <div className="flex justify-center">
                  <svg
                    className="animate-spin h-5 w-5 text-amber-600"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 11-8 8z"
                    ></path>
                  </svg>
                </div>
              ) : (
                'Send'
              )}
            </button>
          </form>

          {statusMessage && (
            <p className={`text-sm mt-3 ${statusType === 'success' ? 'text-green-500' : 'text-red-500'}`}>
              {statusMessage}
            </p>
          )}

          <p className="text-xs text-amber-300 mt-4">
            We value your input. Our team is here to support your financial goals with the Expense Tracker.
          </p>
        </div>
      </motion.div>
    </section>
  );
}

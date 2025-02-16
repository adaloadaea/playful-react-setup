
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';
import ParallaxText from '../components/ParallaxText';

const Contact = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <div className="relative h-[40vh] flex items-center justify-center bg-gradient-to-br from-[#1A1F2C] to-[#222222] overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/banners/contact-banner.jpg')] bg-cover bg-center opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1A1F2C]/50 to-[#222222]/80" />
        <ParallaxText y={[0, -100]}>
          <div className="relative text-center px-4">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-bold mb-4 text-[#E5DEFF]"
            >
              Contactez-nous
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-[#D3E4FD] max-w-2xl mx-auto"
            >
              Créons ensemble quelque chose d'extraordinaire
            </motion.p>
          </div>
        </ParallaxText>
      </div>

      {/* Contact Form Section */}
      <div className="py-20 px-4 bg-gradient-to-b from-[#1A1F2C] to-[#222222]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid md:grid-cols-2 gap-12"
          >
            {/* Contact Information */}
            <motion.div variants={itemVariants} className="space-y-8">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-[#1EAEDB] to-[#0FA0CE] rounded-lg blur opacity-20 transition duration-1000" />
                <div className="relative bg-[#221F26]/90 backdrop-blur-xl p-8 rounded-lg border border-white/10">
                  <h2 className="text-2xl font-bold mb-6 text-[#D3E4FD]">Informations de Contact</h2>
                  <div className="space-y-6">
                    <motion.div
                      whileHover={{ x: 10 }}
                      className="flex items-center space-x-4 group"
                    >
                      <div className="w-12 h-12 bg-[#1EAEDB]/10 rounded-full flex items-center justify-center group-hover:bg-[#1EAEDB]/20 transition-colors">
                        <Mail className="h-6 w-6 text-[#1EAEDB]" />
                      </div>
                      <div>
                        <p className="font-medium text-[#1EAEDB]">Email</p>
                        <p className="text-[#C8C8C9]">contact@vilart.com</p>
                      </div>
                    </motion.div>
                    <motion.div
                      whileHover={{ x: 10 }}
                      className="flex items-center space-x-4 group"
                    >
                      <div className="w-12 h-12 bg-[#1EAEDB]/10 rounded-full flex items-center justify-center group-hover:bg-[#1EAEDB]/20 transition-colors">
                        <Phone className="h-6 w-6 text-[#1EAEDB]" />
                      </div>
                      <div>
                        <p className="font-medium text-[#1EAEDB]">Téléphone</p>
                        <p className="text-[#C8C8C9]">+1 234 567 890</p>
                      </div>
                    </motion.div>
                    <motion.div
                      whileHover={{ x: 10 }}
                      className="flex items-center space-x-4 group"
                    >
                      <div className="w-12 h-12 bg-[#1EAEDB]/10 rounded-full flex items-center justify-center group-hover:bg-[#1EAEDB]/20 transition-colors">
                        <MapPin className="h-6 w-6 text-[#1EAEDB]" />
                      </div>
                      <div>
                        <p className="font-medium text-[#1EAEDB]">Adresse</p>
                        <p className="text-[#C8C8C9]">123 Rue de la Musique, Paris</p>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-[#1EAEDB] to-[#0FA0CE] rounded-lg blur opacity-20 transition duration-1000" />
                <div className="relative bg-[#221F26]/90 backdrop-blur-xl p-8 rounded-lg border border-white/10">
                  <h2 className="text-2xl font-bold mb-6 text-[#D3E4FD]">Heures d'Ouverture</h2>
                  <div className="space-y-2 text-[#C8C8C9]">
                    <p>Lundi - Vendredi: 9h00 - 18h00</p>
                    <p>Samedi: 10h00 - 16h00</p>
                    <p>Dimanche: Fermé</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div variants={itemVariants}>
              <form onSubmit={handleSubmit} className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-[#1EAEDB] to-[#0FA0CE] rounded-lg blur opacity-20 transition duration-1000" />
                <div className="relative bg-[#221F26]/90 backdrop-blur-xl p-8 rounded-lg border border-white/10">
                  <div className="space-y-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-2 text-[#D3E4FD]">
                        Nom
                      </label>
                      <input
                        type="text"
                        id="name"
                        className="w-full px-4 py-3 bg-[#1A1F2C]/80 border border-white/10 rounded-lg focus:ring-2 focus:ring-[#1EAEDB] focus:border-transparent transition-colors text-white"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-2 text-[#D3E4FD]">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        className="w-full px-4 py-3 bg-[#1A1F2C]/80 border border-white/10 rounded-lg focus:ring-2 focus:ring-[#1EAEDB] focus:border-transparent transition-colors text-white"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium mb-2 text-[#D3E4FD]">
                        Sujet
                      </label>
                      <select
                        id="subject"
                        className="w-full px-4 py-3 bg-[#1A1F2C]/80 border border-white/10 rounded-lg focus:ring-2 focus:ring-[#1EAEDB] focus:border-transparent transition-colors text-white"
                        required
                      >
                        <option value="">Sélectionnez un sujet</option>
                        <option value="production">Production Musicale</option>
                        <option value="events">Organisation d'Événements</option>
                        <option value="other">Autre</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium mb-2 text-[#D3E4FD]">
                        Message
                      </label>
                      <textarea
                        id="message"
                        rows={6}
                        className="w-full px-4 py-3 bg-[#1A1F2C]/80 border border-white/10 rounded-lg focus:ring-2 focus:ring-[#1EAEDB] focus:border-transparent transition-colors text-white resize-none"
                        required
                      ></textarea>
                    </div>
                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`w-full px-6 py-3 bg-gradient-to-r from-[#1EAEDB] to-[#0FA0CE] text-white font-semibold rounded-lg flex items-center justify-center space-x-2 transition-all duration-300 hover:from-[#33C3F0] hover:to-[#1EAEDB] ${
                        isSubmitted ? 'bg-green-500' : ''
                      }`}
                    >
                      {isSubmitted ? (
                        <>
                          <CheckCircle2 className="h-5 w-5" />
                          <span>Message Envoyé!</span>
                        </>
                      ) : (
                        <>
                          <Send className="h-5 w-5" />
                          <span>Envoyer le Message</span>
                        </>
                      )}
                    </motion.button>
                  </div>
                </div>
              </form>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;

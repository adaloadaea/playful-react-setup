import { motion } from 'framer-motion';
import { Code, PenTool, Smartphone, Layout, Paintbrush, Globe, ArrowRight, Check, ChevronDown } from 'lucide-react';
import ParallaxText from '../components/ParallaxText';
import { Button } from "@/components/ui/button";

const Digital = () => {
  const services = [
    {
      icon: <PenTool className="h-8 w-8" />,
      title: "Design Graphique",
      description: "Création d'identités visuelles uniques, logos et supports marketing qui captivent votre audience.",
      features: ["Identité visuelle", "Logos", "Chartes graphiques", "Supports marketing"]
    },
    {
      icon: <Smartphone className="h-8 w-8" />,
      title: "Applications Mobiles",
      description: "Développement d'applications mobiles innovantes pour iOS et Android, offrant une expérience utilisateur exceptionnelle.",
      features: ["iOS & Android", "UX/UI Design", "Performance", "Maintenance"]
    },
    {
      icon: <Globe className="h-8 w-8" />,
      title: "Sites Web",
      description: "Conception et développement de sites web responsifs et modernes qui reflètent votre image de marque.",
      features: ["Sites vitrines", "E-commerce", "Blogs", "Applications web"]
    },
    {
      icon: <Layout className="h-8 w-8" />,
      title: "UI/UX Design",
      description: "Création d'interfaces intuitives et d'expériences utilisateur fluides pour vos projets digitaux.",
      features: ["Wireframes", "Prototypes", "Tests utilisateurs", "Design system"]
    },
    {
      icon: <Paintbrush className="h-8 w-8" />,
      title: "Branding Digital",
      description: "Développement de votre présence en ligne avec une stratégie de marque cohérente et impactante.",
      features: ["Stratégie digitale", "Réseaux sociaux", "Content marketing", "SEO"]
    },
    {
      icon: <Code className="h-8 w-8" />,
      title: "Développement Sur Mesure",
      description: "Solutions techniques personnalisées pour répondre à vos besoins spécifiques.",
      features: ["Architecture", "APIs", "Intégration", "Sécurité"]
    }
  ];

  const stats = [
    { number: "150+", label: "Projets Réalisés" },
    { number: "98%", label: "Clients Satisfaits" },
    { number: "15+", label: "Années d'Expérience" },
    { number: "24/7", label: "Support Client" }
  ];

  const workExamples = [
    {
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
      title: "Développement d'Application Mobile",
      description: "Application mobile de gestion pour une entreprise leader dans son secteur."
    },
    {
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
      title: "Site Web E-commerce",
      description: "Plateforme de vente en ligne avec intégration de paiement sécurisé."
    },
    {
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
      title: "Refonte Digitale",
      description: "Transformation digitale complète pour une marque internationale."
    },
    {
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
      title: "Design UX/UI",
      description: "Interface utilisateur intuitive pour une application SaaS."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-rich-black to-rich-black/95">
      <div className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/banners/digital-banner.jpg')] bg-cover bg-center opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/70 to-black/90" />
        <ParallaxText y={[0, -100]}>
          <div className="relative z-10 text-center px-4">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-bold mb-6 text-gold-600 font-playfair"
            >
              Services Digitaux
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-off-white max-w-2xl mx-auto"
            >
              Transformez votre vision en réalité numérique avec nos solutions créatives et innovantes
            </motion.p>
          </div>
        </ParallaxText>
        
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-gold-600 cursor-pointer"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
        >
          <ChevronDown className="w-8 h-8" />
        </motion.div>
      </div>

      <div className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gold-600 font-playfair mb-6">
              Nos Réalisations
            </h2>
            <p className="text-off-white/80 max-w-3xl mx-auto">
              Découvrez quelques-uns de nos projets digitaux qui ont transformé la présence en ligne de nos clients.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {workExamples.map((example, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group relative overflow-hidden rounded-lg luxury-card"
              >
                <div className="aspect-square">
                  <img
                    src={example.image}
                    alt={example.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-gold-600 font-semibold mb-2">{example.title}</h3>
                    <p className="text-off-white/80 text-sm">{example.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="luxury-card p-6 rounded-lg text-center"
              >
                <h3 className="text-3xl md:text-4xl font-bold text-gold-600 font-playfair">
                  {stat.number}
                </h3>
                <p className="text-off-white/80 mt-2">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <div className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gold-600 font-playfair mb-6">
              Nos Services Digitaux
            </h2>
            <p className="text-off-white/80 max-w-3xl mx-auto">
              De la conception à la réalisation, nous vous accompagnons dans tous vos projets digitaux avec expertise et créativité.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group relative"
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-gold-700 to-gold-600 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
                <div className="luxury-card relative p-8 rounded-lg transition-all duration-300">
                  <div className="text-gold-600 mb-6 group-hover:scale-110 transform transition-transform duration-300">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gold-600 mb-4 font-playfair">
                    {service.title}
                  </h3>
                  <p className="text-off-white/80 mb-6">
                    {service.description}
                  </p>
                  <ul className="space-y-3">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-off-white/70">
                        <Check className="h-4 w-4 mr-2 text-gold-600" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button
                    className="mt-6 w-full bg-gold-700 hover:bg-gold-600 text-rich-black font-medium transition-all duration-300"
                    onClick={() => window.location.href = '/devis'}
                  >
                    Demander un devis
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <div className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative group"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-gold-700 to-gold-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
            <div className="luxury-card relative p-12 rounded-lg">
              <h2 className="text-3xl font-bold text-gold-600 font-playfair mb-6">
                Prêt à Démarrer Votre Projet Digital ?
              </h2>
              <p className="text-off-white/80 mb-8">
                Contactez-nous pour discuter de vos besoins et découvrir comment nous pouvons vous aider à atteindre vos objectifs.
              </p>
              <motion.a
                href="/devis"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-gold-700 to-gold-600 text-rich-black font-semibold rounded-lg hover:from-gold-600 hover:to-gold-500 transition-all duration-300 shadow-lg"
              >
                Demander un Devis
                <ArrowRight className="h-5 w-5" />
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Digital;

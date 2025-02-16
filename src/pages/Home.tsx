import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PartyPopper, ArrowRight, Music2, Video, ChevronDown } from 'lucide-react';
import HeroVideo from '../components/HeroVideo';
import VideoBackground from '../components/VideoBackground';
import PhotoGallery from '../components/PhotoGallery';

const Home = () => {
  const services = [
    {
      icon: <Music2 className="h-12 w-12" />,
      title: "Production Musicale",
      description: "Studio d'enregistrement professionnel, mixage et mastering de haute qualité",
      link: "/prod"
    },
    {
      icon: <Video className="h-12 w-12" />,
      title: "Production Vidéo",
      description: "Clips musicaux, contenu promotionnel et narration visuelle exceptionnelle",
      link: "/prod"
    },
    {
      icon: <PartyPopper className="h-12 w-12" />,
      title: "Organisation d'Événements",
      description: "Des concerts intimes aux festivals grandioses, nous donnons vie à votre vision",
      link: "/events"
    }
  ];

  return (
    <div className="relative">
      <VideoBackground
        videoUrl="https://player.vimeo.com/external/403619009.sd.mp4?s=51fb1fe1c5a2088f1d811e944e6e1231c1f2b21f&profile_id=164&oauth2_token_id=57447761"
        overlay="bg-gradient-to-b from-black/80 via-black/70 to-black/90"
      >
        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="text-center px-4 max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-col items-center space-y-8"
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="relative"
              >
                <img 
                  src="https://i.ibb.co/rGDfG4C2/logo1-removebg-preview.png" 
                  alt="Vilart Logo" 
                  className="h-24 md:h-32 w-auto filter drop-shadow-2xl"
                />
                <div className="absolute inset-0 bg-gold-400/20 blur-3xl -z-10" />
              </motion.div>
              
              <motion.h1 
                className="text-5xl md:text-7xl font-bold mb-4 text-white gold-text-shadow"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Créez l'
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-gold-300 via-gold-500 to-gold-300 animate-gradient">
                  Extraordinaire
                </span>
              </motion.h1>

              <motion.p 
                className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl font-light"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                Production musicale professionnelle et organisation d'événements d'exception
              </motion.p>

              <motion.div 
                className="flex flex-col md:flex-row gap-6 justify-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                <Link
                  to="/prod"
                  className="group px-8 py-4 bg-gradient-to-r from-gold-600 to-gold-500 text-black font-semibold rounded-lg hover:from-gold-500 hover:to-gold-400 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-gold-500/20"
                >
                  <span className="flex items-center justify-center">
                    Découvrir Nos Créations
                    <ArrowRight className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
                <Link
                  to="/contact"
                  className="group px-8 py-4 border-2 border-white/20 text-white font-semibold rounded-lg hover:bg-white/10 transition-all duration-300 transform hover:scale-105 backdrop-blur-sm"
                >
                  <span className="flex items-center justify-center">
                    Nous Contacter
                    <ArrowRight className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>

        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <span className="text-white/60 text-sm mb-2">Découvrir</span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <ChevronDown className="h-6 w-6 text-white/60" />
          </motion.div>
        </motion.div>
      </VideoBackground>

      <section className="py-20 px-4 bg-gradient-to-b from-black to-rich-black">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">
              Notre Showreel
            </h2>
            <p className="text-xl text-white/80">
              Découvrez nos meilleures productions en vidéo
            </p>
          </motion.div>
          
          <HeroVideo
            thumbnailUrl="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04"
            videoUrl="https://player.vimeo.com/external/403619009.sd.mp4?s=51fb1fe1c5a2088f1d811e944e6e1231c1f2b21f&profile_id=164&oauth2_token_id=57447761"
            title="Vilart Productions Showreel 2024"
            description="Un aperçu de nos meilleures réalisations"
          />
        </div>
      </section>

      <section className="py-20 px-4 bg-black">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">
              Nos Services
            </h2>
            <p className="text-xl text-white/80">
              Une expertise complète pour vos projets
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="luxury-card p-8 rounded-xl hover:transform hover:scale-105 transition-all duration-300"
              >
                <div className="mb-6 text-gold-400">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white">{service.title}</h3>
                <p className="text-white/80 mb-8">{service.description}</p>
                <Link
                  to={service.link}
                  className="inline-flex items-center text-gold-400 hover:text-gold-300 group"
                >
                  En savoir plus 
                  <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-2 transition-transform" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <PhotoGallery />
    </div>
  );
};

export default Home;


import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogClose } from "@/components/ui/dialog";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const galleryImages = [
  {
    id: 1,
    image: "/Vitaprod/ON THE WAY 🔥 👀 __comingsoon _fbk _vilartprod(JPG)_1.jpg",
    title: "On The Way",
    description: "Coming soon teaser - FBK project"
  },
  {
    id: 2,
    image: "/Vitaprod/ON THE WAY 🔥 👀 __comingsoon _fbk _vilartprod(JPG)_2.jpg",
    title: "Studio Session",
    description: "Behind the scenes with FBK"
  },
  {
    id: 3,
    image: "/Vitaprod/ON THE WAY 🔥 👀 __comingsoon _fbk _vilartprod(JPG)_4.jpg",
    title: "Production Setup",
    description: "Professional recording equipment"
  },
  {
    id: 4,
    image: "/Vitaprod/ON THE WAY 🔥 👀 __comingsoon _fbk _vilartprod(JPG)_5.jpg",
    title: "Artist Performance",
    description: "Live recording session"
  },
  {
    id: 5,
    image: "/Vitaprod/Some snaps from the next project featuring _f.b.k_official ✨️ _Enjoyable shoot _ loved the outcome ⚡️_Cinematography _ Edit _ _og__visuals 👽🁟1.webp",
    title: "Project Snaps",
    description: "FBK Official - Photography Session"
  },
  {
    id: 6,
    image: "/Vitaprod/Some snaps from the next project featuring _f.b.k_official ✨️ _Enjoyable shoot _ loved the outcome ⚡️_Cinematography _ Edit _ _og__visuals 👽🁟2.webp",
    title: "Cinematography",
    description: "Visual storytelling through lens"
  },
  {
    id: 7,
    image: "/Vitaprod/Some snaps from the next project featuring _f.b.k_official ✨️ _Enjoyable shoot _ loved the outcome ⚡️_Cinematography _ Edit _ _og__visuals 👽🁟3.webp",
    title: "Creative Direction",
    description: "Artistic vision brought to life"
  },
  {
    id: 8,
    image: "/Vitaprod/Some snaps from the next project featuring _f.b.k_official ✨️ _Enjoyable shoot _ loved the outcome ⚡️_Cinematography _ Edit _ _og__visuals 👽🁟4.webp",
    title: "Visual Effects",
    description: "Post-production magic"
  },
  {
    id: 9,
    image: "/Vitaprod/Some snaps from the next project featuring _f.b.k_official ✨️ _Enjoyable shoot _ loved the outcome ⚡️_Cinematography _ Edit _ _og__visuals 👽🁟5.webp",
    title: "Studio Magic",
    description: "Professional photography session"
  },
  {
    id: 10,
    image: "/Vitaprod/حين تنبض الشوارع بإيقاعات الحياة و الموسيقى 🎶_نستناوكم نهار 20 جانفي ضمن فعاليات أيام(.jpg",
    title: "Street Rhythms",
    description: "Live music event - January 20th"
  },
  {
    id: 11,
    image: "/Vitaprod/شارع الحبيب بورقيبة 🥹 شكرا على اللحظات التي لا تنسى ❤️❤️_مالها إلا البداية .. ولنا _1.jpg",
    title: "Habib Bourguiba Avenue",
    description: "Unforgettable moments"
  },
  {
    id: 12,
    image: "/Vitaprod/شارع الحبيب بورقيبة 🥹 شكرا على اللحظات التي لا تنسى ❤️❤️_مالها إلا البداية .. ولنا _2.jpg",
    title: "Street Performance",
    description: "Live music in the heart of the city"
  }
];

const ProjectGallery = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const handlePrevious = () => {
    setSelectedImage((current) => 
      current === 0 ? galleryImages.length - 1 : current! - 1
    );
  };

  const handleNext = () => {
    setSelectedImage((current) => 
      current === galleryImages.length - 1 ? 0 : current! + 1
    );
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (selectedImage === null) return;
    if (e.key === 'ArrowLeft') handlePrevious();
    if (e.key === 'ArrowRight') handleNext();
    if (e.key === 'Escape') setSelectedImage(null);
  };

  return (
    <section className="py-20 bg-gradient-to-b from-black to-rich-black">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">
            Notre Galerie
          </h2>
          <p className="text-xl text-white/80">
            Découvrez nos meilleures réalisations
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryImages.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card 
                className={cn(
                  "group overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer bg-black/50 border-gold-500/20"
                )}
                onClick={() => setSelectedImage(index)}
              >
                <CardContent className="p-0 relative aspect-video">
                  <div className="absolute inset-0 overflow-hidden">
                    <img
                      src={image.image}
                      alt={image.title}
                      className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="text-xl font-bold text-white">{image.title}</h3>
                      <p className="text-white/80 text-sm mt-2">{image.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      <Dialog 
        open={selectedImage !== null} 
        onOpenChange={() => setSelectedImage(null)}
      >
        <DialogContent className="max-w-7xl h-[90vh] p-0 bg-black/95 border-none">
          <DialogClose className="absolute right-4 top-4 z-50">
            <Button variant="ghost" size="icon" className="text-white hover:text-white/80">
              <X className="h-6 w-6" />
            </Button>
          </DialogClose>
          
          {selectedImage !== null && (
            <div className="relative w-full h-full flex items-center justify-center">
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-2 md:left-4 z-50 text-white hover:text-white/80"
                onClick={handlePrevious}
              >
                <ChevronLeft className="h-6 w-6 md:h-8 md:w-8" />
              </Button>

              <AnimatePresence mode="wait">
                <motion.div 
                  key={selectedImage}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                  className="w-full h-full flex items-center justify-center p-4 md:p-8"
                >
                  <img
                    src={galleryImages[selectedImage].image}
                    alt={galleryImages[selectedImage].title}
                    className="max-w-full max-h-full object-contain rounded-lg"
                  />
                </motion.div>
              </AnimatePresence>

              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 md:right-4 z-50 text-white hover:text-white/80"
                onClick={handleNext}
              >
                <ChevronRight className="h-6 w-6 md:h-8 md:w-8" />
              </Button>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent"
              >
                <h2 className="text-xl md:text-2xl font-bold text-white">
                  {galleryImages[selectedImage].title}
                </h2>
                <p className="text-white/80 mt-2">
                  {galleryImages[selectedImage].description}
                </p>
              </motion.div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default ProjectGallery;

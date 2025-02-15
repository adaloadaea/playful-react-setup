
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogClose } from "@/components/ui/dialog";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const galleryImages = [
  {
    id: 1,
    image: "/lovable-uploads/9a853f14-0545-4767-a679-4c7c63b4ced9.png",
    title: "Night Scene",
    description: "Car at night with moonlight",
  },
  {
    id: 2,
    image: "/lovable-uploads/78023499-6d65-43f6-a772-0af89f1560d8.png",
    title: "Tire Tracks",
    description: "Abstract patterns in the snow",
  },
  {
    id: 3,
    image: "/lovable-uploads/dc08feb2-4734-4aff-8271-c18479846e81.png",
    title: "Decorated Bag",
    description: "Detailed view of an ornate bag",
  },
  {
    id: 4,
    image: "/lovable-uploads/d341433f-23e3-4710-a839-6c2766252d32.png",
    title: "Night Cityscape",
    description: "Urban landscape under moonlight",
  },
  {
    id: 5,
    image: "/lovable-uploads/80a2d411-0719-4d72-9dc4-bff6ae972c1e.png",
    title: "FBK Event Poster",
    description: "Promotional event poster",
  },
  {
    id: 6,
    image: "/lovable-uploads/8b26fff8-c736-4979-911f-4b6a02118488.png",
    title: "Concert Scene",
    description: "Artist performing for crowd",
  },
  {
    id: 7,
    image: "/lovable-uploads/fa6372a7-2f86-4fa7-b793-6d737752962d.png",
    title: "Performance Shot",
    description: "Artist interaction with audience",
  },
  {
    id: 8,
    image: "/lovable-uploads/b9f10448-28ba-4e6d-8df5-b48743a40ab0.png",
    title: "Stage View",
    description: "Artist from behind facing crowd",
  },
  {
    id: 9,
    image: "/lovable-uploads/db7c9dbc-d17f-4563-bd8d-e2418197f9dc.png",
    title: "Concert Performance",
    description: "Full stage and equipment setup",
  },
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

  return (
    <section className="pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryImages.map((image, index) => (
            <Card 
              key={image.id}
              className={cn(
                "group overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer"
              )}
              onClick={() => setSelectedImage(index)}
            >
              <CardContent className="p-0 relative">
                <div className="overflow-hidden">
                  <img
                    src={image.image}
                    alt={image.title}
                    className="w-full h-64 object-cover transform transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-xl font-bold text-white">{image.title}</h3>
                  <p className="text-white/80 text-sm mt-2">{image.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Dialog 
        open={selectedImage !== null} 
        onOpenChange={() => setSelectedImage(null)}
      >
        <DialogContent className="max-w-4xl h-[80vh] p-0 bg-black/95">
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
                className="absolute left-4 z-50 text-white hover:text-white/80"
                onClick={handlePrevious}
              >
                <ChevronLeft className="h-8 w-8" />
              </Button>

              <div className="w-full h-full flex items-center justify-center p-8">
                <img
                  src={galleryImages[selectedImage].image}
                  alt={galleryImages[selectedImage].title}
                  className="max-w-full max-h-full object-contain animate-fade-in"
                />
              </div>

              <Button
                variant="ghost"
                size="icon"
                className="absolute right-4 z-50 text-white hover:text-white/80"
                onClick={handleNext}
              >
                <ChevronRight className="h-8 w-8" />
              </Button>

              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
                <h2 className="text-xl font-bold text-white">
                  {galleryImages[selectedImage].title}
                </h2>
                <p className="text-white/80 mt-2">
                  {galleryImages[selectedImage].description}
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default ProjectGallery;

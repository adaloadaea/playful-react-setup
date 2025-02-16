import React from 'react';
import { motion } from 'framer-motion';
import { Project } from '../types';
import { Button } from './ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Github } from 'lucide-react';
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog';

interface ProjectGalleryProps {
  projects: Project[];
}

const ProjectGallery: React.FC<ProjectGalleryProps> = ({ projects }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
};

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <Card className="bg-[#221F26]/90 backdrop-blur-xl border border-white/10">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-off-white">{project.title}</CardTitle>
        <CardDescription className="text-off-white/80">{project.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <AspectRatio ratio={16 / 9}>
          <img
            src={project.imageUrl}
            alt={project.title}
            className="object-cover rounded-md"
          />
        </AspectRatio>
        <div className="mt-4 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <Dialog>
          <DialogTrigger asChild>
            <Button>Learn More</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] bg-[#221F26] text-off-white border border-white/10">
            <div className="flex flex-col space-y-4">
              <h3 className="text-lg font-semibold">{project.title}</h3>
              <p className="text-sm text-off-white/60">{project.longDescription}</p>
              {project.githubUrl && (
                <Button variant="link" asChild>
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2">
                    <Github className="h-4 w-4" />
                    <span>GitHub</span>
                  </a>
                </Button>
              )}
            </div>
          </DialogContent>
        </Dialog>
        {project.websiteUrl && (
          <Button variant="outline" asChild>
            <a href={project.websiteUrl} target="_blank" rel="noopener noreferrer">
              Visit Website
            </a>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default ProjectGallery;

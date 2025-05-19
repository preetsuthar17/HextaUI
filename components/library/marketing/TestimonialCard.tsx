"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";

export interface TestimonialCardProps {
  name: string;
  role: string;
  company?: string;
  testimonial: string;
  rating?: number;
  image?: string;
  className?: string;
}

export const TestimonialCard: React.FC<TestimonialCardProps> = ({
  name,
  role,
  company,
  testimonial,
  rating = 5,
  image = "",
  className = "",
}) => {
  return (
    <div
      className={`relative overflow-hidden rounded-4xl bg-background border border-primary/10 shadow-2xl/10 p-6 md:p-8 ${className}`}
    >
      {/* Quote Icon */}
      <div className="absolute right-6 top-6 text-6xl font-serif text-muted-foreground/20">
        "
      </div>

      {/* Content Container */}
      <div className="flex flex-col gap-4 justify-between h-full">
        {/* Rating Stars */}
        {rating > 0 && (
          <div className="flex gap-1">
            {Array.from({ length: 5 }).map((_, index) => (
              <Star
                key={index}
                size={16}
                className={`${
                  index < rating
                    ? "fill-yellow-400 text-yellow-400"
                    : "fill-muted text-muted"
                }`}
              />
            ))}
          </div>
        )}

        {/* Testimonial Text */}
        <p className="text-pretty text-base text-muted-foreground">
          {testimonial}
        </p>

        {/* Author Info */}
        <div className="flex items-center gap-4">
          {image && (
            <div className="relative h-12 w-12 overflow-hidden rounded-full flex items-center justify-center">
              <Avatar>
                <AvatarImage src={image} alt={name} width={48} height={48} />
                <AvatarFallback>{name[0]}</AvatarFallback>
              </Avatar>
            </div>
          )}
          <div className="flex flex-col">
            <h3 className="font-semibold text-foreground">{name}</h3>
            <p className="text-sm text-muted-foreground">
              {role}
              {company && ` @ ${company}`}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

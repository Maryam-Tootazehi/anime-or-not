import React, { useState, useRef } from 'react';
import { Upload, Image as ImageIcon, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ImageUploadProps {
  onImageSelect: (file: File) => void;
  isProcessing?: boolean;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({ onImageSelect, isProcessing }) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0 && files[0].type.startsWith('image/')) {
      onImageSelect(files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      onImageSelect(files[0]);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div
      className={cn(
        "relative border-2 border-dashed rounded-lg p-8 text-center transition-all duration-300 cursor-pointer group",
        "hover:border-primary/50 hover:bg-muted/20",
        isDragOver ? "border-primary bg-primary/5 scale-105" : "border-border",
        isProcessing && "pointer-events-none opacity-50"
      )}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={handleClick}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />
      
      <div className="flex flex-col items-center space-y-4">
        <div className="relative">
          <div className="w-16 h-16 rounded-full bg-gradient-primary flex items-center justify-center animate-float">
            {isProcessing ? (
              <Sparkles className="w-8 h-8 text-white animate-pulse-slow" />
            ) : (
              <Upload className="w-8 h-8 text-white" />
            )}
          </div>
          <div className="absolute -inset-2 bg-gradient-primary rounded-full opacity-20 animate-pulse-slow"></div>
        </div>
        
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">
            {isProcessing ? 'Processing...' : 'Upload an Image'}
          </h3>
          <p className="text-sm text-muted-foreground max-w-sm">
            {isProcessing 
              ? 'AI is analyzing your image to detect if it\'s anime or cartoon'
              : 'Drag and drop an image here, or click to browse. Supports JPG, PNG, and WebP formats.'
            }
          </p>
        </div>
        
        {!isProcessing && (
          <Button variant="outline" size="sm" className="mt-4">
            <ImageIcon className="w-4 h-4 mr-2" />
            Choose File
          </Button>
        )}
      </div>
    </div>
  );
};
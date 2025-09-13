import React from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ImagePreviewProps {
  file: File;
  onRemove: () => void;
}

export const ImagePreview: React.FC<ImagePreviewProps> = ({ file, onRemove }) => {
  const imageUrl = React.useMemo(() => URL.createObjectURL(file), [file]);

  React.useEffect(() => {
    return () => URL.revokeObjectURL(imageUrl);
  }, [imageUrl]);

  return (
    <div className="relative group">
      <div className="relative overflow-hidden rounded-lg border border-border bg-card">
        <img
          src={imageUrl}
          alt="Preview"
          className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        <Button
          variant="outline"
          size="sm"
          onClick={onRemove}
          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-destructive/80 hover:bg-destructive border-destructive text-destructive-foreground"
        >
          <X className="w-4 h-4" />
        </Button>
      </div>
      
      <div className="mt-2 text-sm text-muted-foreground">
        <p className="font-medium">{file.name}</p>
        <p>{(file.size / 1024 / 1024).toFixed(2)} MB</p>
      </div>
    </div>
  );
};
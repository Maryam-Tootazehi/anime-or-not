import React, { useState } from 'react';
import { Brain, Zap } from 'lucide-react';
import { ImageUpload } from '@/components/ImageUpload';
import { ImagePreview } from '@/components/ImagePreview';
import { ClassificationResult } from '@/components/ClassificationResult';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

type ClassificationState = 'idle' | 'processing' | 'completed';

interface ClassificationResults {
  prediction: 'anime' | 'cartoon';
  confidence: number;
  scores?: {
    anime: number;
    cartoon: number;
  };
}

const Index = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [state, setState] = useState<ClassificationState>('idle');
  const [results, setResults] = useState<ClassificationResults | null>(null);
  const { toast } = useToast();

  const handleImageSelect = (file: File) => {
    setSelectedFile(file);
    setResults(null);
    setState('idle');
  };

  const handleRemoveImage = () => {
    setSelectedFile(null);
    setResults(null);
    setState('idle');
  };

  const processImage = async () => {
    if (!selectedFile) return;

    setState('processing');
    
    try {
      // TODO: Replace this with your actual ML processing code
      // Simulate processing delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock result - replace with your actual ML model output
      const mockResult: ClassificationResults = {
        prediction: Math.random() > 0.5 ? 'anime' : 'cartoon',
        confidence: 0.85 + Math.random() * 0.14, // 85-99%
        scores: {
          anime: Math.random(),
          cartoon: Math.random(),
        }
      };
      
      setResults(mockResult);
      setState('completed');
      
      toast({
        title: "Classification Complete!",
        description: `Image detected as ${mockResult.prediction} with ${Math.round(mockResult.confidence * 100)}% confidence.`,
      });
      
    } catch (error) {
      console.error('Processing error:', error);
      setState('idle');
      
      toast({
        title: "Processing Failed",
        description: "There was an error processing your image. Please try again.",
        variant: "destructive",
      });
    }
  };

  const resetAll = () => {
    setSelectedFile(null);
    setResults(null);
    setState('idle');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-center space-x-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div className="text-center">
              <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                AI Image Classifier
              </h1>
              <p className="text-sm text-muted-foreground">
                Anime vs Cartoon Detection
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          
          {/* Upload Section */}
          <div className="space-y-6">
            {!selectedFile ? (
              <ImageUpload 
                onImageSelect={handleImageSelect}
                isProcessing={state === 'processing'}
              />
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Image Preview */}
                <div className="space-y-4">
                  <h2 className="text-lg font-semibold">Selected Image</h2>
                  <ImagePreview 
                    file={selectedFile} 
                    onRemove={handleRemoveImage}
                  />
                </div>

                {/* Results or Process Button */}
                <div className="space-y-4">
                  {results ? (
                    <>
                      <h2 className="text-lg font-semibold">Results</h2>
                      <ClassificationResult result={results} />
                    </>
                  ) : (
                    <div className="flex flex-col justify-center h-full space-y-4">
                      <h2 className="text-lg font-semibold text-center">Ready to Analyze</h2>
                      <div className="text-center space-y-4">
                        <p className="text-muted-foreground">
                          Click the button below to start the AI classification process.
                        </p>
                        <Button 
                          onClick={processImage}
                          disabled={state === 'processing'}
                          size="lg"
                          className="bg-gradient-primary hover:opacity-90 text-white font-semibold px-8"
                        >
                          <Zap className="w-5 h-5 mr-2" />
                          {state === 'processing' ? 'Processing...' : 'Analyze Image'}
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          {selectedFile && results && (
            <div className="flex justify-center space-x-4">
              <Button variant="outline" onClick={resetAll}>
                Analyze Another Image
              </Button>
            </div>
          )}

          {/* Info Section */}
          <div className="text-center space-y-4 py-8 border-t border-border/50">
            <h3 className="text-lg font-semibold">How it works</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
              <div className="space-y-2">
                <div className="w-8 h-8 mx-auto rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                  1
                </div>
                <p className="text-sm text-muted-foreground">Upload your image</p>
              </div>
              <div className="space-y-2">
                <div className="w-8 h-8 mx-auto rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                  2
                </div>
                <p className="text-sm text-muted-foreground">AI analyzes the content</p>
              </div>
              <div className="space-y-2">
                <div className="w-8 h-8 mx-auto rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                  3
                </div>
                <p className="text-sm text-muted-foreground">Get instant results</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;

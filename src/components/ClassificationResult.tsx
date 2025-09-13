import React from 'react';
import { Sparkles, Target, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

interface ClassificationResultProps {
  result: {
    prediction: 'anime' | 'cartoon';
    confidence: number;
    scores?: {
      anime: number;
      cartoon: number;
    };
  };
}

export const ClassificationResult: React.FC<ClassificationResultProps> = ({ result }) => {
  const { prediction, confidence, scores } = result;
  
  const isAnime = prediction === 'anime';
  const confidencePercentage = Math.round(confidence * 100);
  
  return (
    <Card className="w-full bg-gradient-card border-border/50">
      <CardHeader className="text-center pb-4">
        <div className="flex items-center justify-center mb-2">
          <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center animate-float">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
        </div>
        <CardTitle className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          Classification Result
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Main Result */}
        <div className="text-center space-y-3">
          <div className="flex items-center justify-center space-x-2">
            <Target className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium text-muted-foreground">Detected Type:</span>
          </div>
          
          <div className="space-y-2">
            <Badge 
              variant={isAnime ? "default" : "secondary"}
              className={`px-4 py-2 text-lg font-bold ${
                isAnime 
                  ? 'bg-gradient-primary text-white' 
                  : 'bg-accent text-accent-foreground'
              }`}
            >
              {prediction.toUpperCase()}
            </Badge>
            
            <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
              <TrendingUp className="w-4 h-4" />
              <span>Confidence: {confidencePercentage}%</span>
            </div>
          </div>
        </div>

        {/* Confidence Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Confidence Level</span>
            <span className="font-medium">{confidencePercentage}%</span>
          </div>
          <Progress 
            value={confidencePercentage} 
            className="h-2 bg-muted"
          />
        </div>

        {/* Detailed Scores */}
        {scores && (
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-center text-muted-foreground">
              Detailed Scores
            </h4>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                <span className="font-medium">Anime</span>
                <div className="flex items-center space-x-2">
                  <Progress 
                    value={scores.anime * 100} 
                    className="w-20 h-2"
                  />
                  <span className="text-sm font-medium w-12 text-right">
                    {Math.round(scores.anime * 100)}%
                  </span>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                <span className="font-medium">Cartoon</span>
                <div className="flex items-center space-x-2">
                  <Progress 
                    value={scores.cartoon * 100} 
                    className="w-20 h-2"
                  />
                  <span className="text-sm font-medium w-12 text-right">
                    {Math.round(scores.cartoon * 100)}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
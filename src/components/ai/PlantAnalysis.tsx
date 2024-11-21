import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Camera, Upload, X, AlertCircle, CheckCircle } from 'lucide-react';
import { aiService } from '../../services/aiService';

interface AnalysisResult {
  health: number;
  issues: string[];
  recommendations: string[];
}

const PlantAnalysis = () => {
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
        analyzeImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeImage = async (imageUrl: string) => {
    setLoading(true);
    try {
      const analysis = await aiService.analyzePlantHealth(imageUrl);
      setResult(analysis);
    } catch (error) {
      console.error('Error analyzing image:', error);
    } finally {
      setLoading(false);
    }
  };

  const resetAnalysis = () => {
    setImage(null);
    setResult(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="p-6 bg-primary text-white">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Camera className="h-6 w-6" />
          Plant Health Analysis
        </h2>
        <p className="text-white/80">Upload a photo to check your plant's health</p>
      </div>

      <div className="p-6">
        {!image ? (
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-8">
            <div className="text-center">
              <Camera className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                Upload Plant Photo
              </h3>
              <p className="text-gray-500 mb-4">
                Take a clear photo of the plant you want to analyze
              </p>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="btn bg-primary hover:bg-primary-dark text-white"
              >
                <Upload className="h-5 w-5 mr-2" />
                Choose Photo
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="relative">
              <img
                src={image}
                alt="Uploaded plant"
                className="w-full h-64 object-cover rounded-xl"
              />
              <button
                onClick={resetAnalysis}
                className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-lg"
              >
                <X className="h-5 w-5 text-gray-600" />
              </button>
            </div>

            {loading ? (
              <div className="text-center p-4">
                <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
                <p className="text-gray-600">Analyzing your plant...</p>
              </div>
            ) : result && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="flex items-center gap-4">
                  <div className="flex-1 bg-gray-100 rounded-full h-4">
                    <div
                      className="bg-green-500 h-full rounded-full transition-all duration-1000"
                      style={{ width: `${result.health * 100}%` }}
                    ></div>
                  </div>
                  <span className="font-semibold text-lg">
                    {Math.round(result.health * 100)}% Health
                  </span>
                </div>

                {result.issues.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-red-500 mb-2 flex items-center gap-2">
                      <AlertCircle className="h-5 w-5" />
                      Detected Issues
                    </h3>
                    <ul className="space-y-2">
                      {result.issues.map((issue, index) => (
                        <li
                          key={index}
                          className="flex items-start gap-2 text-gray-600"
                        >
                          <span className="text-red-500">•</span>
                          {issue}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div>
                  <h3 className="font-semibold text-green-500 mb-2 flex items-center gap-2">
                    <CheckCircle className="h-5 w-5" />
                    Recommendations
                  </h3>
                  <ul className="space-y-2">
                    {result.recommendations.map((rec, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-2 text-gray-600"
                      >
                        <span className="text-green-500">•</span>
                        {rec}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PlantAnalysis;
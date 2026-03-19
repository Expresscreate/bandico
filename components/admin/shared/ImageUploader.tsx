import React, { useCallback, useState } from 'react';
import { Upload, X, Image as ImageIcon, Loader2 } from 'lucide-react';
import { uploadImage } from '../../../lib/api';

interface ImageUploaderProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ value, onChange, label = 'Image' }) => {
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  const handleFile = useCallback(async (file: File) => {
    if (!file.type.startsWith('image/')) return;
    setUploading(true);
    try {
      const result = await uploadImage(file);
      onChange(result.url);
    } catch (err) {
      console.error('Upload failed:', err);
    } finally {
      setUploading(false);
    }
  }, [onChange]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }, [handleFile]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  return (
    <div>
      <label className="block text-sm font-bold text-gray-700 mb-2">{label}</label>
      
      {value ? (
        <div className="relative rounded-xl overflow-hidden border border-gray-200 group">
          <img src={value} alt="" className="w-full h-48 object-cover" />
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
            <label className="cursor-pointer bg-white text-gray-900 px-4 py-2 rounded-lg text-sm font-bold hover:bg-gray-100 flex items-center gap-2">
              <Upload className="w-4 h-4" /> Changer
              <input type="file" accept="image/*" onChange={handleInputChange} className="hidden" />
            </label>
            <button onClick={() => onChange('')} className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        <div
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-xl p-8 text-center transition-all ${
            dragOver ? 'border-[#c8a849] bg-[#c8a849]/5' : 'border-gray-200 hover:border-gray-300'
          }`}
        >
          {uploading ? (
            <Loader2 className="w-8 h-8 animate-spin text-gray-400 mx-auto" />
          ) : (
            <>
              <ImageIcon className="w-10 h-10 text-gray-300 mx-auto mb-3" />
              <p className="text-sm text-gray-500 mb-2">Glissez une image ici ou</p>
              <label className="cursor-pointer inline-block bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-semibold transition-colors">
                Parcourir
                <input type="file" accept="image/*" onChange={handleInputChange} className="hidden" />
              </label>
            </>
          )}
        </div>
      )}

      {/* Manual URL input */}
      <div className="mt-2">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Ou collez l'URL de l'image..."
          className="w-full text-xs px-3 py-2 border border-gray-100 rounded-lg bg-gray-50 focus:ring-1 focus:ring-[#2f6c44] outline-none text-gray-500"
        />
      </div>
    </div>
  );
};

export default ImageUploader;

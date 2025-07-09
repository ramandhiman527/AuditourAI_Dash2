import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Upload, 
  FileText, 
  File, 
  X, 
  CheckCircle, 
  AlertCircle, 
  Brain,
  Clock,
  Zap,
  Eye,
  Sparkles
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { mockAIClassifications } from '../data/documentMockData';

const AIUploadZone = ({ 
  onUpload, 
  aiClassification = true,
  supportedTypes = ['pdf', 'docx', 'xlsx', 'csv'],
  maxSize = '50MB',
  maxFiles = 10
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [files, setFiles] = useState([]);
  const [uploadProgress, setUploadProgress] = useState({});
  const [aiAnalysis, setAIAnalysis] = useState({});
  const [errors, setErrors] = useState([]);
  const fileInputRef = useRef(null);

  const getFileIcon = (type) => {
    switch (type) {
      case 'pdf': return <FileText className="w-5 h-5 text-red-500" />;
      case 'docx':
      case 'doc': return <File className="w-5 h-5 text-blue-500" />;
      case 'xlsx':
      case 'xls': return <File className="w-5 h-5 text-green-500" />;
      case 'csv': return <File className="w-5 h-5 text-orange-500" />;
      default: return <File className="w-5 h-5 text-gray-500" />;
    }
  };

  const validateFile = (file) => {
    const extension = file.name.split('.').pop().toLowerCase();
    const maxSizeBytes = parseInt(maxSize) * 1024 * 1024;
    const errors = [];

    if (!supportedTypes.includes(extension)) {
      errors.push(`File type .${extension} is not supported`);
    }

    if (file.size > maxSizeBytes) {
      errors.push(`File size exceeds ${maxSize} limit`);
    }

    return errors;
  };

  const simulateAIClassification = (fileName) => {
    const fileType = fileName.toLowerCase();
    
    // Simple AI classification simulation
    if (fileType.includes('invoice')) return mockAIClassifications.invoice;
    if (fileType.includes('contract')) return mockAIClassifications.contract;
    if (fileType.includes('financial') || fileType.includes('statement')) return mockAIClassifications['financial-statement'];
    if (fileType.includes('expense')) return mockAIClassifications['expense-report'];
    if (fileType.includes('bank')) return mockAIClassifications['bank-statement'];
    if (fileType.includes('tax')) return mockAIClassifications['tax-document'];
    if (fileType.includes('audit')) return mockAIClassifications['audit-report'];
    
    // Default classification
    return { confidence: 85, category: 'Document', subcategory: 'General' };
  };

  const handleFiles = (fileList) => {
    const newFiles = Array.from(fileList);
    const validFiles = [];
    const fileErrors = [];

    if (files.length + newFiles.length > maxFiles) {
      fileErrors.push(`Maximum ${maxFiles} files allowed`);
      setErrors(fileErrors);
      return;
    }

    newFiles.forEach(file => {
      const validation = validateFile(file);
      if (validation.length === 0) {
        const fileObj = {
          id: Date.now() + Math.random(),
          file,
          name: file.name,
          size: file.size,
          type: file.name.split('.').pop().toLowerCase(),
          status: 'uploading',
          progress: 0
        };
        validFiles.push(fileObj);
      } else {
        fileErrors.push(`${file.name}: ${validation.join(', ')}`);
      }
    });

    setFiles(prev => [...prev, ...validFiles]);
    setErrors(fileErrors);

    if (validFiles.length > 0) {
      simulateUpload(validFiles);
    }
  };

  const simulateUpload = (filesToUpload) => {
    filesToUpload.forEach(fileObj => {
      // Simulate upload progress
      const uploadInterval = setInterval(() => {
        setUploadProgress(prev => {
          const currentProgress = prev[fileObj.id] || 0;
          const newProgress = Math.min(currentProgress + Math.random() * 25, 100);
          
          if (newProgress >= 100) {
            clearInterval(uploadInterval);
            
            // Update file status
            setFiles(prev => prev.map(f => 
              f.id === fileObj.id 
                ? { ...f, status: 'uploaded', progress: 100 }
                : f
            ));
            
            // Start AI classification
            if (aiClassification) {
              setTimeout(() => startAIClassification(fileObj.id), 500);
            }
          }
          
          return { ...prev, [fileObj.id]: newProgress };
        });
      }, 200);
    });

    // Call onUpload callback
    if (onUpload) {
      onUpload(filesToUpload.map(f => f.file));
    }
  };

  const startAIClassification = (fileId) => {
    const file = files.find(f => f.id === fileId);
    if (!file) return;

    setFiles(prev => prev.map(f => 
      f.id === fileId 
        ? { ...f, status: 'classifying' }
        : f
    ));

    // Simulate AI classification delay
    setTimeout(() => {
      const classification = simulateAIClassification(file.name);
      
      setAIAnalysis(prev => ({
        ...prev,
        [fileId]: {
          ...classification,
          extractedData: {
            estimatedAmount: Math.random() > 0.7 ? `$${(Math.random() * 50000).toFixed(2)}` : null,
            detectedDate: Math.random() > 0.5 ? new Date().toISOString().split('T')[0] : null,
            vendor: Math.random() > 0.6 ? ['ABC Corp', 'TechSupply Co.', 'ServicePro Inc.'][Math.floor(Math.random() * 3)] : null
          },
          riskLevel: ['low', 'medium', 'high'][Math.floor(Math.random() * 3)],
          suggestions: [
            'Review for compliance',
            'Verify extracted data',
            'Add to audit trail'
          ]
        }
      }));

      setFiles(prev => prev.map(f => 
        f.id === fileId 
          ? { ...f, status: 'classified' }
          : f
      ));
    }, 1500 + Math.random() * 2000);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const droppedFiles = e.dataTransfer.files;
    if (droppedFiles && droppedFiles.length > 0) {
      handleFiles(droppedFiles);
    }
  };

  const handleFileSelect = (e) => {
    const selectedFiles = e.target.files;
    if (selectedFiles && selectedFiles.length > 0) {
      handleFiles(selectedFiles);
    }
  };

  const removeFile = (fileId) => {
    setFiles(prev => prev.filter(f => f.id !== fileId));
    setUploadProgress(prev => {
      const newProgress = { ...prev };
      delete newProgress[fileId];
      return newProgress;
    });
    setAIAnalysis(prev => {
      const newAnalysis = { ...prev };
      delete newAnalysis[fileId];
      return newAnalysis;
    });
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getRiskColor = (level) => {
    switch (level) {
      case 'low': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'high': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Upload className="w-5 h-5" />
          <span>AI-Powered Document Upload</span>
          {aiClassification && (
            <Badge variant="secondary" className="bg-purple-100 text-purple-700">
              <Brain className="w-3 h-3 mr-1" />
              Smart Classification
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Upload Zone */}
        <motion.div
          className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${
            dragActive
              ? 'border-indigo-500 bg-indigo-50 scale-105'
              : 'border-gray-300 hover:border-gray-400'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          whileHover={{ scale: dragActive ? 1 : 1.02 }}
        >
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept={supportedTypes.map(type => `.${type}`).join(',')}
            onChange={handleFileSelect}
            className="hidden"
          />
          
          <motion.div 
            className="space-y-4"
            animate={{ scale: dragActive ? 1.1 : 1 }}
          >
            <div className={`mx-auto w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 ${
              dragActive ? 'bg-indigo-200' : 'bg-gray-100'
            }`}>
              <Upload className={`w-8 h-8 transition-all duration-300 ${
                dragActive ? 'text-indigo-600' : 'text-gray-400'
              }`} />
            </div>
            
            <div>
              <p className="text-lg font-medium text-gray-900 mb-2">
                {dragActive ? 'Drop files here' : 'Drag & drop documents here'}
              </p>
              <p className="text-sm text-gray-600 mb-4">
                AI will instantly classify and analyze your documents
              </p>
              
              <Button 
                variant="outline" 
                onClick={() => fileInputRef.current?.click()}
                className="hover:bg-indigo-50 hover:border-indigo-300"
              >
                <Eye className="w-4 h-4 mr-2" />
                Browse Files
              </Button>
            </div>
            
            <div className="text-xs text-gray-500 space-y-1">
              <p>Supported: {supportedTypes.join(', ').toUpperCase()}</p>
              <p>Max size: {maxSize} per file • Max files: {maxFiles}</p>
              {aiClassification && (
                <p className="flex items-center justify-center space-x-1 text-purple-600">
                  <Sparkles className="w-3 h-3" />
                  <span>AI-powered classification and risk assessment</span>
                </p>
              )}
            </div>
          </motion.div>
        </motion.div>

        {/* Error Messages */}
        <AnimatePresence>
          {errors.length > 0 && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-red-50 border border-red-200 rounded-lg p-3"
            >
              <div className="flex items-center space-x-2 mb-2">
                <AlertCircle className="w-4 h-4 text-red-500" />
                <span className="text-sm font-medium text-red-700">Upload Errors</span>
              </div>
              <ul className="text-sm text-red-600 space-y-1">
                {errors.map((error, index) => (
                  <li key={index}>• {error}</li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>

        {/* File List */}
        <AnimatePresence>
          {files.length > 0 && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-3"
            >
              <h4 className="text-sm font-medium text-gray-700">
                Processing Files ({files.length}/{maxFiles})
              </h4>
              
              {files.map((file, index) => (
                <motion.div
                  key={file.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white border rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3 flex-1">
                      {getFileIcon(file.type)}
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">{file.name}</p>
                        <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                        
                        {/* Upload Progress */}
                        {file.status === 'uploading' && (
                          <div className="mt-2">
                            <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                              <span>Uploading...</span>
                              <span>{Math.round(uploadProgress[file.id] || 0)}%</span>
                            </div>
                            <Progress value={uploadProgress[file.id] || 0} className="h-2" />
                          </div>
                        )}
                        
                        {/* AI Classification */}
                        {file.status === 'classifying' && (
                          <div className="mt-2 flex items-center space-x-2 text-xs text-purple-600">
                            <Brain className="w-3 h-3 animate-pulse" />
                            <span>AI analyzing document...</span>
                          </div>
                        )}
                        
                        {/* AI Results */}
                        {file.status === 'classified' && aiAnalysis[file.id] && (
                          <div className="mt-3 space-y-2">
                            <div className="flex items-center space-x-2">
                              <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                                {aiAnalysis[file.id].category}
                              </Badge>
                              <Badge variant="secondary" className={getRiskColor(aiAnalysis[file.id].riskLevel)}>
                                {aiAnalysis[file.id].riskLevel} risk
                              </Badge>
                              <span className="text-xs text-gray-500">
                                {aiAnalysis[file.id].confidence}% confidence
                              </span>
                            </div>
                            
                            {aiAnalysis[file.id].extractedData && (
                              <div className="bg-gray-50 rounded p-2 text-xs">
                                <span className="font-medium text-gray-700">Extracted:</span>
                                {Object.entries(aiAnalysis[file.id].extractedData)
                                  .filter(([key, value]) => value)
                                  .map(([key, value]) => (
                                    <div key={key} className="text-gray-600">
                                      {key}: {value}
                                    </div>
                                  ))}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFile(file.id)}
                      className="text-gray-400 hover:text-red-500"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
};

export default AIUploadZone;
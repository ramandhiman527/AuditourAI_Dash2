import React, { useState, useRef } from 'react';
import { 
  Upload, 
  FileText, 
  File, 
  X, 
  CheckCircle, 
  AlertCircle, 
  Brain,
  Clock,
  RefreshCw
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';

const DocumentUploadZone = ({ 
  onUpload, 
  processing = false, 
  maxFiles = 5,
  maxFileSize = 10 * 1024 * 1024, // 10MB
  acceptedTypes = ['pdf', 'docx', 'xlsx', 'doc', 'xls'],
  aiAnalysisEnabled = true
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [files, setFiles] = useState([]);
  const [uploadProgress, setUploadProgress] = useState({});
  const [errors, setErrors] = useState([]);
  const fileInputRef = useRef(null);

  const validateFile = (file) => {
    const extension = file.name.split('.').pop().toLowerCase();
    const errors = [];

    if (!acceptedTypes.includes(extension)) {
      errors.push(`File type .${extension} is not supported`);
    }

    if (file.size > maxFileSize) {
      errors.push(`File size exceeds ${maxFileSize / (1024 * 1024)}MB limit`);
    }

    return errors;
  };

  const handleFiles = (fileList) => {
    const newFiles = Array.from(fileList);
    const validFiles = [];
    const fileErrors = [];

    if (files.length + newFiles.length > maxFiles) {
      fileErrors.push(`Maximum ${maxFiles} files allowed`);
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
          status: 'pending',
          aiStatus: 'queued',
          progress: 0,
          aiInsights: null
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
      const interval = setInterval(() => {
        setUploadProgress(prev => {
          const currentProgress = prev[fileObj.id] || 0;
          const newProgress = Math.min(currentProgress + Math.random() * 20, 100);
          
          if (newProgress >= 100) {
            clearInterval(interval);
            
            // Update file status
            setFiles(prev => prev.map(f => 
              f.id === fileObj.id 
                ? { ...f, status: 'uploaded', progress: 100 }
                : f
            ));
            
            // Start AI analysis simulation
            if (aiAnalysisEnabled) {
              setTimeout(() => simulateAIAnalysis(fileObj.id), 500);
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

  const simulateAIAnalysis = (fileId) => {
    setFiles(prev => prev.map(f => 
      f.id === fileId 
        ? { ...f, aiStatus: 'analyzing' }
        : f
    ));

    // Simulate AI analysis completion
    setTimeout(() => {
      const mockInsights = [
        { score: 95, summary: 'Comprehensive financial audit with minor compliance notes' },
        { score: 88, summary: 'Risk matrix shows moderate exposure levels' },
        { score: 92, summary: 'Compliance report indicates good adherence to regulations' },
        { score: 85, summary: 'Internal controls review shows areas for improvement' }
      ];
      
      const insight = mockInsights[Math.floor(Math.random() * mockInsights.length)];
      
      setFiles(prev => prev.map(f => 
        f.id === fileId 
          ? { 
              ...f, 
              aiStatus: 'completed', 
              aiInsights: insight 
            }
          : f
      ));
    }, 2000 + Math.random() * 3000);
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
  };

  const getFileIcon = (type) => {
    switch (type) {
      case 'pdf': return <FileText className="w-5 h-5 text-red-500" />;
      case 'docx':
      case 'doc': return <File className="w-5 h-5 text-blue-500" />;
      case 'xlsx':
      case 'xls': return <File className="w-5 h-5 text-green-500" />;
      default: return <File className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusIcon = (status, aiStatus) => {
    if (status === 'uploaded') {
      switch (aiStatus) {
        case 'completed': return <CheckCircle className="w-4 h-4 text-green-500" />;
        case 'analyzing': return <Brain className="w-4 h-4 text-purple-500 animate-pulse" />;
        case 'queued': return <Clock className="w-4 h-4 text-yellow-500" />;
        default: return <CheckCircle className="w-4 h-4 text-green-500" />;
      }
    }
    return <RefreshCw className="w-4 h-4 text-blue-500 animate-spin" />;
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Upload className="w-5 h-5" />
          <span>Upload Documents</span>
          {aiAnalysisEnabled && (
            <Badge variant="secondary" className="bg-indigo-100 text-indigo-700">
              <Brain className="w-3 h-3 mr-1" />
              AI Analysis
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Upload Zone */}
        <div
          className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${
            dragActive
              ? 'border-indigo-500 bg-indigo-50 scale-105'
              : 'border-gray-300 hover:border-gray-400'
          } ${processing ? 'opacity-50 pointer-events-none' : ''}`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept={acceptedTypes.map(type => `.${type}`).join(',')}
            onChange={handleFileSelect}
            className="hidden"
          />
          
          <div className="space-y-4">
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
                or click to select files
              </p>
              
              <Button 
                variant="outline" 
                onClick={() => fileInputRef.current?.click()}
                disabled={processing}
                className="hover:bg-indigo-50 hover:border-indigo-300"
              >
                Browse Files
              </Button>
            </div>
            
            <div className="text-xs text-gray-500 space-y-1">
              <p>Supported: {acceptedTypes.join(', ').toUpperCase()}</p>
              <p>Max size: {maxFileSize / (1024 * 1024)}MB per file</p>
              <p>Max files: {maxFiles}</p>
            </div>
          </div>
        </div>

        {/* Error Messages */}
        {errors.length > 0 && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
            <div className="flex items-center space-x-2 mb-2">
              <AlertCircle className="w-4 h-4 text-red-500" />
              <span className="text-sm font-medium text-red-700">Upload Errors</span>
            </div>
            <ul className="text-sm text-red-600 space-y-1">
              {errors.map((error, index) => (
                <li key={index}>• {error}</li>
              ))}
            </ul>
          </div>
        )}

        {/* File List */}
        {files.length > 0 && (
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-gray-700">
              Uploaded Files ({files.length}/{maxFiles})
            </h4>
            
            {files.map((file) => (
              <div key={file.id} className="bg-white border rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {getFileIcon(file.type)}
                    <div>
                      <p className="text-sm font-medium text-gray-900">{file.name}</p>
                      <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(file.status, file.aiStatus)}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFile(file.id)}
                      className="p-1 h-6 w-6 text-gray-400 hover:text-red-500"
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
                
                {/* Upload Progress */}
                {file.status === 'pending' && (
                  <div className="mt-3">
                    <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                      <span>Uploading...</span>
                      <span>{Math.round(uploadProgress[file.id] || 0)}%</span>
                    </div>
                    <Progress value={uploadProgress[file.id] || 0} className="h-2" />
                  </div>
                )}
                
                {/* AI Analysis Status */}
                {file.status === 'uploaded' && aiAnalysisEnabled && (
                  <div className="mt-3 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-600">AI Analysis</span>
                      <Badge 
                        variant="secondary" 
                        className={`text-xs ${
                          file.aiStatus === 'completed' 
                            ? 'bg-green-100 text-green-700' 
                            : file.aiStatus === 'analyzing'
                            ? 'bg-purple-100 text-purple-700'
                            : 'bg-yellow-100 text-yellow-700'
                        }`}
                      >
                        {file.aiStatus}
                      </Badge>
                    </div>
                    
                    {file.aiInsights && (
                      <div className="bg-gray-50 rounded-lg p-2">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-medium text-gray-700">AI Score</span>
                          <span className="text-xs font-bold text-indigo-600">{file.aiInsights.score}%</span>
                        </div>
                        <p className="text-xs text-gray-600">{file.aiInsights.summary}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DocumentUploadZone;
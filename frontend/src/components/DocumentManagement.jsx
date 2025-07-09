import React, { useState } from 'react';
// import { motion } from 'framer-motion'; // Temporarily disabled to fix memory issues
import { 
  FileText, 
  File, 
  Filter,
  Search,
  Upload,
  Brain,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  BarChart3,
  Settings,
  RefreshCw
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

// Import enhanced components
import AIUploadZone from './AIUploadZone';
import ProcessingPipeline from './ProcessingPipeline';
import DocumentGrid from './DocumentGrid';
import AISearchBar from './AISearchBar';
import MissingDocsAlert from './MissingDocsAlert';

// Import mock data
import { mockDocuments, mockProcessingPipeline, mockMissingDocuments } from '../data/documentMockData';

const DocumentManagement = () => {
  const [documents, setDocuments] = useState(mockDocuments);
  const [processingItems, setProcessingItems] = useState(mockProcessingPipeline);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFilters, setSearchFilters] = useState({});
  const [selectedView, setSelectedView] = useState('grid');
  const [stats, setStats] = useState({
    total: mockDocuments.length,
    analyzed: mockDocuments.filter(d => d.status === 'analyzed').length,
    processing: mockDocuments.filter(d => d.status === 'processing').length,
    highRisk: mockDocuments.filter(d => d.aiRiskLevel === 'high').length,
    avgConfidence: Math.round(
      mockDocuments.reduce((acc, doc) => acc + doc.aiConfidence, 0) / mockDocuments.length
    )
  });

  const handleFileUpload = (files) => {
    console.log('Files uploaded:', files);
    // Add new files to processing pipeline
    const newProcessingItems = Array.from(files).map((file, index) => ({
      id: Date.now() + index,
      fileName: file.name,
      stage: 'upload',
      stageIndex: 0,
      progress: 0,
      confidence: 0,
      aiClassification: 'Analyzing...',
      estimatedTime: 'Processing...',
      extractedData: null,
      errors: []
    }));
    
    setProcessingItems(prev => [...prev, ...newProcessingItems]);
  };

  const handleSearch = (query, filters) => {
    setSearchQuery(query);
    setSearchFilters(filters);
    console.log('Search:', query, 'Filters:', filters);
  };

  const handleDocumentAction = (action, document) => {
    console.log('Document action:', action, document);
    switch (action) {
      case 'view':
        // Open document viewer
        break;
      case 'download':
        // Download document
        break;
      case 'analyze':
        // Re-analyze document
        break;
      case 'delete':
        // Delete document
        setDocuments(prev => prev.filter(d => d.id !== document.id));
        break;
      default:
        break;
    }
  };

  const handleUploadForMissingDoc = (documentType) => {
    console.log('Upload for missing document:', documentType);
    // Open upload modal for specific document type
  };

  const filteredDocuments = documents.filter(doc => {
    if (!searchQuery) return true;
    
    const queryLower = searchQuery.toLowerCase();
    return (
      doc.name.toLowerCase().includes(queryLower) ||
      doc.category.toLowerCase().includes(queryLower) ||
      doc.extractedMetadata.vendor?.toLowerCase().includes(queryLower) ||
      doc.tags.some(tag => tag.toLowerCase().includes(queryLower))
    );
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Document Management</h1>
            <p className="text-gray-600 mt-1">AI-powered document analysis and management</p>
          </div>
          
          <div className="flex items-center space-x-4">
            <Badge variant="secondary" className="bg-blue-100 text-blue-700">
              <Brain className="w-3 h-3 mr-1" />
              AI Enhanced
            </Badge>
            <Button variant="outline" size="sm">
              <Settings className="w-4 h-4 mr-1" />
              Settings
            </Button>
            <Button variant="outline" size="sm">
              <RefreshCw className="w-4 h-4 mr-1" />
              Refresh
            </Button>
          </div>
        </div>
      </div>

      {/* Statistics Overview */}
      <div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {[
            { label: 'Total Documents', value: stats.total, icon: FileText, color: 'text-blue-600' },
            { label: 'Analyzed', value: stats.analyzed, icon: CheckCircle, color: 'text-green-600' },
            { label: 'Processing', value: stats.processing, icon: RefreshCw, color: 'text-yellow-600' },
            { label: 'High Risk', value: stats.highRisk, icon: AlertTriangle, color: 'text-red-600' },
            { label: 'Avg AI Confidence', value: `${stats.avgConfidence}%`, icon: Brain, color: 'text-purple-600' }
          ].map((stat, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">{stat.label}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Smart Search */}
      <div>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Search className="w-5 h-5" />
              <span>Smart Document Search</span>
              <Badge variant="secondary" className="bg-indigo-100 text-indigo-700">
                Natural Language
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <AISearchBar
              placeholder="Find invoices over $10k with missing approvals"
              aiSuggestions={true}
              filters={['type', 'risk', 'status', 'date']}
              onSearch={handleSearch}
              onFilterChange={setSearchFilters}
            />
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <div>
        <Tabs defaultValue="documents" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="documents" className="flex items-center space-x-2">
              <FileText className="w-4 h-4" />
              <span>Documents</span>
            </TabsTrigger>
            <TabsTrigger value="upload" className="flex items-center space-x-2">
              <Upload className="w-4 h-4" />
              <span>Upload</span>
            </TabsTrigger>
            <TabsTrigger value="processing" className="flex items-center space-x-2">
              <RefreshCw className="w-4 h-4" />
              <span>Processing</span>
            </TabsTrigger>
            <TabsTrigger value="missing" className="flex items-center space-x-2">
              <AlertTriangle className="w-4 h-4" />
              <span>Missing</span>
            </TabsTrigger>
          </TabsList>

          {/* Documents Tab */}
          <TabsContent value="documents" className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">
                  Showing {filteredDocuments.length} of {documents.length} documents
                </span>
                {searchQuery && (
                  <Badge variant="outline">
                    Search: "{searchQuery}"
                  </Badge>
                )}
              </div>
              
              <div className="flex items-center space-x-2">
                <Button
                  variant={selectedView === 'grid' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedView('grid')}
                >
                  <BarChart3 className="w-4 h-4 mr-1" />
                  Grid
                </Button>
                <Button
                  variant={selectedView === 'list' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedView('list')}
                >
                  <FileText className="w-4 h-4 mr-1" />
                  List
                </Button>
              </div>
            </div>

            <DocumentGrid
              documents={filteredDocuments}
              aiAnalysis={true}
              groupBy="risk-level"
              showInsights={true}
              onDocumentAction={handleDocumentAction}
            />
          </TabsContent>

          {/* Upload Tab */}
          <TabsContent value="upload" className="space-y-4">
            <AIUploadZone
              onUpload={handleFileUpload}
              aiClassification={true}
              supportedTypes={['pdf', 'docx', 'xlsx', 'csv']}
              maxSize="50MB"
              maxFiles={10}
            />
          </TabsContent>

          {/* Processing Tab */}
          <TabsContent value="processing" className="space-y-4">
            <ProcessingPipeline
              documents={processingItems}
              showConfidence={true}
              expandableDetails={true}
            />
          </TabsContent>

          {/* Missing Documents Tab */}
          <TabsContent value="missing" className="space-y-4">
            <MissingDocsAlert
              auditPhase="fieldwork"
              missingDocs={mockMissingDocuments}
              recommendations={true}
              onUploadClick={handleUploadForMissingDoc}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default DocumentManagement;
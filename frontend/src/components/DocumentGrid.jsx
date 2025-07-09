import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FileText, 
  File, 
  MoreVertical, 
  Download, 
  Eye, 
  Share2,
  AlertTriangle,
  CheckCircle,
  Clock,
  Brain,
  TrendingUp,
  DollarSign,
  Calendar,
  Building,
  Star,
  Filter
} from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from './ui/dropdown-menu';
import { mockDocuments } from '../data/documentMockData';

const DocumentGrid = ({ 
  documents = mockDocuments,
  aiAnalysis = true,
  groupBy = 'risk-level',
  showInsights = true,
  onDocumentAction
}) => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date');

  const getFileIcon = (type) => {
    switch (type) {
      case 'pdf': return <FileText className="w-5 h-5 text-red-500" />;
      case 'docx': return <File className="w-5 h-5 text-blue-500" />;
      case 'xlsx': return <File className="w-5 h-5 text-green-500" />;
      case 'csv': return <File className="w-5 h-5 text-orange-500" />;
      default: return <File className="w-5 h-5 text-gray-500" />;
    }
  };

  const getRiskColor = (level) => {
    switch (level) {
      case 'low': return 'bg-green-100 text-green-700 border-green-200';
      case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'high': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'analyzed': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'processing': return <Clock className="w-4 h-4 text-yellow-500 animate-pulse" />;
      case 'pending': return <AlertTriangle className="w-4 h-4 text-orange-500" />;
      default: return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'financial': return <DollarSign className="w-4 h-4 text-green-600" />;
      case 'invoice': return <FileText className="w-4 h-4 text-blue-600" />;
      case 'contract': return <File className="w-4 h-4 text-purple-600" />;
      case 'expense': return <TrendingUp className="w-4 h-4 text-orange-600" />;
      case 'bank-statement': return <Building className="w-4 h-4 text-indigo-600" />;
      default: return <FileText className="w-4 h-4 text-gray-600" />;
    }
  };

  const handleDocumentAction = (action, document) => {
    if (onDocumentAction) {
      onDocumentAction(action, document);
    }
    console.log(`Action: ${action}`, document);
  };

  const filteredDocuments = documents.filter(doc => {
    if (selectedFilter === 'all') return true;
    return doc.aiRiskLevel === selectedFilter || doc.category === selectedFilter || doc.status === selectedFilter;
  });

  const sortedDocuments = [...filteredDocuments].sort((a, b) => {
    switch (sortBy) {
      case 'date':
        return new Date(b.uploadDate) - new Date(a.uploadDate);
      case 'risk':
        const riskOrder = { high: 3, medium: 2, low: 1 };
        return riskOrder[b.aiRiskLevel] - riskOrder[a.aiRiskLevel];
      case 'quality':
        return b.qualityScore - a.qualityScore;
      case 'confidence':
        return b.aiConfidence - a.aiConfidence;
      default:
        return 0;
    }
  });

  const groupedDocuments = () => {
    if (groupBy === 'risk-level') {
      return {
        high: sortedDocuments.filter(d => d.aiRiskLevel === 'high'),
        medium: sortedDocuments.filter(d => d.aiRiskLevel === 'medium'),
        low: sortedDocuments.filter(d => d.aiRiskLevel === 'low')
      };
    }
    return { all: sortedDocuments };
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const DocumentCard = ({ document, index }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -4 }}
      className="group"
    >
      <Card className={`overflow-hidden hover:shadow-lg transition-all duration-300 border-2 hover:border-indigo-200 ${
        document.aiRiskLevel === 'high' ? 'ring-1 ring-red-200' : ''
      }`}>
        <CardContent className="p-0">
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-gray-50 to-white">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="mt-1"
                >
                  {getFileIcon(document.type)}
                </motion.div>
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900 group-hover:text-indigo-700 transition-colors line-clamp-2">
                    {document.name}
                  </h3>
                  <div className="flex items-center space-x-2 text-sm text-gray-500 mt-1">
                    <span>{document.size}</span>
                    <span>•</span>
                    <span>{formatDate(document.uploadDate)}</span>
                  </div>
                </div>
              </div>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => handleDocumentAction('view', document)}>
                    <Eye className="w-4 h-4 mr-2" />
                    View Document
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleDocumentAction('download', document)}>
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleDocumentAction('share', document)}>
                    <Share2 className="w-4 h-4 mr-2" />
                    Share
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleDocumentAction('analyze', document)}>
                    <Brain className="w-4 h-4 mr-2" />
                    Re-analyze
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Status and Categories */}
          <div className="px-4 py-3 border-t border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                {getStatusIcon(document.status)}
                <span className="text-sm font-medium capitalize">{document.status}</span>
              </div>
              <div className="flex items-center space-x-2">
                {getCategoryIcon(document.category)}
                <span className="text-sm text-gray-600 capitalize">{document.category}</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <Badge variant="secondary" className={getRiskColor(document.aiRiskLevel)}>
                {document.aiRiskLevel.toUpperCase()} RISK
              </Badge>
              <div className="flex items-center space-x-2 text-sm">
                <span className="text-gray-600">Quality:</span>
                <span className="font-medium">{document.qualityScore}%</span>
              </div>
            </div>
          </div>

          {/* AI Analysis */}
          {aiAnalysis && (
            <div className="px-4 py-3 border-t border-gray-100">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <Brain className="w-4 h-4 text-indigo-600" />
                  <span className="text-sm font-medium">AI Analysis</span>
                </div>
                <Badge variant="outline" className="text-xs">
                  {document.aiConfidence}% confidence
                </Badge>
              </div>
              
              <div className="space-y-2">
                {document.aiInsights.slice(0, 2).map((insight, i) => (
                  <div key={i} className="text-xs text-gray-600 flex items-start space-x-2">
                    <span className="text-indigo-500 mt-1">•</span>
                    <span>{insight}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Extracted Metadata */}
          {showInsights && document.extractedMetadata && (
            <div className="px-4 py-3 border-t border-gray-100 bg-gray-50">
              <h4 className="text-sm font-medium text-gray-800 mb-2">Extracted Data</h4>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {Object.entries(document.extractedMetadata)
                  .filter(([key]) => !['keyTerms', 'documentType'].includes(key))
                  .slice(0, 4)
                  .map(([key, value]) => (
                    <div key={key} className="flex flex-col">
                      <span className="text-gray-500 capitalize">{key.replace(/([A-Z])/g, ' $1')}:</span>
                      <span className="font-medium text-gray-900 truncate">{value}</span>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* Tags */}
          <div className="px-4 py-3 border-t border-gray-100">
            <div className="flex flex-wrap gap-1">
              {document.tags.slice(0, 3).map((tag, i) => (
                <Badge key={i} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
              {document.tags.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{document.tags.length - 3} more
                </Badge>
              )}
            </div>
          </div>

          {/* Risk Factors */}
          {document.riskFactors && (
            <div className="px-4 py-3 border-t border-gray-100">
              <h4 className="text-sm font-medium text-gray-800 mb-2">Risk Assessment</h4>
              <div className="space-y-1">
                {document.riskFactors.slice(0, 2).map((factor, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <span className="text-xs text-gray-600">{factor.factor}</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-12 bg-gray-200 rounded-full h-1">
                        <div 
                          className={`h-1 rounded-full ${
                            factor.level === 'high' ? 'bg-red-500' :
                            factor.level === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                          }`}
                          style={{ width: `${factor.score}%` }}
                        />
                      </div>
                      <span className="text-xs font-medium">{factor.score}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* AI Suggestions */}
          {document.aiSuggestions && (
            <div className="px-4 py-3 border-t border-gray-100 bg-indigo-50">
              <div className="flex items-center space-x-2 mb-2">
                <Star className="w-4 h-4 text-indigo-600" />
                <span className="text-sm font-medium text-indigo-900">AI Suggestions</span>
              </div>
              <div className="space-y-1">
                {document.aiSuggestions.slice(0, 2).map((suggestion, i) => (
                  <div key={i} className="text-xs text-indigo-700 flex items-center space-x-2">
                    <span className="text-indigo-500">→</span>
                    <span>{suggestion}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );

  const groups = groupedDocuments();

  return (
    <div className="space-y-6">
      {/* Filters and Sort */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">Filter:</span>
            <div className="flex space-x-1">
              {['all', 'high', 'medium', 'low'].map(filter => (
                <Button
                  key={filter}
                  variant={selectedFilter === filter ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedFilter(filter)}
                  className="capitalize"
                >
                  {filter === 'all' ? 'All' : `${filter} Risk`}
                </Button>
              ))}
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600">Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-1 border rounded-md text-sm"
          >
            <option value="date">Upload Date</option>
            <option value="risk">Risk Level</option>
            <option value="quality">Quality Score</option>
            <option value="confidence">AI Confidence</option>
          </select>
        </div>
      </div>

      {/* Document Groups */}
      <div className="space-y-6">
        {Object.entries(groups).map(([groupName, groupDocs]) => (
          <div key={groupName}>
            {groupBy === 'risk-level' && groupDocs.length > 0 && (
              <div className="flex items-center space-x-2 mb-4">
                <h3 className="text-lg font-semibold text-gray-900 capitalize">
                  {groupName} Risk Documents
                </h3>
                <Badge variant="outline" className={getRiskColor(groupName)}>
                  {groupDocs.length} items
                </Badge>
              </div>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence>
                {groupDocs.map((document, index) => (
                  <DocumentCard key={document.id} document={document} index={index} />
                ))}
              </AnimatePresence>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredDocuments.length === 0 && (
        <motion.div 
          className="text-center py-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No documents found</h3>
          <p className="text-gray-600">Try adjusting your filter or upload some documents</p>
        </motion.div>
      )}
    </div>
  );
};

export default DocumentGrid;
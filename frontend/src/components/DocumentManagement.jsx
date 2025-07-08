import React, { useState } from 'react';
import { 
  FileText, 
  File, 
  Filter,
  Search,
  MoreVertical,
  Download,
  Eye,
  Trash2,
  Brain,
  Clock,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from './ui/dropdown-menu';
import { mockDocuments } from '../data/mockData';

const DocumentManagement = () => {
  const [documents, setDocuments] = useState(mockDocuments);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const getFileIcon = (type) => {
    switch (type) {
      case 'pdf': return <FileText className="w-5 h-5 text-red-500" />;
      case 'docx': return <File className="w-5 h-5 text-blue-500" />;
      case 'xlsx': return <File className="w-5 h-5 text-green-500" />;
      default: return <File className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'analyzing': return <Brain className="w-4 h-4 text-purple-500 animate-pulse" />;
      case 'queued': return <Clock className="w-4 h-4 text-yellow-500" />;
      default: return <AlertCircle className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-700';
      case 'analyzing': return 'bg-purple-100 text-purple-700';
      case 'queued': return 'bg-yellow-100 text-yellow-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesFilter = filterStatus === 'all' || doc.aiStatus === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const handleAction = (action, docId) => {
    console.log(`Action: ${action} on document ${docId}`);
    // Mock actions
    if (action === 'analyze') {
      setDocuments(docs => 
        docs.map(doc => 
          doc.id === docId 
            ? { ...doc, aiStatus: 'analyzing', status: 'processing' }
            : doc
        )
      );
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Document Management</h1>
        <Button className="bg-indigo-600 hover:bg-indigo-700">
          <FileText className="w-4 h-4 mr-2" />
          Upload Documents
        </Button>
      </div>

      {/* Search and Filter */}
      <div className="flex space-x-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search documents..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="flex space-x-2">
          {['all', 'completed', 'analyzing', 'queued'].map(status => (
            <Button
              key={status}
              variant={filterStatus === status ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilterStatus(status)}
              className="capitalize"
            >
              {status === 'all' ? 'All' : status}
            </Button>
          ))}
        </div>
      </div>

      {/* Document Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDocuments.map((doc) => (
          <Card key={doc.id} className="hover:shadow-lg transition-shadow duration-200">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  {getFileIcon(doc.type)}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-gray-900 truncate">{doc.name}</h3>
                    <p className="text-sm text-gray-500">{doc.size}</p>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => handleAction('view', doc.id)}>
                      <Eye className="w-4 h-4 mr-2" />
                      View
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleAction('download', doc.id)}>
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleAction('analyze', doc.id)}>
                      <Brain className="w-4 h-4 mr-2" />
                      Re-analyze
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleAction('delete', doc.id)}>
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            
            <CardContent>
              {/* Status */}
              <div className="flex items-center justify-between mb-3">
                <Badge variant="secondary" className={getStatusColor(doc.aiStatus)}>
                  {getStatusIcon(doc.aiStatus)}
                  <span className="ml-1 capitalize">{doc.aiStatus}</span>
                </Badge>
                {doc.aiScore && (
                  <div className="text-sm text-gray-600">
                    Score: <span className="font-medium">{doc.aiScore}%</span>
                  </div>
                )}
              </div>

              {/* AI Summary */}
              <div className="bg-gray-50 rounded-lg p-3 mb-3">
                <p className="text-xs text-gray-600">{doc.aiSummary}</p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1 mb-3">
                {doc.tags.map((tag, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>

              {/* Upload Date */}
              <div className="text-xs text-gray-500">
                Uploaded: {new Date(doc.uploadDate).toLocaleDateString()}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredDocuments.length === 0 && (
        <div className="text-center py-12">
          <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No documents found</h3>
          <p className="text-gray-600 mb-4">
            {searchTerm ? 'Try adjusting your search terms' : 'Upload your first document to get started'}
          </p>
          <Button variant="outline">
            <FileText className="w-4 h-4 mr-2" />
            Upload Document
          </Button>
        </div>
      )}
    </div>
  );
};

export default DocumentManagement;
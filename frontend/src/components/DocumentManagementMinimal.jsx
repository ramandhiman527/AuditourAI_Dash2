import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

const DocumentManagementMinimal = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">Document Management</h1>
      <p className="text-gray-600 mb-8">AI-powered document analysis and management</p>
      
      <Card>
        <CardHeader>
          <CardTitle>Documents</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Document management interface is loading...</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default DocumentManagementMinimal;
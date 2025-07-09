import { io } from 'socket.io-client';
import useAuditStore from '../store/useAuditStore';

class WebSocketService {
  constructor() {
    this.socket = null;
    this.reconnectAttempts = 0;
    this.maxReconnectAttempts = 5;
    this.isConnecting = false;
  }

  connect() {
    if (this.isConnecting || (this.socket && this.socket.connected)) {
      return;
    }

    this.isConnecting = true;
    const { setConnectionStatus, updateRealTimeData, addAnomaly, updateProcessingPipeline } = useAuditStore.getState();
    
    // For development, we'll simulate a WebSocket connection
    // In production, replace with actual backend URL
    const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8001';
    
    try {
      setConnectionStatus('connecting');
      
      // Simulate WebSocket connection for demo purposes
      setTimeout(() => {
        setConnectionStatus('connected');
        this.isConnecting = false;
        this.reconnectAttempts = 0;
        this.startMockDataStream();
      }, 1000);

      // this.socket = io(BACKEND_URL, {
      //   transports: ['websocket'],
      //   timeout: 5000,
      // });

      // this.socket.on('connect', () => {
      //   console.log('WebSocket connected');
      //   setConnectionStatus('connected');
      //   this.isConnecting = false;
      //   this.reconnectAttempts = 0;
      // });

      // this.socket.on('disconnect', () => {
      //   console.log('WebSocket disconnected');
      //   setConnectionStatus('disconnected');
      //   this.handleReconnect();
      // });

      // this.socket.on('error', (error) => {
      //   console.error('WebSocket error:', error);
      //   setConnectionStatus('error');
      //   this.handleReconnect();
      // });

      // // Real-time data handlers
      // this.socket.on('realtime_update', (data) => {
      //   updateRealTimeData(data);
      // });

      // this.socket.on('anomaly_detected', (anomaly) => {
      //   addAnomaly(anomaly);
      // });

      // this.socket.on('processing_update', (update) => {
      //   updateProcessingPipeline(update);
      // });

    } catch (error) {
      console.error('Failed to connect WebSocket:', error);
      setConnectionStatus('error');
      this.isConnecting = false;
      this.handleReconnect();
    }
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
    if (this.mockInterval) {
      clearInterval(this.mockInterval);
    }
    const { setConnectionStatus } = useAuditStore.getState();
    setConnectionStatus('disconnected');
  }

  handleReconnect() {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      const delay = Math.pow(2, this.reconnectAttempts) * 1000; // Exponential backoff
      
      setTimeout(() => {
        console.log(`Reconnection attempt ${this.reconnectAttempts}`);
        this.connect();
      }, delay);
    } else {
      console.error('Max reconnection attempts reached');
      const { setConnectionStatus } = useAuditStore.getState();
      setConnectionStatus('error');
    }
  }

  // Mock data stream for demonstration
  startMockDataStream() {
    const { updateRealTimeData, addAnomaly, updateProcessingPipeline } = useAuditStore.getState();
    
    this.mockInterval = setInterval(() => {
      // Update real-time metrics
      updateRealTimeData({
        activeUsers: Math.floor(Math.random() * 20) + 5,
        processingDocuments: Math.floor(Math.random() * 8) + 1,
        aiSystemLoad: Math.floor(Math.random() * 40) + 30,
      });

      // Occasionally add anomalies
      if (Math.random() < 0.1) { // 10% chance every interval
        const anomalyTypes = ['data_inconsistency', 'compliance_deviation', 'unusual_pattern'];
        const severities = ['low', 'medium', 'high'];
        
        addAnomaly({
          id: Date.now(),
          type: anomalyTypes[Math.floor(Math.random() * anomalyTypes.length)],
          severity: severities[Math.floor(Math.random() * severities.length)],
          description: 'Detected during real-time monitoring',
          confidence: Math.floor(Math.random() * 30) + 70,
          timestamp: new Date().toISOString(),
          status: 'investigating'
        });
      }

      // Update processing pipeline
      const { processingPipeline } = useAuditStore.getState();
      processingPipeline.forEach(item => {
        if (item.stage === 'analysis' && item.aiProgress < 100) {
          updateProcessingPipeline({
            id: item.id,
            aiProgress: Math.min(item.aiProgress + Math.random() * 15, 100)
          });
        }
      });

    }, 3000); // Update every 3 seconds
  }

  // Send message to AI (would be real WebSocket in production)
  sendAIMessage(message) {
    return new Promise((resolve) => {
      // Simulate AI processing delay
      setTimeout(() => {
        const responses = [
          {
            content: `I've analyzed your query: "${message}". Based on current audit data, I recommend focusing on the compliance areas showing recent variations.`,
            confidence: 92,
            suggestions: ['Review compliance reports', 'Check risk assessments', 'Analyze trend patterns']
          },
          {
            content: `Regarding "${message}" - I've detected 3 related patterns in your documents. The AI confidence is high for automated recommendations.`,
            confidence: 88,
            suggestions: ['Generate detailed report', 'Set up monitoring alerts', 'Schedule follow-up review']
          },
          {
            content: `Processing "${message}"... Found correlations with risk management protocols. Suggested actions have been prioritized by impact.`,
            confidence: 94,
            suggestions: ['Update risk matrix', 'Notify stakeholders', 'Implement mitigation steps']
          }
        ];
        
        const response = responses[Math.floor(Math.random() * responses.length)];
        resolve(response);
      }, 1500 + Math.random() * 1000);
    });
  }

  // Emit events (would be real WebSocket in production)
  emit(event, data) {
    console.log(`Mock emit: ${event}`, data);
    // if (this.socket && this.socket.connected) {
    //   this.socket.emit(event, data);
    // }
  }
}

export default new WebSocketService();
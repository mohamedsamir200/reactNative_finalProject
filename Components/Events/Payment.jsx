import React, { useState } from 'react';
import { View, Button, Modal, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { WebView } from 'react-native-webview';

function PayPalPayment({ total }) {
  const [showWebView, setShowWebView] = useState(false);

  // قم بتعديل عنوان PayPal URL ليشمل بياناتك الخاصة
  const paypalUrl = `https://www.paypal.com/cgi-bin/webscr?cmd=_xclick&business=your-paypal-email&currency_code=USD&amount=${total}`;

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.payButton} onPress={() => setShowWebView(true)}>
        <Text style={styles.payButtonText}>Pay with PayPal</Text>
      </TouchableOpacity>
      
      {/* عرض نافذة WebView في حالة النقر على الدفع */}
      {showWebView && (
        <Modal visible={showWebView} animationType="slide">
          <WebView
            source={{ uri: paypalUrl }}
            onNavigationStateChange={(navState) => {
              if (navState.url.includes('success')) {
                setShowWebView(false);
                // قم بمعالجة الدفع الناجح هنا
                alert('Payment successful!');
              } else if (navState.url.includes('cancel')) {
                setShowWebView(false);
                // قم بمعالجة الإلغاء هنا
                alert('Payment cancelled');
              }
            }}
          />
          {/* زر لإغلاق WebView والعودة إلى التطبيق */}
          <TouchableOpacity style={styles.closeButton} onPress={() => setShowWebView(false)}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </Modal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  payButton: {
    backgroundColor: '#0070ba',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  payButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    backgroundColor: '#ff0000',
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default PayPalPayment;

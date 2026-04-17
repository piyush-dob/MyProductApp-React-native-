import React, { useRef } from "react";
import { View, StyleSheet, ActivityIndicator, Text } from "react-native";
import { WebView } from "react-native-webview";
import { useDispatch } from "react-redux";
import { clearCart } from "../../redux/cartSlice";
import { SafeAreaView } from "react-native-safe-area-context"; // ✅ ADD

const PaymentScreen = ({ route, navigation }) => {
  const { totalPrice } = route.params;
  const dispatch = useDispatch();
  const webViewRef = useRef(null);

  const razorpayHTML = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
        <style>
          body {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
            background-color: #f1f5f9;
            font-family: Arial, sans-serif;
          }
          .container {
            text-align: center;
            padding: 20px;
          }
          h2 { color: #0f172a; }
          p { color: #64748b; }
          #pay-btn {
            background-color: #2563eb;
            color: white;
            border: none;
            padding: 15px 40px;
            font-size: 16px;
            border-radius: 12px;
            cursor: pointer;
            margin-top: 20px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h2>Complete Your Payment</h2>
          <p>Total Amount: Rs. ${totalPrice}</p>
          <button id="pay-btn" onclick="openRazorpay()">Pay Now</button>
        </div>
        <script>
          function openRazorpay() {
            var options = {
              key: "rzp_test_SeQPO0aoCFlqh7",
              amount: ${Math.round(totalPrice * 100)},
              currency: "INR",
              name: "My Shop",
              description: "Test Payment",
              prefill: {
                name: "Test User",
                email: "test@example.com",
                contact: "9999999999"
              },
              theme: { color: "#2563eb" },
              notes: {
  address: "Test Payment"
},
_: {
  integration: "react_native_webview",
  integration_version: "1.0.0",
},
              handler: function(response) {
                window.ReactNativeWebView.postMessage(JSON.stringify({
                  status: "success",
                  paymentId: response.razorpay_payment_id
                }));
              },
              modal: {
                ondismiss: function() {
                  window.ReactNativeWebView.postMessage(JSON.stringify({
                    status: "cancelled"
                  }));
                }
              }
            };
            var rzp = new Razorpay(options);
            rzp.on("payment.failed", function(response) {
              window.ReactNativeWebView.postMessage(JSON.stringify({
                status: "failed",
                error: response.error.description
              }));
            });
            rzp.open();
          }
          window.onload = function() {
            setTimeout(openRazorpay, 1000);
          };
        </script>
      </body>
    </html>
  `;

  const handleMessage = (event) => {
    try {
      const raw = event.nativeEvent.data;

      // ✅ Log EVERY message coming from WebView
      console.log("==== RAW MESSAGE FROM WEBVIEW ====");
      console.log(raw);
      console.log("==================================");

      // ✅ Ignore non-JSON messages
      if (!raw || !raw.includes("status")) {
        console.log("IGNORED — not our message");
        return;
      }

      const data = JSON.parse(raw);
      console.log("PARSED DATA:", JSON.stringify(data));
      console.log("STATUS:", data.status);

      if (data.status === "success") {
        console.log("✅ PAYMENT SUCCESS — paymentId:", data.paymentId);
        dispatch(clearCart());
        navigation.reset({
          index: 0,
          routes: [
            { name: "PaymentSuccess", params: { paymentId: data.paymentId } },
          ],
        });
      } else if (data.status === "cancelled") {
        console.log("🚫 PAYMENT CANCELLED");
        navigation.goBack();
      } else if (data.status === "failed") {
        console.log("❌ PAYMENT FAILED — error:", data.error);
        if (data.error) {
          navigation.reset({ index: 0, routes: [{ name: "PaymentFailed" }] });
        }
      }
    } catch (e) {
      console.log("❌ CATCH ERROR:", e.message);
      console.log("RAW DATA THAT CAUSED ERROR:", event.nativeEvent.data);
      return;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <WebView
        ref={webViewRef}
        originWhitelist={["*"]}
        source={{ html: razorpayHTML }}
        onMessage={handleMessage}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={true}
        renderLoading={() => (
          <View style={styles.loader}>
            <ActivityIndicator size="large" color="#2563eb" />
            <Text style={styles.loadingText}>Loading Payment...</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default PaymentScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f1f5f9", // ✅ ADD this so safe area bg matches
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#f1f5f9",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#64748b",
  },
});

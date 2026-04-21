import React, { useRef } from "react";
import { View, StyleSheet, ActivityIndicator, Text } from "react-native";
import { WebView } from "react-native-webview";
import { useDispatch } from "react-redux";
import { clearCart } from "../../redux/cartSlice";
import { SafeAreaView } from "react-native-safe-area-context";

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
          .spinner {
            width: 48px;
            height: 48px;
            border: 5px solid #e2e8f0;
            border-top: 5px solid #2563eb;
            border-radius: 50%;
            animation: spin 0.8s linear infinite;
          }
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
          .loader-wrap {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 16px;
          }
          .loader-text {
            color: #64748b;
            font-size: 15px;
          }
        </style>
      </head>
      <body>

        <script>
          function openRazorpay() {
            var options = {
              key: "rzp_test_SeQPO0aoCFlqh7",
              amount: ${Math.round(totalPrice * 100)},
              currency: "INR",
              name: "My Products",
              description: "Test Payment",

              prefill: {
                name: "Test User",
                email: "test@example.com",
                contact: "9999999999",
              },

              theme: { color: "#2563eb" },

              method: {
                upi: true,
                card: true,
                netbanking: true,
                wallet: true,
                paylater: true,
              },

              notes: {
                address: "Test Payment"
              },

              handler: function(response) {
                // ✅ Show spinner loader instead of success screen
                document.body.innerHTML = \`
                  <div style="
                    position:fixed; top:0; left:0; right:0; bottom:0;
                    background:#f1f5f9;
                    display:flex; flex-direction:column;
                    justify-content:center; align-items:center;
                    gap:16px;
                  ">
                    <div class="spinner"></div>
                    <p style="color:#64748b; font-size:15px; margin:0;">
                      Please wait...
                    </p>
                  </div>
                \`;

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

          // ✅ Open Razorpay directly — no Pay Now button
          window.onload = function() {
            setTimeout(openRazorpay, 500);
          };
        </script>
      </body>
    </html>
  `;

  const handleMessage = (event) => {
    try {
      const raw = event.nativeEvent.data;

      console.log("==== RAW MESSAGE FROM WEBVIEW ====");
      console.log(raw);
      console.log("==================================");

      if (!raw || !raw.includes("status")) return;

      const data = JSON.parse(raw);

      if (data.status === "success") {
        dispatch(clearCart());
        navigation.reset({
          index: 0,
          routes: [{ name: "Home" }],
        });
      } else if (data.status === "cancelled") {
        navigation.goBack();
      } else if (data.status === "failed") {
        navigation.reset({
          index: 0,
          routes: [{ name: "PaymentFailed" }],
        });
      }
    } catch (e) {
      console.log("ERROR:", e.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <WebView
        ref={webViewRef}
        originWhitelist={["*"]}
        source={{ html: razorpayHTML }}
        onMessage={handleMessage}
        javaScriptEnabled
        domStorageEnabled
        startInLoadingState
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
    backgroundColor: "#f1f5f9",
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

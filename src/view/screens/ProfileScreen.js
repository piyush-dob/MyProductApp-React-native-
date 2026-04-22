import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
  Switch,
  StatusBar,
  Modal,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY_IMAGE = "@profile_image";
const STORAGE_KEY_NOTIFICATIONS = "@notifications_enabled";
const STORAGE_KEY_DARKMODE = "@dark_mode_enabled";

const ProfileScreen = ({ navigation }) => {
  const [profileImage, setProfileImage] = useState(null);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [showPhotoModal, setShowPhotoModal] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  const STORAGE_KEYS = {
    TOKEN: "userToken",
    IMAGE: "@profile_image",
    EMAIL: "userEmail",
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        const [img, notif, dark, email] = await Promise.all([
          AsyncStorage.getItem(STORAGE_KEY_IMAGE),
          AsyncStorage.getItem(STORAGE_KEY_NOTIFICATIONS),
          AsyncStorage.getItem(STORAGE_KEY_DARKMODE),
          AsyncStorage.getItem("userEmail"),
        ]);
        if (img) setProfileImage(img);
        if (notif !== null) setNotificationsEnabled(JSON.parse(notif));
        if (dark !== null) setDarkMode(JSON.parse(dark));
        if (email) setUserEmail(email);
      } catch (e) {
        console.error("Failed to load profile data:", e);
      }
    };
    loadData();
  }, []);

  // ✅ FIX 2 — Reset StatusBar when leaving ProfileScreen
  useFocusEffect(
    useCallback(() => {
      // When Profile screen is focused
      // StatusBar.setBarStyle(darkMode ? "light-content" : "dark-content");
      // StatusBar.setBackgroundColor(darkMode ? "white" : "white");
      // StatusBar.setBackgroundColor(darkMode ? "#ffffff" : "#0F0F1A");


      return () => {
        // When leaving Profile screen — reset to default
        StatusBar.setBarStyle("dark-content");
        StatusBar.setBackgroundColor("transparent");
      };
    }, [darkMode])
  );

  const saveImage = async (uri) => {
    try {
      if (uri) {
        await AsyncStorage.setItem(STORAGE_KEY_IMAGE, uri);
      } else {
        await AsyncStorage.removeItem(STORAGE_KEY_IMAGE);
      }
    } catch (e) {
      console.error("Failed to save image:", e);
    }
  };

  const handleNotifToggle = async (val) => {
    setNotificationsEnabled(val);
    await AsyncStorage.setItem(STORAGE_KEY_NOTIFICATIONS, JSON.stringify(val));
  };

  const handleDarkModeToggle = async (val) => {
    setDarkMode(val);
    await AsyncStorage.setItem(STORAGE_KEY_DARKMODE, JSON.stringify(val));
    // ✅ Instantly update StatusBar when toggle is switched
    StatusBar.setBarStyle(val ? "light-content" : "dark-content");
    StatusBar.setBackgroundColor(val ? "#0F0F1A" : "#F2F4FB");
  };

  const pickImage = () => {
    setShowPhotoModal(true);
  };

  const handleGallery = async () => {
    setShowPhotoModal(false);
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission Denied", "We need gallery access to change your photo.");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.85,
    });
    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setProfileImage(uri);
      saveImage(uri);
    }
  };

  const handleCamera = async () => {
    setShowPhotoModal(false);
    const camStatus = await ImagePicker.requestCameraPermissionsAsync();
    if (camStatus.status !== "granted") {
      Alert.alert("Permission Denied", "Camera permission is required.");
      return;
    }
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.85,
    });
    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setProfileImage(uri);
      saveImage(uri);
    }
  };

  const handleRemovePhoto = () => {
    setShowPhotoModal(false);
    setProfileImage(null);
    saveImage(null);
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.multiRemove([
        STORAGE_KEYS.TOKEN,
        STORAGE_KEYS.IMAGE,
        STORAGE_KEYS.EMAIL,
      ]);
      navigation.reset({
        index: 0,
        routes: [{ name: "login" }],
      });
    } catch (error) {
      console.log(error);
    }
  };

  const t = {
    bg: darkMode ? "#0F0F1A" : "#F2F4FB",
    card: darkMode ? "#1C1C2E" : "#FFFFFF",
    text: darkMode ? "#EAEAF5" : "#1A1A2E",
    subText: darkMode ? "#7B7B9E" : "#9999BB",
    accent: "#6C63FF",
    danger: "#FF4D6D",
    divider: darkMode ? "#2A2A3E" : "#F0F2FA",
    iconBg: darkMode ? "#2A2A3E" : "#F0EEFF",
    shadow: darkMode ? "#000" : "#B0B8D1",
  };

  const OptionRow = ({ icon, label, rightElement, onPress, isLast }) => (
    <TouchableOpacity
      style={[
        styles.optionRow,
        !isLast && { borderBottomWidth: 1, borderBottomColor: t.divider },
      ]}
      onPress={onPress}
      activeOpacity={onPress ? 0.7 : 1}
    >
      <View style={[styles.iconBox, { backgroundColor: t.iconBg }]}>
        <Text style={styles.optionIcon}>{icon}</Text>
      </View>
      <Text style={[styles.optionLabel, { color: t.text }]}>{label}</Text>
      <View>{rightElement}</View>
    </TouchableOpacity>
  );

  return (
    <>
      {/* ✅ FIX 1 — StatusBar with correct style based on darkMode */}
      <StatusBar
        barStyle={darkMode ? "light-content" : "dark-content"}
        backgroundColor={t.bg}
      />

      {/* ✅ FIX 1 — edges=["top"] fixes SafeAreaView ignoring StatusBar color */}
      <SafeAreaView edges={["top"]} style={[styles.safeArea, { backgroundColor: t.bg }]}>
        <ScrollView
          contentContainerStyle={styles.container}
          showsVerticalScrollIndicator={false}
        >
          <Text style={[styles.headerTitle, { color: t.text }]}>Profile</Text>

          {/* Avatar Card */}
          <View style={[styles.avatarCard, { backgroundColor: t.card, shadowColor: t.shadow }]}>
            <TouchableOpacity onPress={pickImage} activeOpacity={0.85}>
              <View style={styles.avatarWrapper}>
                {profileImage ? (
                  <Image source={{ uri: profileImage }} style={styles.avatar} />
                ) : (
                  <View style={[styles.avatarPlaceholder, { backgroundColor: t.accent }]}>
                    <Text style={{ fontSize: 22 }}>👤</Text>
                  </View>
                )}
                <View style={[styles.cameraBadge, { backgroundColor: t.card }]}>
                  <Text style={styles.cameraEmoji}>📷</Text>
                </View>
              </View>
            </TouchableOpacity>

            <Text style={[styles.profileEmail, { color: t.subText }]}>{userEmail}</Text>

            <TouchableOpacity
              style={[styles.changePhotoBtn, { borderColor: t.accent }]}
              onPress={pickImage}
            >
              <Text style={[styles.changePhotoText, { color: t.accent }]}>Change Photo</Text>
            </TouchableOpacity>
          </View>

          {/* Options Card */}
          <View style={[styles.card, { backgroundColor: t.card, shadowColor: t.shadow }]}>
            <OptionRow
              icon="🔔"
              label="Notifications"
              rightElement={
                <Switch
                  value={notificationsEnabled}
                  onValueChange={handleNotifToggle}
                  trackColor={{ false: "#ccc", true: t.accent }}
                  thumbColor="#fff"
                  ios_backgroundColor="#ccc"
                />
              }
            />

            <OptionRow
              icon="🌙"
              label="Dark Mode"
              rightElement={
                <Switch
                  value={darkMode}
                  onValueChange={handleDarkModeToggle}
                  trackColor={{ false: "#ccc", true: t.accent }}
                  thumbColor="#fff"
                  ios_backgroundColor="#ccc"
                />
              }
            />

            <OptionRow
              icon="🛡️"
              label="Security"
              rightElement={
                <Text style={[styles.chevron, { color: t.subText }]}>›</Text>
              }
              onPress={() => Alert.alert("Security", "Manage your security settings here.")}
            />

            <OptionRow
              icon="ℹ️"
              label="About Us"
              rightElement={
                <Text style={[styles.chevron, { color: t.subText }]}>›</Text>
              }
              onPress={() =>
                Alert.alert("About Us", "App Version 1.0.0\nBuilt with ❤️ using React Native")
              }
              isLast
            />
          </View>

          {/* Logout */}
          <TouchableOpacity
            style={[styles.logoutBtn, { borderColor: t.danger }]}
            onPress={() =>
              Alert.alert("Logout", "Are you sure you want to logout?", [
                { text: "Cancel", style: "cancel" },
                { text: "Logout", style: "destructive", onPress: () => handleLogout() },
              ])
            }
            activeOpacity={0.85}
          >
            <Text style={[styles.logoutText, { color: t.danger }]}>🚪 Log Out</Text>
          </TouchableOpacity>
        </ScrollView>

        {/* Photo Picker Modal */}
        <Modal
          visible={showPhotoModal}
          transparent
          animationType="slide"
          onRequestClose={() => setShowPhotoModal(false)}
        >
          <TouchableOpacity
            style={styles.modalBackdrop}
            activeOpacity={1}
            onPress={() => setShowPhotoModal(false)}
          >
            <TouchableOpacity activeOpacity={1} onPress={() => {}}>
              <View style={[styles.bottomSheet, { backgroundColor: t.card }]}>
                <View style={[styles.sheetHandle, { backgroundColor: t.divider }]} />

                <Text style={[styles.sheetTitle, { color: t.subText }]}>Profile Photo</Text>

                <TouchableOpacity
                  onPress={handleGallery}
                  style={[styles.sheetOption, { borderBottomColor: t.divider }]}
                >
                  <Text style={[styles.sheetOptionText, { color: t.text }]}>
                    🖼️ Choose from Gallery
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={handleCamera}
                  style={[styles.sheetOption, { borderBottomColor: t.divider }]}
                >
                  <Text style={[styles.sheetOptionText, { color: t.text }]}>
                    📸 Take Photo
                  </Text>
                </TouchableOpacity>

                {profileImage && (
                  <TouchableOpacity
                    onPress={handleRemovePhoto}
                    style={[styles.sheetOption, { borderBottomColor: t.divider }]}
                  >
                    <Text style={[styles.sheetOptionText, { color: t.danger }]}>
                      🗑️ Remove Photo
                    </Text>
                  </TouchableOpacity>
                )}

                <TouchableOpacity
                  onPress={() => setShowPhotoModal(false)}
                  style={styles.sheetCancel}
                >
                  <Text style={[styles.sheetCancelText, { color: t.subText }]}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          </TouchableOpacity>
        </Modal>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  container: { paddingHorizontal: 20, paddingBottom: 40 },

  headerTitle: {
    fontSize: 28,
    fontWeight: "800",
    letterSpacing: 0.3,
    marginTop: 12,
    marginBottom: 20,
  },

  avatarCard: {
    borderRadius: 22,
    paddingVertical: 28,
    paddingHorizontal: 20,
    alignItems: "center",
    marginBottom: 18,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 14,
    elevation: 4,
  },
  avatarWrapper: {
    position: "relative",
    width: 100,
    height: 100,
    marginBottom: 14,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: "#6C63FF",
  },
  avatarPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarInitials: { fontSize: 34, fontWeight: "800", color: "#fff" },
  cameraBadge: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
  cameraEmoji: { fontSize: 15 },
  profileEmail: { fontSize: 14, marginBottom: 18 },
  changePhotoBtn: {
    borderWidth: 1.5,
    borderRadius: 20,
    paddingHorizontal: 22,
    paddingVertical: 8,
  },
  changePhotoText: { fontSize: 13, fontWeight: "700" },

  card: {
    borderRadius: 18,
    paddingHorizontal: 16,
    paddingVertical: 4,
    marginBottom: 18,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.09,
    shadowRadius: 12,
    elevation: 3,
  },
  optionRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
  },
  iconBox: {
    width: 38,
    height: 38,
    borderRadius: 11,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },
  optionIcon: { fontSize: 18 },
  optionLabel: { flex: 1, fontSize: 15, fontWeight: "600" },
  chevron: { fontSize: 24, fontWeight: "300" },

  logoutBtn: {
    borderWidth: 1.5,
    borderRadius: 14,
    paddingVertical: 15,
    alignItems: "center",
    marginBottom: 14,
  },
  logoutText: { fontWeight: "700", fontSize: 15, letterSpacing: 0.4 },
  version: { textAlign: "center", fontSize: 12, marginTop: 2 },

  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
    justifyContent: "flex-end",
  },
  bottomSheet: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
    paddingBottom: 34,
  },
  sheetHandle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    alignSelf: "center",
    marginBottom: 16,
  },
  sheetTitle: {
    textAlign: "center",
    fontWeight: "700",
    fontSize: 13,
    letterSpacing: 0.8,
    textTransform: "uppercase",
    marginBottom: 12,
  },
  sheetOption: {
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  sheetOptionText: {
    fontSize: 16,
    textAlign: "center",
    fontWeight: "500",
  },
  sheetCancel: {
    paddingVertical: 16,
  },
  sheetCancelText: {
    fontSize: 16,
    textAlign: "center",
    fontWeight: "700",
  },
});

export default ProfileScreen;
import React from 'react';
import { View, Text, Button, TouchableOpacity, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { setId } from '../Redux/Slices/profileid';

const Profile = () => {
  const dispatch = useDispatch();

  // الحصول على الـ profile ID الحالي من الـ state
  const profileId = useSelector((state) => state.profileReducer.id);

  // دالة لتحديث الـ profile ID
  const updateProfileId = () => {
    dispatch(setId(123)); // إرسال أكشن لتحديث الـ profile ID
  };
alert(profileId)
  return (
    <View style={styles.container}>
      <Text style={styles.title}>صفحة البروفايل</Text>
      <Text style={styles.profileText}>رقم البروفايل الحالي: {profileId}</Text>

      {/* يمكنك استخدام إما TouchableOpacity أو Button حسب تفضيلك */}
      <TouchableOpacity onPress={updateProfileId} style={styles.button}>
        <Text style={styles.buttonText}>تحديث رقم البروفايل</Text>
      </TouchableOpacity>

      {/* أو يمكنك استخدام Button */}
      {/* <Button title="تحديث رقم البروفايل" onPress={updateProfileId} /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  profileText: {
    fontSize: 18,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default Profile;

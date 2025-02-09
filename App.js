import React, { useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity, ImageBackground } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function App() {
  const [workouts, setWorkouts] = useState([]);
  const [newWorkout, setNewWorkout] = useState("");
  const [newTime, setNewTime] = useState("");
  const [newCalories, setNewCalories] = useState("");
  const [selectedWorkoutType, setSelectedWorkoutType] = useState("Cardio");

  const handleDeleteWorkout = (id) => {
    setWorkouts(workouts.filter((workout) => workout.id !== id));
  };

  // Prevent user from adding empty entries
  const handleSubmit = () => {
    if (newWorkout.trim() === "" || newTime.trim() === "" || newCalories.trim() === "") return;

    setWorkouts([...workouts, {
      id: Date.now(),
      text: newWorkout,
      type: selectedWorkoutType,
      time: newTime,
      calories: newCalories,
      completed: false
    }]);

    setNewWorkout("");
    setNewTime("");
    setNewCalories("");
  };

  const handleToggleCompleted = (id) => {
    setWorkouts(
      workouts.map((workout) =>
        workout.id === id ? { ...workout, completed: !workout.completed } : workout
      )
    );
  };

  return (
    <ImageBackground source={{ uri: 'https://wallpapercave.com/wp/wp11588672.jpg' }} style={styles.background}>
      <SafeAreaView style={styles.safe}>
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.overlay} />

          <View style={styles.inputContainer}>
            <TextInput
              value={newWorkout}
              onChangeText={setNewWorkout}
              placeholder="Enter Workout Exercise"
              style={styles.input}
            />
            <TextInput
              value={newTime}
              onChangeText={setNewTime}
              placeholder="Enter Duration (e.g., 60 mins)"
              style={styles.input}
              keyboardType="numeric"
            />
            <TextInput
              value={newCalories}
              onChangeText={setNewCalories}
              placeholder="Enter Calories Burned"
              style={styles.input}
              keyboardType="numeric"
            />
            {/* Picker so user can choose if it was a Cardio, HIIT or Strength Workout */}
            <Picker
              selectedValue={selectedWorkoutType}
              onValueChange={(itemValue) => setSelectedWorkoutType(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="Cardio" value="Cardio" />
              <Picker.Item label="HIIT" value="HIIT" />
              <Picker.Item label="Strength" value="Strength" />
            </Picker>

            <TouchableOpacity onPress={handleSubmit} style={styles.button}>
              <Text style={styles.buttonText}>Add Workout</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.listContainer}>
            {workouts.map((workout) => (
              <View style={styles.workoutContainer} key={workout.id}>
                <TouchableOpacity onPress={() => handleToggleCompleted(workout.id)}>
                  <Text style={[styles.workoutText, workout.completed && styles.completedText]}>
                    {workout.text} ({workout.type}) - {workout.time} mins - {workout.calories} cal {/* Added the picker results to the list  */}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleDeleteWorkout(workout.id)}>
                  <Icon name="delete" size={29} color="white" />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  safe: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 80,
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    backgroundColor: 'white',
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    marginBottom: 10,
  },
  picker: {
    backgroundColor: 'white',
    marginBottom: 20,
    fontSize: 14,
  },
  button: {
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  listContainer: {
    marginTop: 50,
  },
  workoutContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  workoutText: {
    fontSize: 16,
    color: 'white',
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#999',
  },
});


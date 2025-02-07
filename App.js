import React, { useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet, TextInput, Button, ScrollView, TouchableOpacity, ImageBackground } from 'react-native';

export default function App() {

  const [workouts, setWorkouts] = useState([]);
  const [newWorkout, setNewWorkout] = useState("");

  const handleDeleteWorkout = (id) => {
    setWorkouts(workouts.filter((workout) => workout.id !== id));
  };
// Prevent user from adding empty entries
  const handleSubmit = () => {
    if (newWorkout.trim() === "") return;
    setWorkouts([...workouts, { id: Date.now(), text: newWorkout, completed: false }]);
    setNewWorkout("");
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
          <View style={styles.inputContainer}>
            <TextInput
              value={newWorkout}
              onChangeText={setNewWorkout}
              placeholder="Enter Workout Exercise"
              style={styles.input}
            />
            <TouchableOpacity onPress={handleSubmit} style={styles.button}>
              <Text style={styles.buttonText}>Add Workout</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.listContainer}>
            {workouts.map((workout) => (
              <View style={styles.workoutContainer} key={workout.id}>
                <TouchableOpacity onPress={() => handleToggleCompleted(workout.id)}>
                  <Text style={[styles.workoutText, workout.completed && styles.completedText]}>
                    {workout.text}
                  </Text>
                </TouchableOpacity>
                <Button
                  onPress={() => handleDeleteWorkout(workout.id)}
                  title="Delete"
                  color="#841584"
                  accessibilityLabel="Delete workout exercise"
                />
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
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#999',
  },
});




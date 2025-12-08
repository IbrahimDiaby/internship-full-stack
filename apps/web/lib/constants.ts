const fakeData = {
  "program_name": "4-Week Weight Loss Program",
  "description": "Intermediate level bodyweight program focused on fat loss with 4 sessions per week, 45 minutes each",
  "total_weeks": 4,
  "workout_days": [
    {
      "day": 1,
      "focus_area": "Full Body Strength",
      "duration_minutes": 45,
      "equipment": ["bodyweight"],
      "warmup": [
        "Jumping jacks - 2 minutes",
        "Arm circles - 1 minute",
        "Leg swings - 1 minute",
        "Dynamic stretching - 2 minutes"
      ],
      "exercises": [
        {
          "name": "Push-ups",
          "sets": 3,
          "reps": "12-15",
          "rest_seconds": 60,
          "notes": "Keep core tight and body in straight line"
        },
        {
          "name": "Bodyweight Squats",
          "sets": 4,
          "reps": "15-20",
          "rest_seconds": 60,
          "notes": "Push through heels, chest up"
        },
        {
          "name": "Plank Hold",
          "sets": 3,
          "reps": "30-45 seconds",
          "rest_seconds": 45,
          "notes": "Maintain neutral spine"
        },
        {
          "name": "Walking Lunges",
          "sets": 3,
          "reps": "10 each leg",
          "rest_seconds": 60,
          "notes": "Keep front knee over ankle"
        },
        {
          "name": "Mountain Climbers",
          "sets": 3,
          "reps": "20-30",
          "rest_seconds": 45,
          "notes": "Fast pace for cardio benefit"
        },
        {
          "name": "Tricep Dips (using chair)",
          "sets": 3,
          "reps": "10-12",
          "rest_seconds": 60,
          "notes": "Keep elbows close to body"
        }
      ],
      "cooldown": [
        "Standing quad stretch - 1 minute each leg",
        "Hamstring stretch - 1 minute each leg",
        "Shoulder stretch - 1 minute",
        "Deep breathing - 2 minutes"
      ],
      "estimated_calories": 320
    },
    {
      "day": 2,
      "focus_area": "Cardio & Core",
      "duration_minutes": 45,
      "equipment": ["bodyweight"],
      "warmup": [
        "Light jogging in place - 3 minutes",
        "Hip circles - 1 minute",
        "Torso twists - 1 minute",
        "Cat-cow stretches - 1 minute"
      ],
      "exercises": [
        {
          "name": "Burpees",
          "sets": 4,
          "reps": "10-12",
          "rest_seconds": 90,
          "notes": "Full range of motion, land softly"
        },
        {
          "name": "Bicycle Crunches",
          "sets": 3,
          "reps": "20 each side",
          "rest_seconds": 45,
          "notes": "Focus on rotation"
        },
        {
          "name": "Jump Squats",
          "sets": 3,
          "reps": "12-15",
          "rest_seconds": 75,
          "notes": "Explosive movement, soft landing"
        },
        {
          "name": "Russian Twists",
          "sets": 3,
          "reps": "20 each side",
          "rest_seconds": 45,
          "notes": "Keep feet elevated for more challenge"
        },
        {
          "name": "High Knees",
          "sets": 4,
          "reps": "30 seconds",
          "rest_seconds": 60,
          "notes": "As fast as possible"
        },
        {
          "name": "Plank to Down Dog",
          "sets": 3,
          "reps": "12-15",
          "rest_seconds": 45,
          "notes": "Smooth controlled movement"
        }
      ],
      "cooldown": [
        "Child's pose - 2 minutes",
        "Lying spinal twist - 1 minute each side",
        "Cobra stretch - 1 minute",
        "Full body stretch - 2 minutes"
      ],
      "estimated_calories": 380
    },
    {
      "day": 3,
      "focus_area": "Lower Body Power",
      "duration_minutes": 45,
      "equipment": ["bodyweight"],
      "warmup": [
        "Leg swings forward/back - 1 minute each leg",
        "Leg swings side to side - 1 minute each leg",
        "Ankle circles - 1 minute",
        "Glute bridges - 2 minutes"
      ],
      "exercises": [
        {
          "name": "Single Leg Deadlifts",
          "sets": 3,
          "reps": "10-12 each leg",
          "rest_seconds": 60,
          "notes": "Focus on balance and control"
        },
        {
          "name": "Bulgarian Split Squats",
          "sets": 3,
          "reps": "12 each leg",
          "rest_seconds": 75,
          "notes": "Rear foot elevated on chair"
        },
        {
          "name": "Wall Sit",
          "sets": 3,
          "reps": "45-60 seconds",
          "rest_seconds": 60,
          "notes": "Thighs parallel to ground"
        },
        {
          "name": "Calf Raises",
          "sets": 4,
          "reps": "20-25",
          "rest_seconds": 45,
          "notes": "Full range of motion"
        },
        {
          "name": "Side Lunges",
          "sets": 3,
          "reps": "12 each side",
          "rest_seconds": 60,
          "notes": "Keep chest up and core engaged"
        },
        {
          "name": "Glute Bridge Pulses",
          "sets": 3,
          "reps": "20-25",
          "rest_seconds": 45,
          "notes": "Squeeze glutes at top"
        }
      ],
      "cooldown": [
        "Pigeon pose - 2 minutes each side",
        "Seated forward fold - 2 minutes",
        "Figure-4 stretch - 1 minute each side",
        "Standing calf stretch - 1 minute each leg"
      ],
      "estimated_calories": 340
    },
    {
      "day": 4,
      "focus_area": "Upper Body & HIIT",
      "duration_minutes": 45,
      "equipment": ["bodyweight"],
      "warmup": [
        "Arm swings - 2 minutes",
        "Wrist circles - 1 minute",
        "Push-up position holds - 1 minute",
        "Shoulder rolls - 1 minute"
      ],
      "exercises": [
        {
          "name": "Diamond Push-ups",
          "sets": 3,
          "reps": "8-10",
          "rest_seconds": 60,
          "notes": "Targets triceps more"
        },
        {
          "name": "Pike Push-ups",
          "sets": 3,
          "reps": "10-12",
          "rest_seconds": 60,
          "notes": "Targets shoulders"
        },
        {
          "name": "Commandos",
          "sets": 3,
          "reps": "10-12",
          "rest_seconds": 75,
          "notes": "From plank to high plank and back"
        },
        {
          "name": "Superman Hold",
          "sets": 3,
          "reps": "30-45 seconds",
          "rest_seconds": 45,
          "notes": "Strengthen lower back"
        },
        {
          "name": "Inchworms",
          "sets": 3,
          "reps": "10-12",
          "rest_seconds": 60,
          "notes": "Walk hands out and back"
        },
        {
          "name": "Speed Skaters",
          "sets": 4,
          "reps": "20 each side",
          "rest_seconds": 60,
          "notes": "Lateral explosive movement"
        }
      ],
      "cooldown": [
        "Chest stretch doorway - 1 minute",
        "Overhead tricep stretch - 1 minute each arm",
        "Cross-body shoulder stretch - 1 minute each arm",
        "Neck stretches - 2 minutes"
      ],
      "estimated_calories": 350
    }
  ]
}

const EquipmentIcons: Record<string, string> = {
  bodyweight: "🤸",
  dumbbells: "🏋️",
  barbell: "💪",
  resistance_bands: "🎗️",
  kettlebell: "⚫",
  pull_up_bar: "🏃",
  bench: "🪑",
  machine: "⚙️"
};

export { fakeData, EquipmentIcons };

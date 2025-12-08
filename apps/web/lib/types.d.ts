interface Program {
  program_name: string;
  description: string;
  total_weeks: number;
  workout_days: WorkoutPlan[];
}

interface WorkoutPlan {
    day: number;
    focus_area: string;
    duration_minutes: number;
    equipment: string[];
    warmup: string[];
    exercises: Exercise[];
    cooldown: string[];
    estimated_calories: number;
}

interface Exercise {
    name: string;
    sets: number;
    reps: string;
    rest_seconds: number;
    notes: string;
}

export {
    WorkoutPlan,
    Exercise,
    Seance,
    Program
}


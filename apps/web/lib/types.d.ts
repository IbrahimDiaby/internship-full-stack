interface Exercise {
    id: string;
    name: string;
    sets: string;
    reps: number;
}

interface Workout {
    id: string;
    day: Day;
    summary: string;
    exercises: Array<Exercise>;
    calories: string;
}

export {
    Workout
}
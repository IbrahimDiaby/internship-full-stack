from pydantic import BaseModel, EmailStr, Field
from datetime import datetime
from typing import List, Optional
from enum import Enum


class UserRequestSchema(BaseModel):
    email: EmailStr = Field(description="User Email")
    password: str = Field("", description="User Password")


class UserResponseSchema(BaseModel):
    id: str = Field("", description="User ID")
    email: str= Field("", description="User Email")
    created_at: datetime = Field(description="User Creation Date")

    class Config:
        from_attributes = True


class TokenSchema(BaseModel):
    access_token: str = Field("", description="User Token")
    token_type: str = Field("bearer", description="User Token Type")


class EquipmentType(str, Enum):
    BODYWEIGHT = "bodyweight"
    DUMBBELLS = "dumbbells"
    BARBELL = "barbell"
    RESISTANCE_BANDS = "resistance_bands"
    KETTLEBELL = "kettlebell"
    PULL_UP_BAR = "pull_up_bar"
    BENCH = "bench"
    MACHINE = "machine"


class ExerciseSchema(BaseModel):
    name: str = Field("", description="Exercise name")
    sets: int = Field("", ge=1, description="Number of sets")
    reps: str = Field("", description="Reps per set (can be range like '8-12')")
    rest_seconds: int = Field("", ge=0, description="Rest time in seconds")
    notes: Optional[str] = Field(None, description="Additional instructions")


class WorkoutDaySchema(BaseModel):
    day: int = Field("", ge=1, description="Day number")
    focus_area: str = Field("", description="Primary focus (e.g., 'Upper Body', 'Cardio')")
    duration_minutes: int = Field("", ge=5, description="Total workout duration")
    equipment: List[EquipmentType] = Field("", description="Required equipment")
    warmup: List[str] = Field("", description="Warmup exercises")
    exercises: List[ExerciseSchema] = Field("", min_length=1, description="Main exercises")
    cooldown: List[str] = Field("", description="Cooldown exercises")
    estimated_calories: int = Field("", ge=0, description="Estimated calories burned")


class ProgramRequestSchema(BaseModel):
    text: str = Field("", min_length=10, max_length=2000, description="Free-form workout goals")


class ProgramResponseSchema(BaseModel):
    program_name: str = Field("", description="Generated program name")
    description: str = Field("", description="Brief program description")
    workout_days: List[WorkoutDaySchema] = Field("", min_length=1, description="Workout schedule")
    total_weeks: int = Field(default=4, ge=1, description="Program duration in weeks")


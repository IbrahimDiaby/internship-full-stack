import json
import os
from typing import Dict
from openai import OpenAI
from dotenv import load_dotenv
from fastapi import HTTPException, status
from models.schemas import ProgramRequestSchema, ProgramResponseSchema

load_dotenv()

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
MODEL = "gpt-5-minI"
MAX_RETRIES = 3

SYSTEM_PROMPT = """You are an expert fitness coach AI. Generate a structured workout program based on user input.

Rules:
1. Parse user's goals, fitness level, available time, equipment or not, and constraints
2. Create a balanced program with appropriate progression
3. Include proper warmup and cooldown for each session
4. Estimate realistic calorie burn based on intensity and duration
5. Use equipment specified or default to bodyweight if none mentioned
6. Adapt difficulty to stated fitness level (beginner/intermediate/advanced)
7. If user specifies sessions per week, create that many workout days
8. Each workout should fit within the specified duration

Output ONLY valid JSON matching this exact structure:
{
  "program_name": "string",
  "description": "string",
  "total_weeks": number,
  "workout_days": [
    {
      "day": number,
      "focus_area": "string",
      "duration_minutes": number,
      "equipment": "["bodyweight", "dumbbells", etc.] or null",
      "warmup": ["exercise1", "exercise2"],
      "exercises": [
        {
          "name": "string",
          "sets": number,
          "reps": "string",
          "rest_seconds": number,
          "notes": "string or null"
        }
      ],
      "cooldown": ["exercise1", "exercise2"],
      "estimated_calories": number
    }
  ]
}

Valid equipment types: bodyweight, dumbbells, barbell, resistance_bands, kettlebell, pull_up_bar, bench, machine

Important:
- Day numbers should be sequential (1, 2, 3, 4, etc.)
- Sets must be positive integers
- Reps can be ranges like "8-12" or numbers like "10"
- Rest time in seconds (typically 30-120)
- Estimated calories should be realistic for the duration and intensity
- Always include at least 2 warmup and 2 cooldown exercises
- Include at least 4-6 main exercises per workout"""


def validate_program_structure(data: Dict) -> ProgramResponseSchema:
    try:
        return ProgramResponseSchema(**data)
    except Exception as e:
        raise ValueError(f"Invalid program structure: {str(e)}")


def generate_workout_program(request: ProgramRequestSchema) -> ProgramResponseSchema:
    if not os.getenv("OPENAI_API_KEY"):
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="OpenAI API key not configured"
        )

    for attempt in range(MAX_RETRIES):
        try:
            response = client.chat.completions.create(
                model=MODEL,
                messages=[
                    {"role": "system", "content": SYSTEM_PROMPT},
                    {"role": "user", "content": f"Generate a workout program for: {request.text}"}
                ],
                response_format={"type": "json_object"},
                temperature=0.7,
                max_tokens=2500
            )

            content = response.choices[0].message.content
            program_data = json.loads(content)

            validated_program = validate_program_structure(program_data)

            return validated_program

        except json.JSONDecodeError as e:
            print(f"Attempt {attempt + 1}: JSON decode error - {str(e)}")
            if attempt == MAX_RETRIES - 1:
                raise HTTPException(
                    status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                    detail=f"Failed to parse AI response after {MAX_RETRIES} attempts"
                )
            continue

        except ValueError as e:
            print(f"Attempt {attempt + 1}: Validation error - {str(e)}")
            if attempt == MAX_RETRIES - 1:
                raise HTTPException(
                    status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                    detail=f"Invalid program structure: {str(e)}"
                )
            continue

        except Exception as e:
            print(f"Attempt {attempt + 1}: Unexpected error - {str(e)}")
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Error generating program: {str(e)}"
            )

    raise HTTPException(
        status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        detail="Failed to generate valid program after maximum retries"
    )
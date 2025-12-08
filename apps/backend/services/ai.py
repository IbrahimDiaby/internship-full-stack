import json
import os
from typing import Dict
from openai import OpenAI
from fastapi import HTTPException, status
from models.schemas import ProgramRequestSchema, ProgramResponseSchema
from config.ai import CONFIG_AI

CONFIG_AI = CONFIG_AI()

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

    for attempt in range(CONFIG_AI.MAX_RETRIES):
        try:
            response = CONFIG_AI.client.chat.completions.create(
                model=CONFIG_AI.MODEL,
                messages=[
                    {"role": "system", "content": CONFIG_AI.SYSTEM_PROMPT},
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
            if attempt == CONFIG_AI.MAX_RETRIES - 1:
                raise HTTPException(
                    status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                    detail=f"Failed to parse AI response after {CONFIG_AI.MAX_RETRIES} attempts"
                )
            continue

        except ValueError as e:
            print(f"Attempt {attempt + 1}: Validation error - {str(e)}")
            if attempt == CONFIG_AI.MAX_RETRIES - 1:
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

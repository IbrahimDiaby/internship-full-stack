from fastapi import APIRouter, Depends, HTTPException, status
from models.schemas import ProgramRequestSchema, ProgramResponseSchema, UserResponseSchema
from services.auth import get_current_user
from services.ai import generate_workout_program

ai_router = APIRouter(
    prefix="/api/ai",
    tags=["ai"]
)


@ai_router.post(
    "/program",
    summary="Generate AI workout program",
    description="Generate a structured workout program from free-form text using AI",
    response_model=ProgramResponseSchema,
    status_code=status.HTTP_200_OK
)
def create_program(
        request: ProgramRequestSchema,
        current_user: UserResponseSchema = Depends(get_current_user)
):
    try:
        program = generate_workout_program(request)
        return program
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Unexpected error: {str(e)}"
        )
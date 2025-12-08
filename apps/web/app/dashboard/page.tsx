"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Workout } from "@/lib/types";
import { fakeData } from "@/lib/constants";
import jwt from "jsonwebtoken";
import { logout } from "@/lib/functions";
import { useEffect } from "react";
import { redirect } from "next/navigation";

export default function GenerateProgramPage() {
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false);
  const [workouts, setWorkouts] = useState<Array<Workout>>([...fakeData]);

  const token = localStorage.getItem("token") ?? "";
  useEffect(() => {
    if (token === "") redirect("/auth");
  }, [token]);

  const payload = jwt.decode(token!);
  const user = {
    email: payload?.sub,
    user_id: payload?.user_id,
  };

  const handleGenerate = async () => {
    setLoading(true);
    setWorkouts([]);

    const response = await fetch("/api/ai/generate-program", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: inputText }),
    });

    const data = await response.json();
    setWorkouts(data.days || []);
    setLoading(false);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1>
          Connected : <span className="font-bold">{user?.email}</span>
        </h1>
        <button
          className="cursor-pointer bg-red-500 hover:bg-red-400 transition delay-75 duration-500 p-2 text-white font-bold rounded-2xl"
          onClick={() => logout()}
        >
          Déconnexion
        </button>
      </div>
      <h1 className="text-3xl font-bold">
        Generate Your Perfect Sport Program
      </h1>

      <textarea
        className="w-full h-40 p-4 border rounded-xl"
        placeholder="Describe your goals, constraints, equipment, availability, and fitness level..."
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      />

      <Button
        onClick={handleGenerate}
        disabled={loading}
        className="w-full text-lg p-4 rounded-2xl shadow-md"
      >
        {loading ? "Generating..." : "Generate"}
      </Button>

      <div className="grid grid-cols-1 gap-4">
        {workouts.map((day, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="rounded-2xl shadow">
              <CardContent className="p-4 space-y-2">
                <div className="flex flex-wrap items-center justify-between">
                  <h2 className="text-xl font-semibold">Day {idx + 1}</h2>
                  <span className="transition duration-500 delay-0 text-balance bg-black text-white hover:bg-slate-300 hover:text-black hover:shadow-sm hover:shadow-slate-500 font-bold rounded-xl py-1 px-4">
                    Calorie : {day.calories}
                  </span>
                </div>
                <p className="text-gray-600">{day.summary}</p>

                <ul className="list-disc list-inside space-y-1">
                  {day.exercises?.map((ex, i) => (
                    <li key={i}>
                      <span className="font-medium">{ex.name}:</span> {ex.sets}{" "}
                      sets <span className="font-bold">x</span> {ex.reps}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

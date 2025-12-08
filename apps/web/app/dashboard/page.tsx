"use client";
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import jwt from "jsonwebtoken";
import { redirect } from "next/navigation";
import { logout } from "@/lib/functions";
import { 
  Dumbbell, 
  Clock, 
  Flame, 
  Download, 
  RefreshCw, 
  Zap,
  Timer,
  Activity
} from "lucide-react";
import { Program } from "@/lib/types";
import { EquipmentIcons, fakeData } from "@/lib/constants";

export default function GenerateProgramPage() {
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false);
  const [program, setProgram] = useState<Program | null>({...fakeData});
  const [error, setError] = useState("");
  const [token, setToken] = useState<string>("");

  useEffect(() => {
    const storedToken = localStorage.getItem("token") ?? "";
    if (storedToken === "") {
      redirect("/auth");
    }
    setToken(storedToken);
  }, []);

  const payload = token ? jwt.decode(token) as any : null;
  const user = payload ? {
    email: payload?.sub,
    user_id: payload?.user_id,
  } : null;

  const handleGenerate = async () => {
    if (!inputText.trim()) {
      setError("Please enter your workout goals");
      return;
    }

    setLoading(true);
    setError("");
    setProgram(null);

    try {
      const response = await fetch("/api/ai/generate-program", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ text: inputText }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Failed to generate program");
      }

      const data = await response.json();
      console.log(data)
      setProgram(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRegenerate = () => {
    handleGenerate();
  };

  const downloadJSON = () => {
    if (!program) return;

    const dataStr = JSON.stringify(program, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `workout-program-${Date.now()}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        <div className="flex justify-between items-center bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-sm">
          <div className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-green-600" />
            <span className="text-sm text-gray-600 dark:text-gray-300">
              Connected as: <span className="font-bold text-gray-900 dark:text-white">{user?.email}</span>
            </span>
          </div>
          <Button
            onClick={() => logout()}
            variant="destructive"
            className="font-bold cursor-pointer rounded-xl hover:bg-amber-600 transition delay-75 duration-500"
          >
            Logout
          </Button>
        </div>

        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2 flex items-center justify-center gap-3">
            <Dumbbell className="w-10 h-10 text-green-600" />
            AI Workout Program Generator
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Describe your goals and let AI create your perfect workout plan
          </p>
        </div>

        <Card className="rounded-2xl shadow-lg border-0 bg-white dark:bg-slate-800">
          <CardContent className="p-6 space-y-4">
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
              Describe Your Workout Goals
            </label>
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Example: I want to lose weight, 4 sessions/week, 45 min each, no dumbbells, intermediate level"
              className="w-full h-32 p-4 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-slate-700 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
            />

            {error && (
              <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-600 dark:text-red-400 text-sm">
                {error}
              </div>
            )}

            <Button
              onClick={handleGenerate}
              disabled={loading}
              className="w-full text-lg py-6 rounded-xl bg-linear-to-r from-green-600 to-orange-600 hover:from-green-700 hover:to-orange-700 shadow-lg"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Zap className="w-5 h-5 mr-2" />
                  Generate Program
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {program && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >

            <Card className="rounded-2xl shadow-lg border-0 bg-linear-to-r from-green-600 to-orange-600 text-white">
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-3xl font-bold mb-2">{program.program_name}</h2>
                    <p className="text-green-100 mb-2">{program.description}</p>
                    <p className="text-sm text-green-200">
                      Duration: {program.total_weeks} weeks • {program.workout_days.length} workouts per week
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      onClick={handleRegenerate}
                      variant="secondary"
                      size="icon"
                      className="rounded-lg bg-white/20 hover:bg-white/30 text-white border-0"
                      title="Re-generate"
                    >
                      <RefreshCw className="w-5 h-5" />
                    </Button>
                    <Button
                      onClick={downloadJSON}
                      variant="secondary"
                      size="icon"
                      className="rounded-lg bg-white/20 hover:bg-white/30 text-white border-0"
                      title="Download JSON"
                    >
                      <Download className="w-5 h-5" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {program.workout_days
                .sort((a, b) => a.day - b.day)
                .map((day, idx) => (
                  <motion.div
                    key={day.day}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    <Card className="rounded-2xl shadow-lg border-0 hover:shadow-xl transition-shadow bg-white dark:bg-slate-800 h-full">
                      <CardContent className="p-6 space-y-4">

                        <div>
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                              Day {day.day}
                            </h3>
                            <span className="bg-linear-to-r from-green-600 to-orange-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                              {day.focus_area}
                            </span>
                          </div>

                          <div className="flex gap-4 text-sm text-gray-600 dark:text-gray-400">
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {day.duration_minutes} min
                            </div>
                            <div className="flex items-center gap-1">
                              <Flame className="w-4 h-4 text-orange-500" />
                              ~{day.estimated_calories} cal
                            </div>
                          </div>

                          <div className="flex gap-2 mt-3 flex-wrap">
                            {day.equipment.map((eq) => (
                              <span
                                key={eq}
                                className="text-2xl"
                                title={eq.replace("_", " ")}
                              >
                                {EquipmentIcons[eq] || "🏃"}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                          <h4 className="text-sm font-semibold text-green-600 dark:text-green-400 mb-2 flex items-center gap-1">
                            <Activity className="w-4 h-4" />
                            Warmup
                          </h4>
                          <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                            {day.warmup.map((ex, i) => (
                              <li key={i} className="flex items-start gap-2">
                                <span className="text-green-500 mt-1">•</span>
                                <span>{ex}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                          <h4 className="text-sm font-semibold text-orange-600 dark:text-orange-400 mb-2 flex items-center gap-1">
                            <Dumbbell className="w-4 h-4" />
                            Exercises
                          </h4>
                          <div className="space-y-3">
                            {day.exercises.map((ex, i) => (
                              <div
                                key={i}
                                className="bg-gray-50 dark:bg-slate-700 rounded-lg p-3"
                              >
                                <div className="font-semibold text-gray-900 dark:text-white text-sm mb-1">
                                  {ex.name}
                                </div>
                                <div className="text-xs text-gray-600 dark:text-gray-400 flex items-center gap-3">
                                  <span className="font-medium">
                                    {ex.sets} sets × {ex.reps} reps
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <Timer className="w-3 h-3" />
                                    {ex.rest_seconds}s rest
                                  </span>
                                </div>
                                {ex.notes && (
                                  <div className="text-xs text-gray-500 dark:text-gray-500 mt-1 italic">
                                    💡 {ex.notes}
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                          <h4 className="text-sm font-semibold text-green-600 dark:text-green-400 mb-2">
                            Cooldown
                          </h4>
                          <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                            {day.cooldown.map((ex, i) => (
                              <li key={i} className="flex items-start gap-2">
                                <span className="text-green-500 mt-1">•</span>
                                <span>{ex}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
            </div>
          </motion.div>
        )}

        {!program && !loading && (
          <div className="text-center py-16">
            <Dumbbell className="w-20 h-20 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              Enter your goals above to generate your custom workout program
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
"use client";

import { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import ThankYouStep from "./ThankYouStep";

interface Preference {
  key: string;
  label: string;
  enabled: boolean;
}

const INITIAL_PREFERENCES: Preference[] = [
  { key: "wikipedia_births", label: "Births in History", enabled: false },
  { key: "wikipedia_deaths", label: "Deaths in History", enabled: false },
  { key: "wikipedia_holidays", label: "Special Days", enabled: false },
  { key: "numbers_api_trivia", label: "Number Facts", enabled: false },
  { key: "numbers_api_date", label: "Date Facts", enabled: false },
  { key: "joke_api", label: "Daily Joke", enabled: false },
  { key: "dog_api", label: "Dog Picture", enabled: false },
  { key: "cat_api", label: "Cat Picture", enabled: false },
  { key: "quote_api", label: "Daily Quote", enabled: false },
  { key: "affirmation_api", label: "Daily Affirmation", enabled: false },
  { key: "cocktail_api", label: "Cocktail Recipe", enabled: false },
];

export default function RegistrationStep() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [showOtp, setShowOtp] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [preferences, setPreferences] =
    useState<Preference[]>(INITIAL_PREFERENCES);

  const handleSubmitEmail = async () => {
    try {
      if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        return toast.error("Please enter a valid email address");
      }

      setIsLoading(true);
      const response = await fetch(
        "https://daily-mail-be.onrender.com/api/register/initiate",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      // Mevcut kullanıcı tercihleri varsa güncelle
      if (data.isExistingUser && data.preferences) {
        // Önce section_order'a göre sıralanmış yeni bir preferences array'i oluştur
        const orderedPreferences = data.preferences.section_order.map(
          (key: string) => {
            const initialPref = INITIAL_PREFERENCES.find(
              (p: Preference) => p.key === key
            );
            return {
              ...initialPref,
              enabled: data.preferences[key] || false,
            };
          }
        );

        // Eğer INITIAL_PREFERENCES'da olup section_order'da olmayan itemler varsa
        // onları da sona ekle
        INITIAL_PREFERENCES.forEach((pref: Preference) => {
          if (!orderedPreferences.find((p: Preference) => p.key === pref.key)) {
            orderedPreferences.push({
              ...pref,
              enabled: data.preferences[pref.key] || false,
            });
          }
        });

        setPreferences(orderedPreferences);
      }

      toast.success("Verification code sent to your email");
      setShowOtp(true);
    } catch (error) {
      console.error("Error:", error);
      toast.error("Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleComplete = async () => {
    try {
      if (!otp) {
        return toast.error("Please enter verification code");
      }

      setIsLoading(true);
      const preferencesObj = INITIAL_PREFERENCES.reduce((acc, pref) => {
        const currentPref = preferences.find((p) => p.key === pref.key);
        return { ...acc, [pref.key]: currentPref?.enabled || false };
      }, {});

      // Tüm tercihler false ise unsubscribe flag'i ekle
      const isUnsubscribing = Object.values(preferencesObj).every(
        (value) => !value
      );

      const sectionOrder = preferences.map((pref) => pref.key);

      const response = await fetch(
        "https://daily-mail-be.onrender.com/api/register/complete",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            otp,
            preferences: preferencesObj,
            sectionOrder,
            isUnsubscribing,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      toast.success(
        isUnsubscribing
          ? "Successfully unsubscribed from all preferences"
          : "Registration completed successfully"
      );
      setTimeout(() => setIsCompleted(true), 1000);
    } catch (error) {
      console.error("Error:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const onDragEnd = (result: any) => {
    if (!result.destination) return;

    const items = Array.from(preferences);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setPreferences(items);
  };

  if (isCompleted) {
    return <ThankYouStep />;
  }

  return (
    <div className="space-y-6 sm:space-y-8 max-w-md mx-auto">
      <div className="space-y-4 sm:space-y-6">
        {!showOtp ? (
          <>
            <h2 className="text-xl sm:text-2xl font-bold text-center">
              Enter your email
            </h2>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="input flex-1"
                disabled={isLoading}
              />
              <button
                onClick={handleSubmitEmail}
                className="button whitespace-nowrap"
                disabled={isLoading}
              >
                {isLoading ? "Sending..." : "Continue"}
              </button>
            </div>
          </>
        ) : (
          <div className="space-y-6 sm:space-y-8">
            <div className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold text-center">
                Verify your email
              </h2>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter verification code"
                className="input"
              />
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <h3 className="text-lg sm:text-xl font-semibold">
                  Choose your preferences
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Drag and drop to reorder, toggle to enable/disable
                </p>
              </div>

              <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="preferences">
                  {(provided) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className="space-y-2"
                    >
                      {preferences.map((pref, index) => (
                        <Draggable
                          key={pref.key}
                          draggableId={pref.key}
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className={`drag-item ${
                                snapshot.isDragging ? "dragging" : ""
                              }`}
                            >
                              <span className="flex items-center gap-3">
                                <span className="drag-handle select-none">
                                  ⋮⋮
                                </span>
                                <span>{pref.label}</span>
                              </span>
                              <Switch
                                checked={pref.enabled}
                                onCheckedChange={(checked) => {
                                  const newPreferences = [...preferences];
                                  newPreferences[index].enabled = checked;
                                  setPreferences(newPreferences);
                                }}
                              />
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
            </div>

            <button
              onClick={handleComplete}
              className="button w-full"
              disabled={isLoading}
            >
              {isLoading ? "Completing..." : "Complete Registration"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

"use client"

import { Activity } from "@prisma/client"
import { X } from "lucide-react"
import { useState } from "react"
import createTrackRow from "@/actions/tracks/create-track-row"
import handleTrackChange from "@/actions/tracks/handle-track-change"
import revalidateTracks from "@/actions/tracks/revalidate"
import toast from "react-hot-toast"
import DisplayError from "@/utils/display-error"

interface MobileAddActivityModalProps {
  isOpen: boolean
  onClose: () => void
  activities: Activity[]
  selectedDate: Date
  from: Date
  to: Date
  existingActivityIds: string[]
}

export default function MobileAddActivityModal({
  isOpen,
  onClose,
  activities,
  selectedDate,
  from,
  to,
  existingActivityIds,
}: MobileAddActivityModalProps) {
  const [isAdding, setIsAdding] = useState(false)

  if (!isOpen) return null

  // Filter out activities that already have a TrackRow
  const availableActivities = activities.filter(
    (activity) => !existingActivityIds.includes(activity.id)
  )

  const handleSelectActivity = async (activityId: string) => {
    setIsAdding(true)

    try {
      // Create TrackRow for this activity
      const result = await createTrackRow(activityId, from)

      if ("error" in result) {
        if (typeof DisplayError === "function") {
          DisplayError(result.error)
        }
        setIsAdding(false)
        return
      }

      // Add initial 30 minutes (0.5h) for the selected date
      const trackResult = await handleTrackChange(
        result.trackRow.id,
        selectedDate,
        30 // 30 minutes = 0.5h
      )

      if ("error" in trackResult) {
        if (typeof DisplayError === "function") {
          DisplayError(trackResult.error)
        }
        setIsAdding(false)
        return
      }

      toast.success("Activity added")
      revalidateTracks()
      setIsAdding(false)
      onClose()
    } catch (error) {
      console.error("Error adding activity:", error)
      toast.error("Failed to add activity")
      setIsAdding(false)
    }
  }

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "rgba(0, 0, 0, 0.5)",
          zIndex: 100,
        }}
      />

      {/* Modal */}
      <div
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          background: "var(--surface)",
          borderTopLeftRadius: "20px",
          borderTopRightRadius: "20px",
          padding: "20px",
          paddingBottom: "calc(20px + env(safe-area-inset-bottom))",
          zIndex: 101,
          maxHeight: "70vh",
          overflow: "auto",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
          <h2 style={{ fontSize: "20px", fontWeight: 600, color: "var(--text)" }}>
            Add Activity
          </h2>
          <button
            onClick={onClose}
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "50%",
              border: "none",
              background: "var(--surface-inset)",
              color: "var(--text-soft)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
          >
            <X size={18} />
          </button>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {availableActivities.length === 0 && (
            <div
              style={{
                padding: "20px",
                textAlign: "center",
                color: "var(--text-muted)",
              }}
            >
              All activities have been added for this week
            </div>
          )}
          {availableActivities.map((activity) => (
            <button
              key={activity.id}
              onClick={() => handleSelectActivity(activity.id)}
              disabled={isAdding}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: "16px",
                background: "var(--surface)",
                border: "1px solid var(--surface-border)",
                borderRadius: "12px",
                cursor: "pointer",
                transition: "all 0.15s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "var(--surface-inset)"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "var(--surface)"
              }}
            >
              <div
                style={{
                  width: "12px",
                  height: "12px",
                  borderRadius: "50%",
                  background: activity.color,
                  flexShrink: 0,
                }}
              />
              <span style={{ fontSize: "16px", fontWeight: 500, color: "var(--text)" }}>
                {activity.name}
              </span>
            </button>
          ))}
        </div>
      </div>
    </>
  )
}

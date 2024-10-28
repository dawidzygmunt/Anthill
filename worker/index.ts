import { util } from "./util"

declare let self: ServiceWorkerGlobalScope

util()

let isSendDay = false
let isSendWeek = false
let isSendMonth = false

// Once a week notification
function calculateNextFriday16() {
  const now = new Date()
  const nextFriday = new Date()
  nextFriday.setDate(now.getDate() + ((5 - now.getDay() + 7) % 7)) // next Friday
  nextFriday.setHours(16, 0, 0, 0) // 16:00:00

  if (nextFriday < now) {
    nextFriday.setDate(nextFriday.getDate() + 7)
  }
  const timeToNextFriday = nextFriday.getTime() - now.getTime()

  return timeToNextFriday
}

// Once a month notification
function calculateTimeUntilEndOfMonth() {
  const now = new Date()
  const endOfMonth = new Date(
    now.getFullYear(),
    now.getMonth() + 1,
    0,
    16,
    0,
    0,
    0
  )

  return endOfMonth.getTime() - now.getTime()
}

function sendNotification(message: string) {
  self.registration.showNotification("Anthill v2", {
    body: message,
    icon: "/icon512_rounded.png",
  })
}

async function startInterval() {
  setInterval(
    () => {
      const timeToNextFriday = calculateNextFriday16()
      const timeToNextMonth = calculateTimeUntilEndOfMonth()

      // Week
      const timeWindowWeek = 1000 * 60 * 60 // 1 hour
      if (timeToNextFriday <= timeWindowWeek && !isSendWeek) {
        sendNotification("Fill your hours")
        isSendWeek = true
      } else if (timeToNextFriday > timeWindowWeek) {
        isSendWeek = false
      }

      // Month
      const timeWindowMonth = 1000 * 60 * 60 // 1 hour
      if (timeToNextMonth <= timeWindowMonth && !isSendMonth) {
        sendNotification("Fill your hours")
        isSendMonth = true
      } else if (timeToNextMonth > timeWindowMonth) {
        isSendMonth = false
      }
    },
    1000 * 60 * 5
  ) // 5 minutes
}

// Schedule notifications after Service Worker activation
self.addEventListener("install", function (event) {
  if (event) {
    event.waitUntil(self.skipWaiting())
  }
})

self.addEventListener("activate", function (event) {
  if (event) {
    event.waitUntil(self.clients.claim())
    startInterval() // Start notifications every 5 minutes
  }
})

export function requestNotificationPermission() {
  if (!("Notification" in window)) return Promise.resolve("unsupported");
  return Notification.requestPermission();
}

export function showNotification(title, body) {
  if (!("Notification" in window)) return;
  if (Notification.permission === "granted") {
    try {
      new Notification(title, { body });
    } catch (e) {
      console.warn("Notification impossible :", e);
    }
  }
}

export function getNotifPermission() {
  if (typeof Notification === "undefined") return "unsupported";
  return Notification.permission;
}

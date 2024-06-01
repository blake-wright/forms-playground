export function createNewEvent(eventName: string) {
  return new Event(eventName, { bubbles: true });
}

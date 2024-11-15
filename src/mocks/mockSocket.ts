type EventCallback = (...args: unknown[]) => void;

export class MockSocket {
  private connected: boolean = false;
  private watchedSeats: Set<string> = new Set();
  private listeners: Map<string, Set<EventCallback>> = new Map();

  constructor() {
    this.connect();
    this.startMockUpdates();
  }

  // 이벤트 리스너 추가
  on(event: string, callback: EventCallback) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }
    this.listeners.get(event)?.add(callback);
  }

  // 이벤트 리스너 제거
  off(event: string, callback: EventCallback) {
    this.listeners.get(event)?.delete(callback);
  }

  // 이벤트 발생
  emit(event: string, ...args: unknown[]) {
    if (
      event === "seat:watch" ||
      event === "seat:unwatch" ||
      event === "seat:reserve"
    ) {
      const [seatId] = args as [string];
      if (event === "seat:watch") {
        this.watchedSeats.add(seatId);
      } else if (event === "seat:unwatch") {
        this.watchedSeats.delete(seatId);
      } else if (event === "seat:reserve") {
        setTimeout(() => {
          this.emitEvent("seat:update", {
            seatId,
            status: "reserved",
            lastUpdated: new Date().toISOString(),
          });
        }, 500);
      }
    }
    this.emitEvent(event, ...args);
  }

  private emitEvent(event: string, ...args: unknown[]) {
    this.listeners.get(event)?.forEach((callback) => {
      callback(...args);
    });
  }

  connect() {
    setTimeout(() => {
      this.connected = true;
      this.emitEvent("connect");
    }, 1000);
  }

  disconnect() {
    this.connected = false;
    this.emitEvent("disconnect");
    this.watchedSeats.clear();
    this.listeners.clear();
  }

  private startMockUpdates() {
    setInterval(() => {
      this.watchedSeats.forEach((seatId) => {
        if (Math.random() > 0.7) {
          const statuses: ("available" | "temporary_hold" | "reserved")[] = [
            "available",
            "temporary_hold",
            "reserved",
          ];
          const randomStatus =
            statuses[Math.floor(Math.random() * statuses.length)];

          this.emitEvent("seat:update", {
            seatId,
            status: randomStatus,
            lastUpdated: new Date().toISOString(),
          });
        }
      });
    }, 3000);
  }
}

export const createMockSocket = () => new MockSocket();

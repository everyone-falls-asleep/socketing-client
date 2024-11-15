type EventCallback = (...args: unknown[]) => void;
type Listeners = Map<string, Set<EventCallback>>;

export const createMockSocket = () => {
  let connected = false;
  const watchedSeats = new Set<string>();
  const listeners: Listeners = new Map();

  const on = (event: string, callback: EventCallback) => {
    if (!listeners.has(event)) {
      listeners.set(event, new Set());
    }
    listeners.get(event)?.add(callback);
  };

  const off = (event: string, callback: EventCallback) => {
    listeners.get(event)?.delete(callback);
  };

  const emit = (event: string, ...args: unknown[]) => {
    if (
      [
        "seat:watch",
        "seat:unwatch",
        "seat:temporary_hold",
        "seat:reserve",
      ].includes(event)
    ) {
      const [seatId] = args as [string];
      if (event === "seat:watch") {
        watchedSeats.add(seatId);
      } else if (event === "seat:unwatch") {
        watchedSeats.delete(seatId);
      } else if (event === "seat:temporary_hold") {
        setTimeout(() => {
          emitEvent("seat:update", {
            seatId,
            status: "temporary_hold",
            lastUpdated: new Date().toISOString(),
          });
        }, 500);
      } else if (event === "seat:reserve") {
        setTimeout(() => {
          emitEvent("seat:update", {
            seatId,
            status: "reserved",
            lastUpdated: new Date().toISOString(),
          });
        }, 500);
      }
    }
    emitEvent(event, ...args);
  };

  const emitEvent = (event: string, ...args: unknown[]) => {
    listeners.get(event)?.forEach((callback) => {
      callback(...args);
    });
  };

  const connect = () => {
    setTimeout(() => {
      connected = true;
      emitEvent("connect");
    }, 1000);
  };

  const disconnect = () => {
    connected = false;
    emitEvent("disconnect");
    watchedSeats.clear();
    listeners.clear();
  };

  const startMockUpdates = () => {
    setInterval(() => {
      watchedSeats.forEach((seatId) => {
        if (Math.random() > 0.7) {
          const statuses: ("available" | "temporary_hold" | "reserved")[] = [
            "available",
            "temporary_hold",
            "reserved",
          ];
          const randomStatus =
            statuses[Math.floor(Math.random() * statuses.length)];

          emitEvent("seat:update", {
            seatId,
            status: randomStatus,
            lastUpdated: new Date().toISOString(),
          });
        }
      });
    }, 3000);
  };

  // 초기화 호출
  connect();
  startMockUpdates();

  return {
    on,
    off,
    emit,
    connect,
    disconnect,
    isConnected: () => connected,
  };
};

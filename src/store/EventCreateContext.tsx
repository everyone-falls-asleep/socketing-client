import React, { createContext, useContext, useState } from "react";
import { Contour } from "../types/components/common";
import { Event } from "../types/api/event";

interface EventCreateContextType {
  event: Event | null;
  setEvent: (event: Event) => void;
  contours: Contour[];
  selectedContour: number | null;
  setContours: React.Dispatch<React.SetStateAction<Contour[]>>;
  setSelectedContour: (id: number | null) => void;
  updateContourType: (id: number, type: "seat" | "area" | "polygon") => void;
  updateContourLabel: (id: number, label: string) => void;
  editMode: boolean;
  setEditMode: (mode: boolean) => void;
  selectedContours: number[];
  setSelectedContours: (id: number[]) => void;
  updateMultipleContours: (updates: Partial<Contour>) => void;
  isImageVisible: boolean;
  setIsImageVisible: (visible: boolean) => void;
  imageUrl: string | null;
  setImageUrl: (url: string | null) => void;
}

const EventCreateContext = createContext<EventCreateContextType | null>(null);

export const useEventCreate = () => {
  const context = useContext(EventCreateContext);
  if (!context) {
    throw new Error(
      "useEventCreate must be used within an EventCreateProvider"
    );
  }
  return context;
};

export const EventCreateProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [contours, setContours] = useState<Contour[]>([]);
  const [selectedContour, setSelectedContour] = useState<number | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [selectedContours, setSelectedContours] = useState<number[]>([]);
  const [isImageVisible, setIsImageVisible] = useState(true);
  const [event, setEvent] = useState<Event | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const updateContourType = (
    id: number,
    type: "contour" | "seat" | "area" | "polygon"
  ) => {
    setContours(
      contours.map((contour) => {
        if (contour.id === id) {
          return { ...contour, type };
        }
        return contour;
      })
    );
  };

  const updateContourLabel = (id: number, label: string) => {
    setContours(
      contours.map((contour) => {
        if (contour.id === id) {
          return { ...contour, label };
        }
        return contour;
      })
    );
  };

  const updateMultipleContours = (updates: Partial<Contour>) => {
    setContours((prevContours) =>
      prevContours.map((contour) =>
        selectedContours.includes(contour.id)
          ? { ...contour, ...updates }
          : contour
      )
    );
  };

  const handleSetSelectedContour = (id: number | null) => {
    setSelectedContour(id);
    setSelectedContours([]); // selectedContours 초기화
  };

  // setSelectedContours 수정
  const handleSetSelectedContours = (ids: number[]) => {
    setSelectedContours(ids);
    setSelectedContour(null); // selectedContour 초기화
  };

  return (
    <EventCreateContext.Provider
      value={{
        event,
        setEvent,
        contours,
        selectedContour,
        setContours,
        setSelectedContour: handleSetSelectedContour,
        updateContourType,
        updateContourLabel,
        editMode,
        setEditMode,
        selectedContours,
        setSelectedContours: handleSetSelectedContours,
        updateMultipleContours,
        isImageVisible,
        setIsImageVisible,
        imageUrl,
        setImageUrl,
      }}
    >
      {children}
    </EventCreateContext.Provider>
  );
};

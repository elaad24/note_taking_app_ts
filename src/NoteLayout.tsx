import {
  Navigate,
  Outlet,
  useOutletContext,
  useParams,
} from "react-router-dom";
import { Note } from "./App";

type NoteLayout = {
  notes: Note[];
};

export default function NoteLayout({ notes }: NoteLayout) {
  const { id } = useParams();
  const note = notes.find((n) => n.id === id);
  if (note == null) {
    return <Navigate to="/" replace />;
  }

  return <Outlet context={note} />;

  return <div>NoteLayout</div>;
}

export function useNote() {
  return useOutletContext<Note>();
}

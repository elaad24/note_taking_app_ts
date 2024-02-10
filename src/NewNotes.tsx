import { NoteData, Tag } from "./App";
import NoteForm from "./NoteForm";

type NewNotesProps = {
  onSubmit: (data: NoteData) => void;
  onAddTag: (tag: Tag) => void;
  availavleTags: Tag[];
};

export default function NewNotes({
  onSubmit,
  onAddTag,
  availavleTags,
}: NewNotesProps) {
  return (
    <>
      <h1 className="mb-4">NewNotes</h1>
      <NoteForm
        onSubmit={onSubmit}
        onAddTag={onAddTag}
        availavleTags={availavleTags}
      />
    </>
  );
}

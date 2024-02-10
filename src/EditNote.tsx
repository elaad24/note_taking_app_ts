import { NoteData, Tag } from "./App";
import NoteForm from "./NoteForm";
import { useNote } from "./NoteLayout";

type EditNotesProps = {
  onSubmit: (id: string, data: NoteData) => void;
  onAddTag: (tag: Tag) => void;
  availavleTags: Tag[];
};

export default function EditNotes({
  onSubmit,
  onAddTag,
  availavleTags,
}: EditNotesProps) {
  const note = useNote();
  return (
    <>
      <h1 className="mb-4">EditNotes</h1>
      <NoteForm
        title={note.title}
        tags={note.tags}
        markdown={note.markdown}
        onSubmit={(data) => onSubmit(note.id, data)}
        onAddTag={onAddTag}
        availavleTags={availavleTags}
      />
    </>
  );
}

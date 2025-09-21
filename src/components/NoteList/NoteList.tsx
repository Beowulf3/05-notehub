import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import type { Note } from '../../types/note'
import css from './NoteList.module.css'
import { deleteNote } from '../../services/noteService';

interface NoteListProps {
    notes: Note[],
}

function NoteList({ notes}: NoteListProps) {
    const queryClient = useQueryClient();
    const deleteNoteMutation = useMutation({
        mutationFn: deleteNote,
        onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['notes'] });
        toast.success('Note deleted successfully');
        }
    });
    
      const handleNoteDelete = (id: string) => {
    deleteNoteMutation.mutate(id);
  }

    return (
        <ul className={css.list}>
            {notes.map((note) => (
                   <li className={css.listItem} key={note.id}>
                        <h2 className={css.title}>{note.title}</h2>
                        <p className={css.content}>{note.content}</p>
                        <div className={css.footer}>
                            <span className={css.tag}>{note.tag}</span>
                            <button className={css.button} onClick={()=>handleNoteDelete(note.id)}>Delete</button>
                        </div>
                    </li> 
                ))}
            
        </ul>

    )
}
export default NoteList
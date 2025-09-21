import { ErrorMessage, Field, Form, Formik } from 'formik'
import * as Yup from 'yup'

import css from './NoteForm.module.css'
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createNote } from '../../services/noteService';
import toast from 'react-hot-toast';
import type { CreateNoteRequest } from '../../types/note';

interface NoteFormProps {
    onClose: () => void
}

function NoteForm({ onClose }: NoteFormProps) {
    
    const queryClient = useQueryClient();

    const validationSchema = Yup.object({
        title: Yup.string()
            .required('Title is required')
            .min(3, 'Title must be at least 3 characters')
            .max(50, 'Title must be less then 50 characters'),
        content: Yup.string().max(500, 'Content must be less then 500 characters'),
        tag: Yup.string()
            .oneOf(['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'], 'Invalid tag')
            .required('Tag is required')
    })

const initialValues: CreateNoteRequest = {
    title: '',
    content: '',
    tag: 'Todo',
}

    const handleSubmit = (values: { title: string; content: string; tag: string }) => {
        createNoteMutation.mutate(values)
    }

    const createNoteMutation = useMutation({
        mutationFn: createNote,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['notes'] });
            onClose();
            toast.success('Note created successfully');
        }
    });

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            <Form className={css.form}>
                <div className={css.formGroup}>
                    <label htmlFor="title">Title</label>
                    <Field id="title" type="text" name="title" className={css.input} />
                    <ErrorMessage name="title" component="span" className={css.error} />
                </div>
    
                <div className={css.formGroup}>
                    <label htmlFor="content">Content</label>
                    <Field
                        as='textarea'
                        id="content"
                        name="content"
                        rows={8}
                        className={css.textarea}
                    />
                    <ErrorMessage name="content" component="span" className={css.error} />
                </div>
    
                <div className={css.formGroup}>
                    <label htmlFor="tag">Tag</label>
                    <Field as="select" id="tag" name="tag" className={css.select}>
                        <option value="Todo">Todo</option>
                        <option value="Work">Work</option>
                        <option value="Personal">Personal</option>
                        <option value="Meeting">Meeting</option>
                        <option value="Shopping">Shopping</option>
                    </Field>
                    <ErrorMessage name="tag" component="span" className={css.error} />
                </div>
    
                <div className={css.actions}>
                    <button type="button" className={css.cancelButton} onClick={onClose}>
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className={css.submitButton}
                        disabled={false}
                    >
                    Create note
                    </button>
                </div>
            </Form>
        </Formik>
    )
}

export default NoteForm
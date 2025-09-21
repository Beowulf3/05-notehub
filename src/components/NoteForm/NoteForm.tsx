import { useFormik } from 'formik'
import * as Yup from 'yup'

import css from './NoteForm.module.css'

interface NoteFormProps {
    onClose: () => void,
    onSubmitValues: (values: { title: string; content: string; tag: string}) => void,
}

const validationSchema = Yup.object({
    title: Yup.string()
        .required('Title is required')
        .min(3, 'Title must be at least 3 characters')
        .max(50, 'Title must be less then 50 characters'),
    content: Yup.string().max(500, 'Content must be less then 500 characters'),
    tag: Yup.string()
        .oneOf(['Todo', 'Work', 'Personal', 'Meeting', 'Shoping'], 'Invalid tag')
        .required('Tag is required')
})

function NoteForm({ onClose, onSubmitValues}: NoteFormProps) {

    const formik = useFormik({
        initialValues: {
            title: '',
            content: '',
            tag: 'Todo',
        },
        validationSchema,
        onSubmit: (values) => {
            onSubmitValues(values);
        }
    })
    return (
        <form className={css.form} onSubmit={formik.handleSubmit}>
            <div className={css.formGroup}>
                <label htmlFor="title">Title</label>
                <input id="title" type="text" name="title" className={css.input} onChange={formik.handleChange} value={formik.values.title} />
                {formik.touched.title && formik.errors.title && (
                    <span className={css.error}>{formik.errors.title}</span>
                )}
            </div>

            <div className={css.formGroup}>
                <label htmlFor="content">Content</label>
                <textarea
                    id="content"
                    name="content"
                    rows={8}
                    className={css.textarea}
                    onChange={formik.handleChange}
                    value={formik.values.content}
                />
                {formik.touched.content && formik.errors.content && (
                    <span className={css.error}>{formik.errors.content}</span>
                )}
            </div>

            <div className={css.formGroup}>
                <label htmlFor="tag">Tag</label>
                <select id="tag" name="tag" className={css.select} onChange={formik.handleChange} value={formik.values.tag}>
                    <option value="Todo">Todo</option>
                    <option value="Work">Work</option>
                    <option value="Personal">Personal</option>
                    <option value="Meeting">Meeting</option>
                    <option value="Shopping">Shopping</option>
                </select>
                {formik.touched.tag && formik.errors.tag && (
                    <span className={css.error}>{formik.errors.tag}</span>
                )}
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
        </form>
    )
}

export default NoteForm
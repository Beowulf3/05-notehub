import axios from "axios"
import type { Note, CreateNoteRequest } from "../types/note";

const BASE_URL = 'https://notehub-public.goit.study/api/notes';
const apiKey = import.meta.env.VITE_NOTEHUB_TOKEN;
axios.defaults.headers.common['Authorization'] = `Bearer ${apiKey}`;

export interface FetchNoteResponse {
    notes: Note[],
    totalPages: number,
}

export interface FetchNoteParams {
    search?: string,
    page?: number,
    perPage?: number,
}


export const fetchNotes = async ({page, perPage, search}: FetchNoteParams): Promise<FetchNoteResponse> => {
    const response = await axios.get<FetchNoteResponse>(BASE_URL, {
        params: {
            page,
            perPage,
            search,
            sortBy: 'created',
        }
    })
    return response.data;
}

export const createNote = async (noteData: CreateNoteRequest ): Promise<Note> => {
    const res = await axios.post<Note>(BASE_URL, noteData);
    return res.data;
}

export const deleteNote = async (id: string): Promise<Note> => {
    const res = await axios.delete<Note>(`${BASE_URL}/${id}`);
    return res.data;
}
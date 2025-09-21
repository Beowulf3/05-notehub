
import { keepPreviousData, useQuery} from '@tanstack/react-query'
import { useDebounce} from 'use-debounce'
import { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'

import SearchBox from '../SearchBox/SearchBox'
import css from './App.module.css'
import {fetchNotes } from '../../services/noteService'
import NoteList from '../NoteList/NoteList'
import Modal from '../Modal/Modal'
import NoteForm from '../NoteForm/NoteForm'
import Pagination from '../Pagination/Pagination'
import Loader from '../Loader/Loader'
import ErrorMessage from '../ErrorMessage/ErrorMessage'

function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [delayedSearch] = useDebounce(search, 500);

  const { data, isLoading, isError, isSuccess} = useQuery({
    queryKey: ['notes', currentPage, delayedSearch],
    queryFn: () => fetchNotes({
      page: currentPage,
      perPage: 15,
      search: delayedSearch,
    }),
    placeholderData: keepPreviousData,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const userSearch = e.target.value.trim();
    setSearch(userSearch);
    setCurrentPage(1);
  }
  
  const notesArray = data?.notes || [];
  const totalPages = data?.totalPages || 1;

  const handleModalClose = () => {
    setIsModalOpen(false);
  }

  const handlePageChange = (selected: number) => {
    console.log(selected);
    
    setCurrentPage(selected);
  }

  useEffect(() => {
    if (data && notesArray.length === 0) {
      toast.error('No notes for your request :(');
    }
  }, [data, notesArray.length])
  

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox onChange={handleChange}/>
        {isSuccess&& totalPages > 1 && <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange}/>}
        <button className={css.button} onClick={() => setIsModalOpen(true)}>Create note +</button>
        {isModalOpen && <Modal onClose={handleModalClose}>
          <NoteForm onClose={handleModalClose}/>
        </Modal>}
      </header>
      {isLoading && <Loader />}
      {isError && <ErrorMessage/>}
      {data && notesArray.length !== 0 && <NoteList notes={notesArray}/>}
      <Toaster/>
    </div>

  )
}

export default App

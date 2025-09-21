import css from './SearchBox.module.css'

interface SearchBoxProps {
    onChange: (e:React.ChangeEvent<HTMLInputElement>) => void,
}

function SearchBox({onChange}: SearchBoxProps) {
    return (
        <input
            className={css.input}
            name='search'
            type="text"
            placeholder="Search notes"
            onChange={onChange}
        />
    )
}

export default SearchBox
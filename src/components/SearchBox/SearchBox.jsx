import { useDispatch, useSelector } from 'react-redux';
import { selectNameFilter, setFilter } from '../../redux/filters/filtersSlice';
import css from './SearchBox.module.css';

export default function SearchBox() {
  const dispatch = useDispatch();
  const { value } = useSelector(selectNameFilter);
  
  const handleChange = (e) => {
    dispatch(setFilter(e.target.value));
  };

  return (
    <div className={css.searchBox}>
      <p>Find contacts by name</p>
      <input
        type="text"
        value={value}
        onChange={handleChange}
        className={css.searchInput}
      />
    </div>
  );
}

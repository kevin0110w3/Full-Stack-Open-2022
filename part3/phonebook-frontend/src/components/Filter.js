const Filter = ({ filterPerson, filterName, handleFilterInput }) => {
  return (
    <form onChange={filterPerson}>
      <div>
        filter shown with: <input value={filterName} onChange={handleFilterInput} />
      </div>
    </form>
  )
};

export default Filter;
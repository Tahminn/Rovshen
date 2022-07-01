import React from 'react';
import {
  useTable,
  usePagination,
  useSortBy,
  useFilters,
  useExpanded,
  useRowSelect,
  useAbsoluteLayout,
} from 'react-table/index';
import UserService from "../../store/services/user.service";
import { Link } from 'react-router-dom';


// Create scroll handler
// const useScrollHandler = () => {
//   const [scroll, setScroll] = React.useState(1);

//   React.useEffect(() => {
//     const onScroll = () => {
//       const scrollCheck = window.scrollY > 10;
//       setScroll(scrollCheck);
//     };

//     document.addEventListener("scroll", onScroll);
//     return () => {
//       document.removeEventListener("scroll", onScroll);
//     };
//   }, [scroll, setScroll]);

//   return scroll;
// };
// Create an editable cell renderer
const EditableCell = ({
  value: initialValue,
  row: { index },
  column: { id },
  updateMyData, // This is a custom function that we supplied to our table instance
  editable,
}) => {
  // We need to keep and update the state of the cell normally
  const [value, setValue] = React.useState(initialValue)

  // const onChange = e => {
  //   setValue(value)
  // }

  // We'll only update the external data when the input is blurred
  // const onBlur = () => {
  //   updateMyData(index, id, value)
  // }

  // If the initialValue is changed externall, sync it up with our state
  React.useEffect(() => {
    setValue(initialValue)
    // function deleteUser(id) {
    //   UserService.updateUser(id).then(
    //     (response) => {
    //       alert(response.data);
    //       setTest("rendered")
    //     },
    //     (error) => {
    //       const _content =
    //         (error.response &&
    //           error.response.data &&
    //           error.response.data.message) ||
    //         error.message ||
    //         error.toString();
    //       alert(_content);
    //     }
    //   );
    // }
  }, [initialValue])

  if (!editable) {
    return `${initialValue}`
  }

  return <input value={value} />
  // return <input value={value} onChange={onChange} onBlur={onBlur} />
}

// Define a default UI for filtering
function DefaultColumnFilter({
  column: { filterValue, preFilteredRows, setFilter },
}) {
  const count = preFilteredRows.length

  return (
    <input
      value={filterValue || ''}
      onChange={e => {
        setFilter(e.target.value || undefined) // Set undefined to remove the filter entirely
      }}
      placeholder={`Search ${count} records...`}
    />
  )
}

// This is a custom filter UI for selecting
// a unique option from a list
function SelectColumnFilter({
  column: { filterValue, setFilter, preFilteredRows, id },
}) {
  // Calculate the options for filtering
  // using the preFilteredRows
  const options = React.useMemo(() => {
    const options = new Set()
    preFilteredRows.forEach(row => {
      options.add(row.values[id])
    })
    return [...options.values()]
  }, [id, preFilteredRows])

  // Render a multi-select box
  return (
    <select
      value={filterValue}
      onChange={e => {
        setFilter(e.target.value || undefined)
      }}
    >
      <option value="">All</option>
      {options.map((option, i) => (
        <option key={i} value={option}>
          {option}
        </option>
      ))}
    </select>
  )
}

// This is a custom filter UI that uses a
// slider to set the filter value between a column's
// min and max values
function SliderColumnFilter({
  column: { filterValue, setFilter, preFilteredRows, id },
}) {
  // Calculate the min and max
  // using the preFilteredRows

  const [min, max] = React.useMemo(() => {
    let min = preFilteredRows.length ? preFilteredRows[0].values[id] : 0
    let max = preFilteredRows.length ? preFilteredRows[0].values[id] : 0
    preFilteredRows.forEach(row => {
      min = Math.min(row.values[id], min)
      max = Math.max(row.values[id], max)
    })
    return [min, max]
  }, [id, preFilteredRows])

  return (
    <>
      <input
        type="range"
        min={min}
        max={max}
        value={filterValue || min}
        onChange={e => {
          setFilter(parseInt(e.target.value, 10))
        }}
      />
      <button onClick={() => setFilter(undefined)}>Off</button>
    </>
  )
}

// This is a custom UI for our 'between' or number range
// filter. It uses two number boxes and filters rows to
// ones that have values between the two
function NumberRangeColumnFilter({
  column: { filterValue = [], preFilteredRows, setFilter, id },
}) {
  const [min, max] = React.useMemo(() => {
    let min = preFilteredRows.length ? preFilteredRows[0].values[id] : 0
    let max = preFilteredRows.length ? preFilteredRows[0].values[id] : 0
    preFilteredRows.forEach(row => {
      min = Math.min(row.values[id], min)
      max = Math.max(row.values[id], max)
    })
    return [min, max]
  }, [id, preFilteredRows])

  return (
    <div
      style={{
        display: 'flex',
      }}
    >
      <input
        value={filterValue[0] || ''}
        type="number"
        onChange={e => {
          const val = e.target.value
          setFilter((old = []) => [val ? parseInt(val, 10) : undefined, old[1]])
        }}
        placeholder={`Min (${min})`}
        style={{
          width: '70px',
          marginRight: '0.5rem',
        }}
      />
      to
      <input
        value={filterValue[1] || ''}
        type="number"
        onChange={e => {
          const val = e.target.value
          setFilter((old = []) => [old[0], val ? parseInt(val, 10) : undefined])
        }}
        placeholder={`Max (${max})`}
        style={{
          width: '70px',
          marginLeft: '0.5rem',
        }}
      />
    </div>
  )
}

function fuzzyTextFilterFn(rows, id, filterValue) {
  return matchSorter(rows, filterValue, { keys: [row => row.values[id]] })
}

// Let the table remove the filter if the string is empty
fuzzyTextFilterFn.autoRemove = val => !val


// Define a custom filter filter function!
function filterGreaterThan(rows, id, filterValue) {
  return rows.filter(row => {
    const rowValue = row.values[id]
    return rowValue >= filterValue
  })
}

// This is an autoRemove method on the filter function that
// when given the new filter value and returns true, the filter
// will be automatically removed. Normally this is just an undefined
// check, but here, we want to remove the filter if it's not a number
filterGreaterThan.autoRemove = val => typeof val !== 'number'

// This is a custom aggregator that
// takes in an array of leaf values and
// returns the rounded median
function roundedMedian(leafValues) {
  let min = leafValues[0] || 0
  let max = leafValues[0] || 0

  leafValues.forEach(value => {
    min = Math.min(min, value)
    max = Math.max(max, value)
  })

  return Math.round((min + max) / 2)
}

const IndeterminateCheckbox = React.forwardRef(
  ({ indeterminate, ...rest }, ref) => {
    const defaultRef = React.useRef()
    const resolvedRef = ref || defaultRef

    React.useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate
    }, [resolvedRef, indeterminate])

    return (
      <>
        <input type="checkbox" ref={resolvedRef} {...rest} />
      </>
    )
  }
)

// Be sure to pass our updateMyData and the skipReset option
function Table({ columns, data, updateMyData, skipReset, setTest }) {

  // const scroll = useScrollHandler();
  function deleteUser(id) {
    UserService.deleteUser(id).then(
      (response) => {
        alert(response.data);
        setTest("rendered")
      },
      (error) => {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        alert(_content);
      }
    );
  };

  const filterTypes = React.useMemo(
    () => ({
      // Add a new fuzzyTextFilterFn filter type.
      fuzzyText: fuzzyTextFilterFn,
      // Or, override the default text filter to use
      // "startWith"
      text: (rows, id, filterValue) => {
        return rows.filter(row => {
          const rowValue = row.values[id]
          return rowValue !== undefined
            ? String(rowValue)
              .toLowerCase()
              .startsWith(String(filterValue).toLowerCase())
            : true
        })
      },
    }),
    []
  )

  const defaultColumn = React.useMemo(
    () => ({
      // Let's set up our default Filter UI
      Filter: DefaultColumnFilter,
      // And also our default editable cell
      Cell: EditableCell,
    }),
    []
  )

  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: {
      pageIndex,
      pageSize,
      sortBy,
      groupBy,
      expanded,
      filters,
      selectedRowIds,
    },
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
      filterTypes,
      // updateMyData isn't part of the API, but
      // anything we put into these options will
      // automatically be available on the instance.
      // That way we can call this function from our
      // cell renderer!
      updateMyData,
      // We also need to pass this so the page doesn't change
      // when we edit the data.
      autoResetPage: !skipReset,
      autoResetSelectedRows: !skipReset,
      disableMultiSort: true,
    },
    useFilters,
    useSortBy,
    useExpanded,
    usePagination,
    useRowSelect,
    // useAbsoluteLayout,
    // Here we will use a plugin to add our selection column
    // hooks => {
    //   hooks.visibleColumns.push(columns => {
    //     return [
    //       {
    //         id: 'selection',
    //         // Make this column a groupByBoundary. This ensures that groupBy columns
    //         // are placed after it
    //         groupByBoundary: true,
    //         // The header can use the table's getToggleAllRowsSelectedProps method
    //         // to render a checkbox
    //         Header: ({ getToggleAllRowsSelectedProps }) => (
    //           <div>
    //             <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
    //           </div>
    //         ),
    //         // The cell can use the individual row's getToggleRowSelectedProps method
    //         // to the render a checkbox
    //         Cell: ({ row }) => (
    //           <div>
    //             <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
    //           </div>
    //         ),
    //       },
    //       ...columns,
    //     ]
    //   })
    // }
  )

  // Render the UI for your table
  return (
    <div className="ReactTable -striped -highlight">
      <div className="rt-table" {...getTableProps()}>
        <div className="rt-thead -header" style={{ minWidth: 300 }}>
          {headerGroups.map(headerGroup => (
            <div className="rt-tr"{...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <div className={`rt-resizable-header ${column.isSorted ? column.isSortedDesc ? '-sort-desc' : '-sort-asc' : ''} -cursor-pointer rt-th`} style={{ flex: "100 0 auto" }} {...column.getHeaderProps()}>
                  <div className="rt-resizable-header-content" {...column.getSortByToggleProps()}>
                    {column.render('Header')}
                  </div>
                  <div>{column.canFilter ? column.render('Filter') : null}</div>
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className="rt-tbody"{...getTableBodyProps()} style={{ minWidth: 450 }}>
          {page.map(row => {
            prepareRow(row)
            console.log(row)
            return (
              <div className="rt-tr -odd"{...row.getRowProps()}>
                <div className="detail-link">
                  <Link className="btn" to={`/doctors/details/${row.original.id}`}>
                    <i className="mdi mdi-account"></i>
                  </Link>
                </div>
                {row.cells.map(cell => {
                  // console.log(row.cells)
                  return (
                    <div className="rt-td" {...cell.getCellProps()}>
                      {cell.render('Cell', { editable: true })}
                    </div>
                  )
                })}
                <div className="delete-button">
                  <button type="button" onClick={() => deleteUser(row.original.id)} className="btn delete-btn">
                    <i className="mdi mdi-delete"></i>
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <div className="pagination-bottom">
        <div className="-pagination">
          <div className="-previous">
            <button className="-btn" onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
              First Page
            </button>
          </div>
          <div className="-previous mx-3">
            <button className="-btn" onClick={() => previousPage()} disabled={!canPreviousPage}>
              Previous
            </button>
          </div>

          <div className="-center">
            <span className="-pageInfo">
              Page
              <div className="-pageJump">
                <input
                  type="number"
                  defaultValue={pageIndex + 1}
                  onChange={e => {
                    const page = e.target.value ? Number(e.target.value) - 1 : 0
                    gotoPage(page)
                  }}
                />
              </div>
              of
              <span className="-totalPages">{pageOptions.length}</span>
            </span>
            <span className="select-wrap -pageSizeOptions">
              <select
                value={pageSize}
                onChange={e => {
                  setPageSize(Number(e.target.value))
                }}
              >
                {[5, 10, 20, 30, 40, 50].map(pageSize => (
                  <option key={pageSize} value={pageSize}>
                    Show {pageSize}
                  </option>
                ))}
              </select>
            </span>
          </div>

          <div className="-next mx-3">
            <button className="-btn" n onClick={() => nextPage()} disabled={!canNextPage}>
              Next
            </button>
          </div>
          <div className="-next">
            <button className="-btn" onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
              Last Page
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Table
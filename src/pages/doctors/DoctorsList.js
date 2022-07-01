import { useState, useEffect, useReducer, useMemo, useRef } from "react";
import UserService from "../../store/services/user.service";
import styled from 'styled-components'
import Table from '../../components/Table';
import { Link } from "react-router-dom";
import DoctorCreate from "./DoctorCreate";
import Styled from 'styled-components';
import makeData from '../../contexts/makeData';


function DoctorsList() {

    const [data, setData] = useState([]);

    console.log(data)
    const[test, setTest] = useState("not rendered");

    useEffect(() => {
        UserService.getDoctorsBoard().then(
            (response) => {
                setData(response.data);
            },
            (error) => {
                const _content =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();
                setData(_content);
            }
        );
    }, [test]);

    const [originalData] = useState(data)

    const skipResetRef = useRef(false)

    const columns = useMemo(
        () =>
            [

                {
                    Header: 'Image',
                    accessor: 'image',
                },
                {
                    Header: 'Name',
                    accessor: 'name',
                },
                {
                    Header: 'Last Name',
                    accessor: 'surname',
                },
                {
                    Header: 'Username',
                    accessor: 'userName',
                },
                {
                    Header: 'Description',
                    accessor: 'description',
                },
                {
                    Header: 'Age',
                    accessor: 'age',
                },
                {
                    Header: 'Email',
                    accessor: 'email',
                },
                {
                    Header: 'Birthday',
                    accessor: 'birthday',
                },
                {
                    Header: 'Department',
                    accessor: 'department.name',
                },
                {
                    Header: 'Gender',
                    accessor: 'gender.name',
                },
                {
                    Header: 'Occupation',
                    accessor: 'occupation.name',
                },
                {
                    Header: 'Marital status',
                    accessor: 'isMarried',
                }
            ]
    )

    const[updateRowId, setUpdateRowId] = useState("")
    const[updateColumnValue, setUpdateColumnValue] = useState("")
    const[updateColumnName, setUpdateColumnName] = useState("")


    const updateMyData = (rowIndex, columnId, value) => {
        // We also turn on the flag to not reset the page
        skipResetRef.current = true
        setData(old =>
            old.map((row, index) => {   
                if (index === rowIndex) {
                    console.log("ROW Id   "+row.id)
                    setUpdateRowId(row.id)
                    console.log("ROW   value "+value)
                    setUpdateColumnValue(value)
                    console.log("ROW column  "+ columnId)
                    setUpdateColumnName(columnId)
                   
                    return {
                        ...row,
                        [columnId]: value,
                    }
                }
                return row
            })
        )
    }

    useEffect(() => {
        skipResetRef.current = false
    }, [data])
    

    const resetData = () => {
        skipResetRef.current = true
        setData(originalData)
    }



    console.log(updateRowId)
    console.log(updateColumnValue)
    console.log(updateColumnName)
    console.log(data.find(x => x.id === updateRowId))
    
    useEffect(() => {
        UserService.getDoctorsBoard().then(
            (response) => {
                setData(response.data);
            },
            (error) => {
                const _content =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();
                setData(_content);
            }
        );
    }, [test]);


    // const datas = useMemo(() => makeData(1000), [])
    return (
        <>
            <div className="ReactTable -striped -highlight w-25 my-3">
                <div className="pagination-bottom">
                    <div className="-pagination">
                        <div className="-previous">
                            <Link to="/doctors/create" className="-btn">
                                Create a new
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <Table
                columns={columns}
                data={data}
                updateMyData={updateMyData}
                skipReset={skipResetRef.current}
                setTest={setTest}
            />
        </>

    );
};
export default DoctorsList;

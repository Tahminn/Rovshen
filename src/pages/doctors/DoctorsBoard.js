import { useState, useEffect, useReducer, useMemo } from "react";
import UserService from "../../store/services/user.service";
import styled from 'styled-components'
import Table from '../../components/Table';
import DoctorCreate from "./DoctorCreate"
import { Route, Routes, Navigate, Outlet, Link } from 'react-router-dom';
// ColumnSizing, Expanding, Filters, Grouping, Headers, Ordering, Pagination, Pinning, RowSelection, Sorting,
// Visibility, buildHeaderGroups, createTable, createTableFactory, createTableInstance, defaultColumnSizing,
// expandRows, flattenBy, functionalUpdate, getBatchGroups, getColumnFilteredRowModelSync, getCoreRowModelAsync,
// getCoreRowModelSync, getExpandedRowModel, getGlobalFilteredRowModelSync, getGroupedRowModelSync, getPaginationRowModel,
// getSortedRowModelSync, incrementalMemo, isFunction, isRowSelected, makeStateUpdater, memo, noop, passiveEventSupported,
// propGetter, render, selectRowsFn, shouldAutoRemoveFilter, useTableInstance

function DoctorsBoard() {
  return (
    <>
      <div className="row">
        <div className="col-12 col">
          <div className="page-title-box d-flex align-items-start align-items-center justify-content-between">
            <h4 className="page-title mb-0 font-size-18">Doctors</h4>
            <div className="page-title-right">
              <ol className="breadcrumb m-0">
                <li className="breadcrumb-item">
                  <Link to="/">Dashboard</Link>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-body">
              <Outlet/>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default DoctorsBoard;

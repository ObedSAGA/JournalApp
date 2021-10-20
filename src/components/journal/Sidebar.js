import React from 'react'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { startLogout } from '../../actions/auth';
import { startNewNote } from '../../actions/notes';
import { JournalEntries } from './JournalEntries'

export const Sidebar = () => {

    const dispatch = useDispatch();

    const {name} = useSelector( state => state.auth );

    const handleLogout = () => {
        dispatch( startLogout() );
    };

    const handleAddNew = () => {
        dispatch( startNewNote() );
    }



    return (
        <aside className="journal__sidebar">
            
            <div className="journal_sidebar-navbar">
                <h3 className="mt-5">
                    <i className="fas fa-address-book"></i>
                    <span>{ name }</span>
                </h3>

                <button 
                    className="btn"
                    onClick={ handleLogout }
                >
                    Logout
                </button>
            </div>
            <div 
                className="journal__new-entry"
                onClick={ handleAddNew }
            >
                <i className="fas fa-calendar-plus fa-5x"/>
                <p className="mt-5">New entry</p>

            </div>

            <JournalEntries />

        </aside>
    )
}

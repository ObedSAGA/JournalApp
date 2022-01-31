import React, { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { activeNote } from "../../actions/notes";
import { useForm } from "../../hooks/useForm";

import { NotesAppBar } from "./NotesAppBar";

export const NoteScreen = () => {

  const dispatch = useDispatch();

  const { active:note } = useSelector( state => state.notes );

  const [formValues, handleInputChange, reset] = useForm( note );
  const {body, title} = formValues;

  const activeId = useRef(note.id);


  useEffect(() => {
    
    if (note.id !== activeId.current) {
      reset( note );
      activeId.current = note.id;
    }
  }, [note, reset]);

  useEffect(() => {
      
    dispatch( activeNote(formValues.id, {...formValues}));
    
  }, [formValues, dispatch])

  return (
    <div className="notes__main-content">
      <NotesAppBar />

      <form className="notes__content">
        <input
          type="text"
          placeholder="Some awesome title"
          className="notes__title-input"
          autoComplete="off"
          name="title"
          value={title}
          onChange={handleInputChange}                       
        />
        <textarea
          placeholder="What happen today?"
          className="notes__text-area"
          name="body"
          value={body}
          onChange={handleInputChange}
        ></textarea>

        {

        (note.url) &&
          (<div className="notes__image">
          <img
            src={note.url}
            alt="Imagen propia"
          />
          </div>)
        } 


      </form>
    </div>
  );
};

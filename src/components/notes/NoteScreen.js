import React from "react";
import { NotesAppBar } from "./NotesAppBar";

export const NoteScreen = () => {
  return (
    <div className="notes__main-content">
      <NotesAppBar />

      <form className="notes__content">
        <input
          type="text"
          placeholder="Some awesome title"
          className="notes__title-input"
          autoComplete="off"
        />
        <textarea
          placeholder="What happen today?"
          className="notes__text-area"
        ></textarea>

        <div className="notes__image">
        <img
          src="https://thumbs.dreamstime.com/b/inspirational-quotes-best-view-comes-hardest-climb-inspirational-quotes-life-quote-130362922.jpg"
          alt="Imagen propia"
        />
        </div>
      </form>
    </div>
  );
};

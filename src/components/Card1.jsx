import React, { useState } from 'react';
import { HiDotsHorizontal } from "react-icons/hi";
import { FaPen, FaPlus } from "react-icons/fa";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

function Card1() {
    const [isHovered, setIsHovered] = useState(false);
    const [cards, setCards] = useState([{ id: '1', text: "salom" }]);
    const [isAdding, setIsAdding] = useState(false);
    const [newCardText, setNewCardText] = useState('');
    const [isEditing, setIsEditing] = useState(null);
    const [editedCardText, setEditedCardText] = useState('');

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    const handleAddCardClick = () => {
        setIsAdding(true);
    };

    const handleAddCard = () => {
        if (newCardText.trim() !== '') {
            const newCard = { id: `${cards.length + 1}`, text: newCardText };
            setCards([...cards, newCard]);
            setNewCardText('');
            setIsAdding(false);
        }
    };

    const handleInputChange = (e) => {
        setNewCardText(e.target.value);
    };

    const onDragEnd = (result) => {
        if (!result.destination) return;

        const newCards = Array.from(cards);
        const [reorderedCard] = newCards.splice(result.source.index, 1);
        newCards.splice(result.destination.index, 0, reorderedCard);

        setCards(newCards);
    };

    const handleEditClick = (id, text) => {
        setIsEditing(id);
        setEditedCardText(text);
    };

    const handleEditChange = (e) => {
        setEditedCardText(e.target.value);
    };

    const handleSaveEdit = (id) => {
        const newCards = cards.map((card) =>
            card.id === id ? { ...card, text: editedCardText } : card
        );
        setCards(newCards);
        setIsEditing(null);
        setEditedCardText('');
    };

    const handleCancelEdit = () => {
        setIsEditing(null);
        setEditedCardText('');
    };

    return (
        <div className='rounded-xl border px-2.5 py-3 w-72 bg-[#101204] text-[#A4AFBB]'>
            <div className='first-card'>
                <div className='flex items-center justify-between'>
                    <h1 className='ml-3 text-[#A4AFBB]'>В процессеs</h1>
                    <span className='transition p-2 rounded-lg cursor-pointer hover:bg-[#282F27]'>
                        <HiDotsHorizontal />
                    </span>
                </div>

                <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId="droppable">
                        {(provided) => (
                            <div {...provided.droppableProps} ref={provided.innerRef}>
                                {cards.map((card, index) => (
                                    <Draggable key={card.id} draggableId={card.id} index={index}>
                                        {(provided) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                onMouseEnter={handleMouseEnter}
                                                onMouseLeave={handleMouseLeave}
                                                className='transition flex items-center mb-1 justify-between pl-3 pr-1 p-4 border-2 border-[#22272B] bg-[#22272B] h-[39px] mt-2 rounded-lg cursor-grab hover:border-[#87B9FE] hover:border-2'
                                            >
                                                {isEditing === card.id ? (
                                                    <div className="w-full flex items-center">
                                                        <input
                                                            type="text"
                                                            value={editedCardText}
                                                            onChange={handleEditChange}
                                                            className="w-full px-3 py-1.5 rounded-md border border-[#22272B] bg-[#22272B] text-[#A4AFBB] mb-2"
                                                        />
                                                        <button
                                                            onClick={() => handleSaveEdit(card.id)}
                                                            className="ml-2 text-xs p-2.5 rounded-2xl cursor-pointer hover:bg-[#292E34]"
                                                        >
                                                            Save
                                                        </button>
                                                        <button
                                                            onClick={handleCancelEdit}
                                                            className="ml-2 text-xs p-2.5 rounded-2xl cursor-pointer hover:bg-[#292E34]"
                                                        >
                                                            Cancel
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <>
                                                        <h1>{card.text}</h1>
                                                        {isHovered && (
                                                            <span onClick={() => handleEditClick(card.id, card.text)} className='text-xs p-2.5 rounded-2xl cursor-pointer hover:bg-[#292E34]'>
                                                                <FaPen />
                                                            </span>
                                                        )}
                                                    </>
                                                )}
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>

                {isAdding ? (
                    <div className="mt-3">
                        <input
                            type="text"
                            value={newCardText}
                            onChange={handleInputChange}
                            className="w-full px-3 py-1.5 rounded-md border border-[#22272B] bg-[#22272B] text-[#A4AFBB] mb-2"
                            placeholder="Yangi kartani kiriting"
                        />
                        <button onClick={handleAddCard} className="w-full flex items-center gap-2 px-3 py-1.5 justify-center rounded-md hover:bg-[#282F27]">
                            Qo'shish
                        </button>
                    </div>
                ) : (
                    <button onClick={handleAddCardClick} className='transition w-full flex items-center gap-2 px-3 py-1.5 justify-center rounded-md mt-3 hover:bg-[#282F27]'>
                        <FaPlus className='text-sm' />Добавить карточку
                    </button>
                )}
            </div>
        </div>
    );
}

export default Card1;

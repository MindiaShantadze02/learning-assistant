import { useState } from "react";

export const useQuizModal = () => {
    const [openQuizModal, setOpenQuizModal] = useState(false);
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');

    const handleOpen = () => {
        setOpenQuizModal(true);
    }
    
    const handleClose = () => {
        setOpenQuizModal(false);
        setTitle('');
        setCategory('');
    }

    const resetModal = () => {
        setOpenQuizModal(false);
        setTitle('');
        setCategory('');
    }

    return {
        openQuizModal,

        title,
        setTitle,

        category,
        setCategory,

        handleOpen,
        handleClose,

        resetModal
    }
}
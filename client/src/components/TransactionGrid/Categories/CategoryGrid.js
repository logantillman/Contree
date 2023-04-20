import React, { useEffect, useState } from 'react';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';

const CategoryGrid = (props) => {
    const [open, setOpen] = useState(false);
    const [categoryName, setCategoryName] = useState(null);

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const createButton = (categoryName, index) => {
        return <Button variant="contained" key={index} onClick={() => props.setCategoryFunction(categoryName)}>{categoryName}</Button>
    }

    const createCategory = (categoryName) => {
        if (categoryName) {
            props.addCategory(categoryName);
            setCategoryName(null);
            handleClose();
        }
    }

    const categoryButtons = props.categories.map((category, index) => createButton(category, index));

    return (
        <>
            {categoryButtons}
            <Button variant="contained" onClick={handleClickOpen}>+ New Category</Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Create category</DialogTitle>
                <DialogContent>
                    <TextField
                        required
                        autoFocus
                        margin="dense"
                        id="categoryName"
                        label="Category name"
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={(event) => {setCategoryName(event.target.value)}}
                        onKeyUp={(event) => {
                            if (event.key === 'Enter') {
                                createCategory(categoryName);
                            }
                        }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={() => createCategory(categoryName)}>Create</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default CategoryGrid;
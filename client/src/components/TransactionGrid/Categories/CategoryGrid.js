import React, { useState } from 'react';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';

const CategoryGrid = () => {
    const [open, setOpen] = useState(false);
    const [categories, setCategories] = useState([]);
    const [categoryName, setCategoryName] = useState(null);

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const handleCreate = (categoryName) => {
        console.log(categoryName);
        if (categoryName) {
            createCategory(categoryName);
        }
    }

    const newCategory = (categoryName) => {
        return <Button variant="contained" key={categories.length} data-category={categoryName}>{categoryName}</Button>
    }

    const createCategory = (categoryName) => {
        if (categories.length < 10) {
            setCategories(categories.concat(newCategory(categoryName)));
        }
        setCategoryName(null);
        handleClose();
    }

    return (
        <div>
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
                                handleCreate(categoryName);
                            }
                        }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={() => handleCreate(categoryName)}>Create</Button>
                </DialogActions>
            </Dialog>
            {categories}
        </div>
    );
}

export default CategoryGrid;
import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {IconButton, Icon, TextField} from "@material-ui/core";

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

const AddItemForm = (props: AddItemFormPropsType) => {
    const [title, setTitle] = useState("")
    const [error, setError] = useState<boolean>(false)
    const onChangeSetLocalTitle = (e: ChangeEvent<HTMLInputElement>) => {
        error && setError(false)
        setTitle(e.currentTarget.value)
    }
    const onKeyDownEnterAddItem =
        (e: KeyboardEvent<HTMLInputElement>) => e.key === "Enter" && onClickAddItem()
    const onClickAddItem = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            props.addItem(trimmedTitle)
        } else {
            setError(true)
        }
        setTitle("")
    }

    return (
        <div>
            <TextField
                value={title}
                onChange={onChangeSetLocalTitle}
                onKeyDown={onKeyDownEnterAddItem}
                // label={props.placeholder}
                error={error}
                helperText={error && "Title is required"}
            />

            <IconButton
                color="primary"
                onClick={onClickAddItem}><Icon color="primary"></Icon>
            </IconButton>


            {/*{error && <div style={{fontWeight: "bold", color: "hotpink"}}>Title is required</div>}*/}
        </div>
    );
};

export default AddItemForm;
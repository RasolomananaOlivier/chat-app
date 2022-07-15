import * as React from 'react';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { useSelector } from 'react-redux';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};


export default function MultipleSelect({ handleChange, initialValue }) {
    const friendsList = useSelector(state => state.friendsCollections)
    return (
        <Select
            labelId="multi-select-technologies"
            size='small'
            id="multiple-chip"
            name='members'
            multiple
            value={initialValue}
            onChange={handleChange}
            renderValue={(selected) => {
                return (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {selected.map(s => (
                            <MenuItem key={s._id} value={getFullName(s)} >
                                {getFullName(s)}
                            </MenuItem>
                        ))}
                    </Box>
                )
            }
            }
            MenuProps={MenuProps}
        >
            {friendsList.map((friend) => (
                <MenuItem
                    key={friend._id}
                    value={friend}

                >
                    {getFullName(friend)}
                </MenuItem>
            ))}
        </Select>

    );
}

function getFullName(friendData) {
    return friendData.firstName + friendData.lastName
}
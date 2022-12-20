


/*
    list = [
        {
            name: (...),
            icon: ([font-awesome]),
            onClick: () => {...}
        },
        ...
    ]
*/

import { List, ListItem, ListItemIcon, ListItemButton, ListItemText, Drawer, Divider, Typography} from "@mui/material"
import { Box } from "@mui/system"
import { useState } from "react"

const ListedNav = ({list, openSideBar=false, setOpenSideBar=() => {}}) => {

    const [activeElem, setActiveElem] = useState(0)
    const getOnClick = (onClick, i) => {
        return event => {
            setActiveElem(i)
            onClick(event)
        }
    }

    const drawerWidth = 240

    const getListItems = () => (
        <>
        {
            list.map((navElem, i) => (
                <ListItem key={i} disablePadding>
                    <ListItemButton onClick={getOnClick(navElem.onClick, i)} selected={i===activeElem} id={i}>
                        <ListItemIcon>
                            <i className={navElem?.icon} />
                        </ListItemIcon>
                        <ListItemText primary={navElem?.name} />
                    </ListItemButton>
                </ListItem>
            ))
        }
        </>
    )

    const getList = () => (
        <List>
            {getListItems()}
        </List>
    )

    const getListPhone = () => (
        <Box role="presentation">
            <List>
                <ListItem disablePadding>
                    <ListItemButton onClick={() => setOpenSideBar(!openSideBar)} >
                        <ListItemIcon>
                            <i className="fa-solid fa-arrow-left-long"></i>
                        </ListItemIcon>
                        <ListItemText primary="Regresar" />
                    </ListItemButton>
                </ListItem>
                <ListItem></ListItem>
                <Divider/>
                <ListItem></ListItem>
                {getListItems()}
            </List>
        </Box>
    )

    return (
        <div>
            <Box sx={{display: {xs: "none", md: 'block'}}}>
                {getList()}
            </Box>
            <Box sx={{display: {xs: "block", md: 'none'}, width: '100%'}}>
        <Drawer
                sx={{
                width: drawerWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: drawerWidth,
                    boxSizing: 'border-box',
                },
                position: 'absolute'
                }}
                variant="persistent"
                anchor="left"
                open={openSideBar}
                onClick={() => setOpenSideBar(!openSideBar)}
                onClose={() => setOpenSideBar(!openSideBar)}
>
                {getListPhone()}
                
        </Drawer>
        </Box>
        </div>
    )
}

export default ListedNav



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

import { List, ListItem, ListItemIcon, ListItemButton, ListItemText, Drawer, Divider, Card, Badge} from "@mui/material"
import { Box } from "@mui/system"
import { useState } from "react"

const ListedNav = ({list, openSideBar=false, setOpenSideBar=() => {}, activeElem=0, setActiveElem=() => {}}) => {
    const getOnClick = (onClick, i) => {
        return event => {
            setActiveElem(i)
            onClick(event)
        }
    }

    const drawerWidth = 240

    const getMyIcon = item => {
        if(item.badge){
            return (
                <Badge badgeContent={item.badge} color="primary">
                    <i className={item?.icon} />
                </Badge>
            )
        }else{
            return (
                <i className={item?.icon} />
            )
        }
    }

    const getListItems = () => (
        <>
        {
            list.map((navElem, i) => (
                <ListItem key={i} disablePadding>
                    <ListItemButton onClick={getOnClick(navElem.onClick, i)} selected={i===activeElem} id={i}>
                        <ListItemIcon>
                            {getMyIcon(navElem)}
                        </ListItemIcon>
                        <ListItemText primary={navElem?.name} />
                    </ListItemButton>
                </ListItem>
            ))
        }
        </>
    )

    const getList = () => (
        <Card sx={{padding: 0}}>
            <List>
                {getListItems()}
            </List>
        </Card>
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
import { Popover } from 'antd';
import React from 'react';

const EditCard = () => {
    return (
        <>
            {/* <Popover
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                open={true}
                onClose={onClose}
                classes={{ root: classes.root, paper: classes.paper }}
            >
                {img && <img src={img} alt="Not found" height={150} className={classes.image} />}
                <InputBase
                    value={img}
                    onChange={onImgURLChange}
                    className={classes.input}
                    placeholder="Image cover url"
                />
                <InputBase
                    className={classes.input}
                    value={title}
                    onChange={onTitleChange}
                    multiline
                    rows={3}
                    placeholder="Card title"
                />
                <div className={classes.actions}>
                    <Button className={classes.btnConfirm} onClick={handleOnSave}>
                        Save
                    </Button>
                </div>
            </Popover> */}
        </>
    );
};

export default EditCard;

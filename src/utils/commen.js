// src/utils/common.js

export const getStatusStyle = (status) => {
    switch (status) {
        case 'Completed':
            return {
                color: 'green',
                backgroundColor: 'lightgreen',
                border: '1px solid green',
                borderRadius: '16px',
                padding: '2px 8px',
            };
        case 'InProgress':
            return {
                color: 'orange',
                backgroundColor: 'lightyellow',
                border: '1px solid orange',
                borderRadius: '16px',
                padding: '2px 8px',
            };
        case 'Todo':
            return {
                color: 'gray',
                backgroundColor: 'lightgray',
                border: '1px solid gray',
                borderRadius: '16px',
                padding: '2px 8px',
            };
        default:
            return {
                color: 'black',
                backgroundColor: 'white',
                border: '1px solid black',
                borderRadius: '16px',
                padding: '2px 8px',
            };
    }
};

export const getPriorityStyle = (priority) => {
    switch (priority) {
        case 'High':
            return {
                color: 'red',
                backgroundColor: 'lightcoral',
                border: '1px solid red',
                borderRadius: '16px',
                padding: '2px 8px',
            };
        case 'Medium':
            return {
                color: 'orange',
                backgroundColor: 'lightyellow',
                border: '1px solid orange',
                borderRadius: '16px',
                padding: '2px 8px',
            };
        case 'Low':
            return {
                color: 'green',
                backgroundColor: 'lightgreen',
                border: '1px solid green',
                borderRadius: '16px',
                padding: '2px 8px',
            };
        default:
            return {
                color: 'black',
                backgroundColor: 'white',
                border: '1px solid black',
                borderRadius: '16px',
                padding: '2px 8px',
            };
    }
};

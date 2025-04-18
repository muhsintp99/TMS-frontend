// utils/DateAndTime.jsx
import React from 'react';

const DateAndTime = ({ dateString }) => {
    if (!dateString) return <span>--</span>;

    const date = new Date(dateString);

    if (isNaN(date)) {
        return <span>Invalid Date</span>;
    }

    const day = String(date.getUTCDate()).padStart(2, '0');
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const year = String(date.getUTCFullYear()).slice(-2);
    let hours = date.getUTCHours();
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');
    const seconds = String(date.getUTCSeconds()).padStart(2, '0');

    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    hours = String(hours).padStart(2, '0');

    const formatted = `${day}/${month}/${year} - ${hours}:${minutes}:${seconds} ${ampm}`;

    return <span>{formatted}</span>;
};

export default DateAndTime;

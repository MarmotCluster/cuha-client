import React from 'react';

export function getPublicImageLocation() {
    return `${process.env.PUBLIC_URL}/images/`;
}

export function getPublicImageURL(fileName) {
    return `${process.env.PUBLIC_URL}/images/${fileName}}`;
}

export const getRecalculatedTime = (s) => {
    s = s.substring(0, s.indexOf('T')).split('-');

    return {
        year: s[0],
        month: s[1],
        day: s[2],
    };
};

import React from 'react';

export function getPublicImageLocation() {
    return `${process.env.PUBLIC_URL}/images/`;
}

export function getPublicImageURL(fileName) {
    return `${process.env.PUBLIC_URL}/images/${fileName}}`;
}

import React from 'react';
import { RotatingLines } from 'react-loader-spinner';

import styles from './SpinningLoader.module.scss';

const {
    LoaderContainer,
    Loader
} = styles;

export default function SpinningLoader({ isLoading }) {
    if (isLoading) return (
        <div className={LoaderContainer}>
            <div className={Loader}>
                <RotatingLines
                    strokeColor="grey"
                    width="96"
                />
            </div>
        </div>
    );
}

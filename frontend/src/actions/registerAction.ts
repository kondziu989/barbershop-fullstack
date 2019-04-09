import {OPEN_REGISTER_DIALOG, CLOSE_REGISTER_DIALOG} from './types';

export const openRegisterDialog = () => ({
    type: OPEN_REGISTER_DIALOG,
    payload: true
})

export const closeRegisterDialog = () => ({
    type: CLOSE_REGISTER_DIALOG,
    payload: false
})
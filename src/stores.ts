import { writable, type Writable } from 'svelte/store';
// import type { I_Offer, I_ProcessedOffer } from './types';

export const vk_store: Writable<string> = writable("")
export const toast_store: Writable<any> = writable({show: false, error:"", msg:""})
export const menu_slide_store: Writable<boolean> = writable(false)
export const lwc_store: Writable<any|null> = writable(null)
export const form_button_inactive_store: Writable<any> = writable({form: ""})
export const balance_tau_store: Writable<string> = writable("0")


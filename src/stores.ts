import { writable, type Writable } from 'svelte/store';
import type { I_Offer, I_ProcessedOffer } from './types';

export const vk_store: Writable<null|string> = writable(null)
export const toast_store: Writable<any> = writable({show: false, error:"", msg:""})
export const menu_slide_store: Writable<bool> = writable(false)
export const lwc_store: Writable<any|null> = writable(null)
export const form_button_inactive_store: Writable<bool> = writable({form: ""})
export const balance_tau_store: Writable<any> = writable(0)


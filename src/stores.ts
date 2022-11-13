import { writable, type Writable } from 'svelte/store';
import type { I_Offer, I_ProcessedOffer } from './types';

export const offer_store: Writable<I_ProcessedOffer[]> = writable([])
export const vk_store: Writable<null|string> = writable(null)
export const toast_store: Writable<any> = writable({})
export const lwc_store: Writable<any|null> = writable(null)

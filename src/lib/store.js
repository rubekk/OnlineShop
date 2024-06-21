import  { writable } from "svelte/store";

export let products= writable([]);

export let editing= writable({
    edit: false,
    pid: 0 
});
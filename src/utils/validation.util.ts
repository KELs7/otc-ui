import { toast_store, form_button_inactive_store } from '../stores';

export const checkInputs = (kwgs: any)=>{
    const ks = Object.keys(kwgs);
    for(let k of ks){
        if(kwgs[k]==="" || kwgs[k]===0){
            toast_store.set({
                show: true,
                error: true, 
                title: "Input Error", 
                message: "A field is empty!"
            })
            setTimeout(()=>{
                toast_store.set({show: false})
                
                 //set button state back to active
                form_button_inactive_store.set({form: ""})
            }, 2500)
        }    
    }
}


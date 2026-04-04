import { router } from "./router.js";

export const navigateTo = (url) => {
    history.pushState(null, null, url);
    router(); 
};
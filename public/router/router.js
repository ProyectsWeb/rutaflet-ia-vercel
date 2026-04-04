import { routes } from "./routes.js";
import { tagRenderHTML } from "./tagRender.js";

export const router = ()=>{    
  const potentialMatches = routes.map(route => {
    /* console.log(route) */
   return {
        route: route,
        isMatch: location.pathname === route.path
   };
  });
       
  let match = potentialMatches.find(potentialMatch => potentialMatch.isMatch);      
  /* console.log(match) */
   if (!match) {
    match = {
      route: routes[0],
      result: [location.pathname]
    };
   } 
tagRenderHTML("#mapa", match.route.view);  
};
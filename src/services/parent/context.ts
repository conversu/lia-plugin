import { createContext } from "react";



// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface IParentContext {

}

export const ParentContext = createContext({} as IParentContext);
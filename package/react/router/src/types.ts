import { ReactElement, FC} from "react";

export interface iRouterConfig {
    url?: string
		layout?: string,
		layouts?: Record<string, FC<iRouterLayout>>
		onChange?: (prev:string, current:string) => void
}

export interface iRouterLayout{
	children:ReactElement
}

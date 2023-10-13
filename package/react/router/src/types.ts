import {ReactNode, ReactElement} from "react";

export interface iRouterConfig {
    url?: string
		layout?: string,
		layouts?: Record<string, ReactElement>
		onChange?: (prev:string, current:string) => void
}

export interface iRouterLayout{
	children: ReactNode,
}

export interface iRouterRefString{
	current: string
}

import {FC} from "react";

export interface iRouterConfig {
    url?: string
		layout?: FC,
		layouts?: Record<string, FC>
		onChange?: (prev:string, current:string) => void
}

export interface iRouter{

}
